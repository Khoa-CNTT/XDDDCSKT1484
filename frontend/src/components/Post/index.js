import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { deletedPostServices, getPostContentServices, getPostPollServices, hiddenPostServices, likeServices, translateServices, voteMultipleServices, voteSingleServices } from "~/apiServices";
import Menu from "~/components/Popper/Menu";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CommentIcon, LikeActiveIcon, LikeIcon, ShareIcon, ReportIcon, SaveIcon, HiddenIcon, EditIcon, TrashIcon, MoreIcon, StarIcon, SpeakerIcon } from "~/components/Icons";
import { UserContext } from "~/context/UserContext";
import ModalDel from "../ModalDel";

const cx = classNames.bind(styles)

function Post({ data, profile = false, show = true }) {
    const [showLike, setShowLike] = useState(data.user_like || false);
    // eslint-disable-next-line
    const [showPost, setShowPost] = useState(data.show);
    const [modalDel, setModalDel] = useState(null);
    const [dataPost, setDataPost] = useState({});
    const [isTranslated, setIsTranslated] = useState(false);
    const [originalPost, setOriginalPost] = useState(dataPost);
    const [translatedPost, setTranslatedPost] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [messageShow, setMessageShow] = useState('');
    const [likesCount, setLikesCount] = useState(data.like || 0);
    const [totalVote, setTotalVote] = useState(0);
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const token = localStorage.getItem('authToken')


    const getMenuItems = () => {
        const commonItems = [
            { icon: <SaveIcon />, title: t('saveBtn') },
            { icon: <HiddenIcon />, title: t('hidden'), onClick: handleHidden },
        ];

        if (data.user_post) {
            if (data.type_post === 'CONTENT') {
                return [
                    { icon: <EditIcon />, title: t('edit'), onClick: handleDirectEdit },
                    ...commonItems,
                    { icon: <TrashIcon />, title: t('deleted'), onClick: handleModalEdit },
                ];
            } else {
                return [
                    ...commonItems,
                    { icon: <TrashIcon />, title: t('deleted'), onClick: handleModalEdit },
                ];
            }
        }
        return [...commonItems, { icon: <ReportIcon />, title: t('report') },
        ];
    };

    const handleModalEdit = () => setModalDel(data.id);

    const handleHidden = async () => {
        const res = await hiddenPostServices(data.id, token);
        if (res?.data) {
            setMessageShow(t('hiddenSuccess'));
        }
    }

    const handleDirectEdit = () => {
        navigate(`/upload?id=${data.id}`)
    }

    const handleDelete = async () => {
        const res = await deletedPostServices(modalDel, token)
        if (res?.data) {
            setMessageShow(t('deleteSuccess'));
        }

        setModalDel(null)
    }

    const fetchApiTypePost = useCallback(async () => {
        let res;
        if (data.type_post === 'CONTENT') {
            res = await getPostContentServices(data.id, token);
        } else {
            res = await getPostPollServices(data.id, token);
            const total = res.data.pollOptions.reduce((sum, option) => sum + option.voteCount, 0);
            setTotalVote(total);
            const votedOptions = res?.data?.pollOptions
                ?.filter(option => option.isSelected)
                .map(option => option.id);
            setSelectedOptions(votedOptions || []);
        }
        if (res?.data) {
            setDataPost(res.data);
        }
        // eslint-disable-next-line 
    }, [data.id]);

    useEffect(() => {
        fetchApiTypePost();
    }, [fetchApiTypePost]);

    const handleToggleLikes = async () => {
        if (!token) {
            alert('Login is required to like posts.');
            return;
        }
        const res = await likeServices(data.id, token);
        if (res?.data) {
            setShowLike(res.data.liked);
            setLikesCount((prev) => (res.data.liked ? prev + 1 : Math.max(0, prev - 1)));
        } else {
            console.log(res);
        }
    }

    const handleShare = () => {
        const postUrl = `http://localhost:1407/post/${data.id}`
        navigator.clipboard.writeText(postUrl);
        alert(t('shareSuccess'));
    }

    const renderContent = () => {
        return dataPost.content?.split('\n').map((item, index) => (
            <Fragment key={index}>
                {item}
                <br />
            </Fragment>
        ));
    };

    const handleVote = async (e) => {
        e.preventDefault();
        if (selectedOptions.length > 0) {
            let res;
            console.log("Selected Options:", selectedOptions);
            console.log("Sending vote for:", dataPost.typePoll === 'Multiple' ? selectedOptions : selectedOptions[0]);

            if (dataPost.typePoll === 'Multiple') {
                res = await voteMultipleServices(selectedOptions, token);
            } else {
                res = await voteSingleServices(selectedOptions[0], token);
            }

            if (res?.data) {
                await fetchApiTypePost();
            }
        }
    };


    const handleSelectOption = (optionId) => {
        setSelectedOptions(prev => {
            if (dataPost.typePoll === "Multiple") {
                return prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId];
            } else {
                return [optionId];
            }
        });
    };

    const speak = (text, lang) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }

    const handleSpeaker = (title, content) => {
        var lang = '';
        switch (data?.language) {
            case 'English':
                lang = 'en-US';
                break;
            case 'Japan':
                lang = 'ja-JP';
                break;
            case 'China':
                lang = 'zh-CN';
                break;
            default:
                lang = 'en-US';
                break;
        }

        speak(title, lang);
        speak(content, lang);
    }

    const fetchTranslate = async (text, language) => {
        const res = await translateServices({ text, language }, token);
        return res?.data?.translatedText || '';
    };


    const handleTranslate = async () => {
        if (token) {
            if (!isTranslated) {
                if (!translatedPost) {
                    let lang = '';
                    switch (user.language) {
                        case 'Japan':
                            lang = 'Japanese';
                            break;
                        case 'China':
                            lang = 'Chinese';
                            break;
                        default:
                            lang = 'English';
                            break;
                    }
                    setOriginalPost(dataPost);
                    const title = await fetchTranslate(dataPost.title, lang);
                    const content = await fetchTranslate(dataPost.content, lang);

                    const translated = { title, content };
                    setTranslatedPost(translated);
                    setDataPost(translated);
                } else {
                    setDataPost(translatedPost);
                }
            } else {
                setDataPost(originalPost);
            }

            setIsTranslated(prev => !prev);
        }
    };

    return (
        <Fragment>
            {messageShow ?
                (
                    <div className={cx("wrapper", { profile })}>
                        <h3>{messageShow}</h3>
                    </div>
                ) : (
                    <div className={cx('wrapper', { profile, inactive: !show })}>
                        <div className={cx('header')}>
                            <div className={cx('user')}>
                                <Link to={`/user/${data.id_user}`} >
                                    <Image className={cx('avatar')} src={data.img_user} />
                                </Link>
                                <Link className={cx('name')} to={`/user/${data.user_id}`}>{data.user_name}</Link>
                                <Link className={cx('date')} to={`/post/${data.id}`}>{format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')}</Link>
                                <Link className={cx('language')} to={`/post/${data.id}`}>{data.language}</Link>
                                {data.ads &&
                                    (
                                        <div className={cx('icon-ads')}>
                                            <StarIcon />
                                            <span className={cx('title-ads')}>{t('advertised')}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={cx('more-btn')}>
                                {data.type_post === 'CONTENT' &&
                                    (
                                        <div className={cx('icon-speaker')} onClick={() => handleSpeaker(dataPost.title, dataPost.content)}>
                                            <SpeakerIcon />
                                        </div>
                                    )
                                }
                                {token ? (
                                    <Menu
                                        hideOnClick={true}
                                        post={true}
                                        items={getMenuItems()}
                                    >
                                        <Button iconText leftIcon={<MoreIcon />} />
                                    </Menu>
                                ) : (
                                    <Button iconText leftIcon={<MoreIcon />} />
                                )}
                            </div>
                        </div>
                        {data.type_post === 'CONTENT' ?
                            (
                                <div className={cx('body', { inactive: !show })}>
                                    <div className={cx('title')}>
                                        <Link className={cx('text-title')} to={`/post/${data.id}`}>{dataPost.title}</Link>
                                    </div>
                                    <div className={cx('content')}>
                                        <Link className={cx('text-content')} to={`/post/${data.id}`}>
                                            {renderContent()}
                                        </Link>
                                    </div>
                                    {
                                        token && user?.language !== data.language
                                        &&
                                        (
                                            <p className={cx('title-translate')} onClick={handleTranslate}>{isTranslated ? 'Seen Original' : 'Translate Post'}</p>
                                        )
                                    }

                                    {dataPost.img_url && (
                                        <div className={cx('img')}>
                                            <Link to={`/post/${data.id}`} className={cx('img-link')}>
                                                <Image src={dataPost.img_url} className={cx('img-src')} />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={cx('body', { inactive: !show })}>
                                    <div className={cx('question')}>
                                        <Link className={cx('text-question')} to={`/post/${data.id}`}>{dataPost.question}</Link>
                                    </div>
                                    <form className={cx('form-vote')} onSubmit={handleVote}>
                                        {
                                            dataPost.pollOptions?.map((item, index) => {
                                                const percentage = totalVote > 0 ? ((item.voteCount / totalVote) * 100).toFixed(0) : 0;
                                                return (
                                                    <label htmlFor={item.id} key={index} className={cx('vote-option')}>
                                                        <div className={cx('progress-bar')}>
                                                            <div className={cx('progress-fill')} style={{ width: `${percentage}%` }}>
                                                            </div>
                                                        </div>
                                                        <div className={cx('option-text')}>
                                                            <input
                                                                checked={selectedOptions.includes(item.id)}
                                                                type={dataPost.typePoll === 'Multiple' ? "checkbox" : "radio"}
                                                                id={item.id}
                                                                name="answer"
                                                                onChange={() => handleSelectOption(item.id)}
                                                            />
                                                            {item.optionText}
                                                        </div>
                                                        <div className={cx('option-progress')}>
                                                            {item.voteCount} {t('votes')} - {percentage}%
                                                        </div>

                                                    </label>
                                                );
                                            })
                                        }
                                        <div className={cx('vote')}>
                                            <span className={cx('total-vote')}>{totalVote} {t('votes')}</span>
                                            <Button className={cx('vote-btn')} primary>{t('vote')}</Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        {showPost && (
                            <div className={cx('interact')}>
                                <div className={cx('like')}>
                                    <Button
                                        like={showLike}
                                        onClick={handleToggleLikes}
                                        className={cx('like-btn')}
                                        round
                                        normal
                                        rightIcon={showLike ? <LikeActiveIcon /> : <LikeIcon />}
                                    >
                                        {likesCount}
                                    </Button>
                                </div>
                                <div className={cx('comment')}>
                                    <Button
                                        to={`/post/${data.id}`}
                                        className={cx('comment-btn')}
                                        round
                                        normal
                                        rightIcon={<CommentIcon />}
                                    >
                                        {`${data.comment || 0}`}
                                    </Button>
                                </div>
                                <div className={cx('share')}>
                                    <Button onClick={handleShare} className={cx('share-btn')} round normal rightIcon={<ShareIcon />} />
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
            {
                modalDel && (
                    <ModalDel
                        text='Post'
                        handleDelete={handleDelete}
                        handleCancel={() => setModalDel(null)}
                    />
                )
            }
        </Fragment >
    );
}

export default Post;