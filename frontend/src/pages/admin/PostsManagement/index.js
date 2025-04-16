import classNames from "classnames/bind";
import styles from './PostsManagement.module.scss'
import { EditIcon, LeftIcon, RightIcon, SearchIcon, TrashIcon } from "~/components/Icons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { searchPostsAdminServices } from "~/apiServices";

const cx = classNames.bind(styles)

function PostsManagement() {
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchAllPost(pageCurrent, 10, token);
    }, [pageCurrent])

    const fetchAllPost = async (page, size, token) => {
        const res = await searchPostsAdminServices(page, size, '', '', token);
        if (res?.data) {
            setListPost(res.data.content);
            setTotalsPage(res.data?.totalPages);
        }
    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        console.log('tang');

        setPageCurrent(prev => Math.max(prev + 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('post')}>
                <div className={cx('post-header')}>
                    <div className={cx('post-heading')}>
                        Management Post
                    </div>
                    <div className={cx('post-search')}>
                        <SearchIcon className={cx('search-icon')} />
                        <input className={cx('search-input')} type="text" placeholder="Search post name" />
                    </div>
                </div>
                <div className={cx('post-details')}>
                    <table className={cx('table-post')}>
                        <thead>
                            <th>STT</th>
                            <th>Full Name</th>
                            <th>Type Post</th>
                            <th>Date Post</th>
                            <th>Language</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {listPost.length > 0 ?
                                (
                                    listPost.map((post, index) => (
                                        <tr key={post.id}>
                                            <th>{index + 1}</th>
                                            <td>{post.user_name}</td>
                                            <td>{post.type_post}</td>
                                            <td>{format(new Date(post.created_at), 'dd/MM/yyyy HH:mm')}</td>
                                            <td>{post.language}</td>
                                            <td>
                                                <EditIcon />
                                                <TrashIcon />
                                            </td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr><td colspan="6">Không có post nào</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={cx('post-footer')}>
                    <div className={cx('page-current')}>
                        {`${pageCurrent + 1} of ${totalsPage} Page`}
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