import classNames from "classnames/bind";
import styles from './UsersManagement.module.scss'
import { EditIcon, LeftIcon, RightIcon, SearchIcon, TrashIcon } from "~/components/Icons";
import Image from "~/components/Image";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { deletedUserServices, getAllUserServices, patchStatusUserServices } from "~/apiServices";
import ModalEdit from "~/components/ModalEdit";
import ModalDel from "~/components/ModalDel";

const cx = classNames.bind(styles)

function UsersManagement() {
    const [modalEdit, setModalEdit] = useState(null);
    const [modalDel, setModalDel] = useState(null);
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listUser, setListUser] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchAllUser(pageCurrent, token);
    }, [pageCurrent, token])

    const fetchAllUser = async (page, token) => {
        const res = await getAllUserServices(page, 10, token);
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

    const handleDelete = async () => {
        const res = await deletedUserServices(modalDel, token);
        if (res?.data) {
            fetchAllUser(pageCurrent, token);
            setModalDel(null);
        }

    }

    const handleEdit = async (data) => {
        const res = await patchStatusUserServices(modalEdit.id, data, token);
        if (res?.data) {
            fetchAllUser(pageCurrent, token);
            setModalEdit(null);
        }

    }

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
                            <tr>
                                <th>STT</th>
                                <th>Avatar</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Language</th>
                                {/* <th>Active</th> */}
                                <th>Action</th>
                            </tr>
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
                                                <EditIcon onClick={() => setModalEdit(user)} />
                                                <TrashIcon onClick={() => setModalDel(user.id)} />
                                            </td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr><td colSpan="6">Không có user nào</td></tr>
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
            {modalEdit &&
                <ModalEdit
                    text='User'
                    fields={[
                        {
                            name: 'statusUser',
                            value: modalEdit.name,
                            type: 'text'
                        },
                    ]}
                    handleEdit={handleEdit}
                    handleCancel={() => setModalEdit(null)}
                />
            }
            {modalDel &&
                <ModalDel
                    text='user'
                    handleDelete={handleDelete}
                    handleCancel={() => setModalDel(null)}
                />
            }
        </div>
    );
}

export default UsersManagement;