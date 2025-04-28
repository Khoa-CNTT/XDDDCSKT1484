import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Link } from "react-router-dom";
import Image from "~/components/Image";
import { format } from 'date-fns';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function HistoryItem({ data, avatar }) {
    const { user } = useContext(UserContext);
    const handleRedirect = () => {
        if (data.type === 'COMMENT' || data.type === 'LIKE') {
            return `/post/${data.post_id}`;
        } else if (data.type === 'FRIEND' || data.type === 'POST') {
            return `/user/${user.id}`;
        }
    }
    return (
        <Link to={handleRedirect()} className={cx('history-item', data.status ? 'read' : 'unread')}>
            <Image src={avatar} className={cx('avatar')} />
            <div className={cx('message')}>
                <div className={cx('content')}>{data.message}</div>
                <div className={cx('createdTime')}>{format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')}</div>
            </div>
        </Link>
    );
}

export default HistoryItem;