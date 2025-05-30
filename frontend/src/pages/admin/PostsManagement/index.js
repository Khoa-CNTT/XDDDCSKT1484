import classNames from "classnames/bind";
import styles from './PostsManagement.module.scss'
import { LeftIcon, RightIcon } from "~/components/Icons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { searchPostsAdminServices } from "~/apiServices";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function PostsManagement() {
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listPost, setListPost] = useState([]);
    const token = localStorage.getItem('authToken');
    const { t } = useTranslation();
    useEffect(() => {
        fetchAllPost(pageCurrent, token);
    }, [pageCurrent, token])

    const fetchAllPost = async (page, token) => {
        const res = await searchPostsAdminServices(page, 10, '', '', token);
        if (res?.data) {
            setListPost(res.data.content);
            setTotalsPage(res.data?.totalPages);
        }
    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent(prev => Math.min(prev + 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('post')}>
                <div className={cx('post-header')}>
                    <div className={cx('post-heading')}>
                        {t('managementPost')}
                    </div>
                </div>
                <div className={cx('post-details')}>
                    <table className={cx('table-post')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('fullname')}</th>
                                <th>{t('typePost')}</th>
                                <th>{t('published')}</th>
                                <th>{t('language')}</th>
                                <th>{t('advertisement')}</th>
                                <th>{t('show')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPost.length > 0 ?
                                (
                                    listPost.map((post, index) => (
                                        <tr key={post.id}>
                                            <th>{index + 1}</th>
                                            <td>{post.full_name}</td>
                                            <td>{post.type_post}</td>
                                            <td>{format(new Date(post.created_at), 'dd/MM/yyyy HH:mm')}</td>
                                            <td>{post.language}</td>
                                            <td>{post.ads.toString()}</td>
                                            <td>{post.show.toString()}</td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr><td colSpan="6">{t('noAdsFound')}</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={cx('post-footer')}>
                    <div className={cx('page-current')}>
                        {`${pageCurrent + 1} ${t('of')} ${totalsPage} ${t('page')}`}
                    </div>

                    <div className={cx('pagination')}>
                        <LeftIcon onClick={handleReducePage} className={cx('prev-btn', { 'disable': pageCurrent === 0 })} />
                        <RightIcon onClick={handleIncreasePage} className={cx('next-btn', { 'disable': (pageCurrent + 1) === totalsPage })} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsManagement;