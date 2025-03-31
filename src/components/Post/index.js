import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Fragment, useCallback, useEffect, useState } from "react";

import styles from './Post.module.scss'
import Image from "~/components/Image";
import Button from "~/components/Button";
import { deletedPostServices, getPostContentServices, getPostPollServices, likeServices, voteMultipleServices, voteSingleServices } from "~/apiServices";
import Menu from "~/components/Popper/Menu";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CloseIcon, CommentIcon, LikeActiveIcon, LikeIcon, ShareIcon, ReportIcon, SaveIcon, HiddenIcon, EditIcon, TrashIcon, MoreIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function Post({ data, profile = false, show = true }) {
    const [showLike, setShowLike] = useState(data.user_like || false);
    const [showModal, setShowModal] = useState(false);
    const [dataPost, setDataPost] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [deleteState, setDeleteState] = useState(false)
    const [likesCount, setLikesCount] = useState(data.like || 0);
    const [totalVote, setTotalVote] = useState(0);
    const { t } = useTranslation();

    const handleToggleModal = () => setShowModal((prev) => !prev);

    const token = localStorage.getItem('authToken')

    const getMenuItems = () => {
        const commonItems = [
            { icon: <SaveIcon />, title: t('saveBtn') },
            { icon: <HiddenIcon />, title: t('hidden') },
        ];

        if (data.user_post) {
            return [
                { icon: <EditIcon />, title: t('edit') },
                ...commonItems,
                { icon: <TrashIcon />, title: t('deleted'), onClick: handleToggleModal },
            ];
        }
        return [...commonItems, { icon: <ReportIcon />, title: t('report') },
        ];
    };

    const handleDeletePost = async () => {
        const res = await deletedPostServices(data.id, token)
        if (res?.data) {
            setDeleteState(true)
        }

        setShowModal(false)
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
    }, [data.id, token]);

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

    if (deleteState) {
        return (
            <div className={cx("wrapper", { profile })}>
                <h3>{t('deleteSuccess')}</h3>
            </div>
        );
    }

    return (
        <Fragment>

            <div className={cx('wrapper', { profile, inactive: !show })}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Link to={`/user/${data.id_user}`} >
                            <Image className={cx('avatar')} src={data.img_user} />
                        </Link>
                        <Link className={cx('name')} to={`/user/${data.user_id}`}>{data.user_name}</Link>
                        <Link className={cx('date')} to={`/post/${data.id}`}>{format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')}</Link>
                        <Link className={cx('language')} to={`/post/${data.id}`}>{data.language}</Link>

                    </div>
                    <div className={cx('more-btn')}>

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
                        <>
                            <div className={cx('title')}>
                                <Link className={cx('text-title')} to={`/post/${data.id}`}>{dataPost.title}</Link>
                            </div>
                            <div className={cx('content')}>
                                <Link className={cx('text-content')} to={`/post/${data.id}`}>
                                    {renderContent()}
                                </Link>
                            </div>
                            {dataPost.img_url && (
                                <div className={cx('img')}>
                                    <Link to={`/post/${data.id}`} className={cx('img-link')}>
                                        <Image src={dataPost.img_url} className={cx('img-src')} />
                                    </Link>
                                </div>
                            )}</>
                    ) : (
                        <>
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
                                                    {item.voteCount} votes - {percentage}%
                                                </div>

                                            </label>
                                        );
                                    })
                                }
                                <div className={cx('vote')}>
                                    <span className={cx('total-vote')}>{totalVote} votes</span>
                                    <Button className={cx('vote-btn')} primary>Vote</Button>
                                </div>
                            </form>
                        </>
                    )}
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
            </div>
            {
                showModal && (
                    <div className={cx('modal')}>
                        <div className={cx('container')}>
                            <div className={cx('modal-header')}>
                                <h3 className={cx('modal-heading')}>{t('deletedHeading')}</h3>
                                <Button onClick={handleToggleModal} iconCircle className={cx('modal-close')} leftIcon={<CloseIcon />} />
                            </div>
                            <div className={cx('modal-body')}>
                                <p className={cx('modal-title')}>{t('deletedConfirm')}</p>
                            </div>
                            <div className={cx('modal-footer')}>
                                <Button onClick={handleToggleModal} round normal className={cx('btn-cancel')}>{t('deletedBtnCancel')}</Button>
                                <Button onClick={handleDeletePost} round deleted className={cx('btn-confirm')}>{t('deletedBtnYes')}</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment >
    );
}

export default Post;