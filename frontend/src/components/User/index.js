import classNames from "classnames/bind";
import styles from './User.module.scss';
import images from "~/assets/images";
import Button from "~/components/Button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { acceptFriendServices, addFriendServices, getStatusFriendServices } from "~/apiServices";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function User({ data }) {
    const [statusFriend, setStatusFriend] = useState('')
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('authToken');
    const { t } = useTranslation();
    const fetchStatusFriend = async () => {
        if (token) {
            if (data.id === user.id) {
                setStatusFriend('Me')
            } else {
                const res = await getStatusFriendServices(data.id, token);

                if (res?.data) {
                    switch (res.data.status) {
                        case 'pendingSend':
                            setStatusFriend('Sent');
                            break;
                        case 'pendingReceived':
                            setStatusFriend('Accept invitation');
                            break;
                        case 'friends':
                            setStatusFriend('Friend');
                            break;
                        default:
                            break;
                    }
                } else {
                    setStatusFriend('Add Friend')
                }
            }
        }
    };

    const handleFriend = async () => {
        if (statusFriend === 'Add Friend') {
            const res = await addFriendServices(data.id, token);
            if (res?.data.receiver === data.name) {
                setStatusFriend('Sent');
            }
        } else if (statusFriend === 'Accept invitation') {
            const res = await acceptFriendServices(data.id, token);
            if (res?.data) {
                setStatusFriend('Friend');
            }
        }
    }

    useEffect(() => {
        fetchStatusFriend();
        // eslint-disable-next-line
    }, [data, user, token])

    return (
        <div className={cx('wrapper')}>
            <Link to={`/user/${data.id}`} className={cx('avatar')}>
                <img className={cx('img')} alt={data.name} src={data.img || images.avatar} />
            </Link>
            <Link to={`/user/${data.id}`} className={cx('info')}>
                <h3 className={cx('fullname')}>{data.name}</h3>
                <h4 className={cx('username')}>@{data.username}</h4>
            </Link>
            <div className={cx('friend')}>
                <Button normal onClick={handleFriend}>{
                    statusFriend === 'Sent'
                        ? t('statusSent')
                        : statusFriend === 'Accept invitation'
                            ? t('statusAccept')
                            : statusFriend === 'Friend' ? t('statusFriend') :
                                statusFriend === 'Me' ? t('access') : t('addFriend')
                }</Button>
            </div>
        </div>
    );
}

export default User;