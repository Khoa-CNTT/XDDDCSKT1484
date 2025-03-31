import classNames from "classnames/bind";
import styles from './UsersManagement.module.scss'
import { EditIcon, LeftIcon, RightIcon, SearchIcon, TrashIcon } from "~/components/Icons";
import Image from "~/components/Image";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { getAllUserServices } from "~/apiServices";

const cx = classNames.bind(styles)

function UsersManagement() {
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchAllUser(pageCurrent, 10, token);
    }, [pageCurrent])

    const fetchAllUser = async (page, size, token) => {
        const res = await getAllUserServices(page, size, token);
        if (res?.data) {
            setListUser(res.data.content);
            setTotalsPage(res.data?.totalPages);
        }
    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user')}>
                <div className={cx('user-header')}>
                    <div className={cx('user-heading')}>
                        Management User
                    </div>
                    <div className={cx('user-search')}>
                        <SearchIcon className={cx('search-icon')} />
                        <input className={cx('search-input')} type="text" placeholder="Search user name" />
                    </div>
                </div>
                <div className={cx('user-details')}>
                    <table className={cx('table-user')}>
                        <thead>
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Language</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {listUser.length > 0 ?
                                (
                                    listUser.map((user, index) => (
                                        <tr key={user.id}>
                                            <th>{index + 1}</th>
                                            <td><Image className={cx('img-user')} src={user.img || images.avatar} /></td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.language}</td>
                                            <td>
                                                <EditIcon />
                                                <TrashIcon />
                                            </td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr><td colspan="6">Không có user nào</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={cx('user-footer')}>
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

export default UsersManagement;