import classNames from "classnames/bind";
import styles from './PostsManagement.module.scss'
import { EditIcon, LeftIcon, RightIcon, SearchIcon, TrashIcon } from "~/components/Icons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { deletedPostServices, patchStatusPostServices, searchPostsAdminServices } from "~/apiServices";
import ModalEdit from "~/components/ModalEdit";
import ModalDel from "~/components/ModalDel";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function PostsManagement() {
    const [modalEdit, setModalEdit] = useState(null);
    const [modalDel, setModalDel] = useState(null);
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

    const handleEdit = async (data) => {
        const res = await patchStatusPostServices(modalEdit.id, data, token);
        if (res?.data) {
            fetchAllPost(pageCurrent, token);
            setModalEdit(null);
        }

    }

    const handleDelete = async () => {
        const res = await deletedPostServices(modalDel, token);
        if (res?.data) {
            fetchAllPost(pageCurrent, token);
            setModalDel(null);
        }
    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent(prev => Math.max(prev + 1, totalsPage - 1));
    };

    const onEdit = (post) => {
        setModalEdit(post);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('post')}>
                <div className={cx('post-header')}>
                    <div className={cx('post-heading')}>
                        {t('managementPost')}
                    </div>
                    <div className={cx('post-search')}>
                        <SearchIcon className={cx('search-icon')} />
                        <input className={cx('search-input')} type="text" placeholder={t('searchPostName')} />
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
                                <th>{t('action')}</th>
                            </tr>
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
                                            <td>{post.ads.toString()}</td>
                                            <td>{post.show.toString()}</td>
                                            <td>
                                                {post.type_post === 'CONTENT' && <EditIcon onClick={() => onEdit(post)} />}
                                                <TrashIcon onClick={() => setModalDel(post.id)} />
                                            </td>
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
            {modalEdit &&
                <ModalEdit
                    text='Post'
                    name='status'
                    type="select"
                    options={[
                        'true',
                        'false',
                    ]}
                    defaultValue={modalEdit.show}
                    handleEdit={handleEdit}
                    handleCancel={() => setModalEdit(null)}
                />
            }
            {modalDel &&
                <ModalDel
                    text='Post'
                    handleDelete={handleDelete}
                    handleCancel={() => setModalDel(null)}
                />
            }
        </div>
    );
}

export default PostsManagement;