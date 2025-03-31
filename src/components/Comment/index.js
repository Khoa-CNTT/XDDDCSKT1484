import classNames from "classnames/bind";
import styles from './Comment.module.scss'
import Button from '~/components/Button'
import Image from '~/components/Image';
import { useTranslation } from "react-i18next";
import Menu from "~/components/Popper/Menu";
import { useEffect, useRef, useState } from "react";
import { deletedCommentServices, getReplyCommentServices, replyCommentServices } from "~/apiServices";
import { format } from "date-fns";
import { CloseIcon, EditIcon, MoreIcon, ReportIcon, SendIcon, TrashIcon } from "~/components/Icons";
import ReplyComment from "~/components/ReplyComment";
const cx = classNames.bind(styles)

function Comment({ data, onDeleteSuccess }) {
    const [showCmtReply, setShowCmtReply] = useState(false);
    const [resReply, setResReply] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [cmtReply, setCmtReply] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [listReply, setListReply] = useState([]);
    const { t } = useTranslation();
    const token = localStorage.getItem('authToken')
    const inputRef = useRef();
    const handleToggleModal = () => setShowModal((prev) => !prev);

    useEffect(() => {
        const fetchReplyComment = async () => {
            if (!data.id) return;
            const res = await getReplyCommentServices(pageCurrent, 5, data.id, token);
            setResReply(res?.data?.totalElements || 0);
            if (res?.data?.content.length > 0) {
                setListReply(res.data.content);
            }
        };
        fetchReplyComment();
        // eslint-disable-next-line 
    }, [data]);

    useEffect(() => {
        if (showReply && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showReply]);

    const getMenuItems = () => {
        if (data._user) {
            return [
                { icon: <EditIcon />, title: t('edit') },
                { icon: <TrashIcon />, title: t('deleted'), onClick: handleToggleModal },
            ];
        }
        return [{ icon: <ReportIcon />, title: t('report') }];
    };

    const handleDeleteComment = async () => {
        const token = localStorage.getItem('authToken')
        const res = await deletedCommentServices(data.id, token)
        if (res?.data) {
            onDeleteSuccess(data.id)
        }

        setShowModal(false)
    }

    const handleReplyCmt = () => {
        setShowReply(true);
    }

    const handleReply = async (e) => {
        e.preventDefault();
        if (!cmtReply.trim() && !data.id) {
            return;
        }

        const formData = {
            commentId: data.id,
            content: cmtReply
        }

        const res = await replyCommentServices(formData, token);

        if (res?.data) {
            setListReply(prev => [...prev, res.data]);
            setCmtReply('');
            setShowReply(false);
        }

    }

    const handleLoadReply = async () => {
        if (resReply <= 0) return;

        await setShowCmtReply(true);
        const nextPage = pageCurrent + 1;
        const res = await getReplyCommentServices(nextPage, 5, data.id, token);
        if (res?.data?.content.length > 0) {
            if (res.data.content.length < 5) {
                setResReply(res.data.content.length);
            } else {
                setResReply(prev => prev - 5);
            }
            setListReply(prev => [...prev, ...res.data.content]);
            setPageCurrent(nextPage);

        } else {
            setResReply(0);
        }

    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <Image src={data.user_img} alt={data.user_name} className={cx('img')} />
                        <h3 className={cx('username')}>{data.user_name}</h3>
                        <span className={cx('datetime')}>{format(new Date(data.created_at), "dd/MM/yyyy HH:mm")}</span>
                    </div>
                    <div className={cx('more-btn')}>
                        {token && (
                            <Menu
                                hideOnClick={true}
                                post={true}
                                items={getMenuItems()}
                            >
                                <Button leftIcon={<MoreIcon />} />
                            </Menu>
                        )}
                    </div>
                </div>

                <div className={cx('content')}>
                    <span>{data.content}</span>
                </div>

                <div className={cx('interact')}>
                    <Button iconText className={cx('like')} >{t('like')}</Button>
                    <Button iconText onClick={handleReplyCmt} className={cx('reply')} >{t('reply')}</Button>
                </div>
                {resReply > 0 &&
                    <span onClick={handleLoadReply} className={cx('more-reply')}>Load more {resReply} Reply..</span>
                }
                {
                    showCmtReply && listReply.length > 0 &&
                    listReply.map((item) => (
                        <ReplyComment key={item.id} data={item} />
                    ))
                }
                {
                    showReply &&
                    <form className={cx('form-reply')} onSubmit={handleReply}>
                        <input ref={inputRef} className={cx('reply-input')} value={cmtReply} onChange={(e) => setCmtReply(e.target.value)} type="text" />
                        <Button><SendIcon className={cx('reply-icon')} width="20px" height="20px" /></Button>
                    </form>
                }
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
                                <Button onClick={handleDeleteComment} round deleted className={cx('btn-confirm')}>{t('deletedBtnYes')}</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Comment;