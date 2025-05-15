import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss'
import Post from '~/components/Post';
import { getPostByIdPostServices, getCommentByIdPostServices, commentServices } from '~/apiServices';
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import Comment from '~/components/Comment';
import { useScroll } from '~/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles)

function PostDetail() {
    const { id_post: idPost } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [valueContent, setValueContent] = useState('');
    const [pageCurrent, setPageCurrent] = useState(0);
    const [showPost, setShowPost] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isFetching = useRef(false);
    const handleCancel = (e) => {
        e.preventDefault()
        setValueContent('')
    }

    useScroll(() => setPageCurrent((prev) => prev + 1));

    const handleDeleteSuccess = (deletedCommentId) => {
        setComments((prev) => prev.filter((comment) => comment.id !== deletedCommentId));
    };

    const handleComment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token || !valueContent.trim()) return;

        const res = await commentServices(idPost, valueContent, token);
        if (res?.data) {
            setComments((prev) => [res.data, ...prev]);
            setValueContent('');
        }
    };

    useEffect(() => {
        const fetchApiPost = async (id, token) => {

            if (!token) return;

            const res = await getPostByIdPostServices(id, token)
            if (res?.data && !res.data?.deleted) {
                setShowPost(res.data.show);
                setPost(res.data);
            } else {
                navigate('/')
            }
        }
        const token = localStorage.getItem('authToken');
        fetchApiPost(idPost, token);
        // eslint-disable-next-line
    }, [idPost]);


    useEffect(() => {
        if (!idPost || isFetching.current) return;
        isFetching.current = true;
        const token = localStorage.getItem('authToken');
        const fetchComments = async () => {
            const res = await getCommentByIdPostServices(idPost, pageCurrent, 5, token);

            if (res?.data?.content) {
                setComments((prev) => {
                    const uniqueComments = new Map([...prev, ...res.data.content].map((c) => [c.id, c]));
                    return Array.from(uniqueComments.values());
                });
            }
            isFetching.current = false;
        };

        fetchComments();
    }, [idPost, pageCurrent]);

    return (
        <div className={cx('wrapper')}>
            {Object.keys(post).length > 0 && (
                <>
                    <Post data={post} />
                    {showPost && (
                        <div className={cx('cmt')}>
                            <form className={cx('form')}>
                                <textarea value={valueContent} onChange={e => setValueContent(e.target.value)} name="comment" className={cx('content')} placeholder={t('commentPlaceholder')} />
                                <div className={cx('btn')}>
                                    <Button onClick={handleCancel} round normal className={cx('cancel-btn')}>{t('cancel')}</Button>
                                    <Button onClick={handleComment} round primary className={cx('submit-btn')}>{t('comment')}</Button>
                                </div>
                            </form>

                            <div className={cx('body')}>
                                {comments && comments.map((item) => (
                                    <Comment key={item.id} data={item} onDeleteSuccess={handleDeleteSuccess} />
                                ))}
                            </div>

                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PostDetail;
