import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Link } from "react-router-dom";
import Image from "~/components/Image";
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function HistoryItem({ data, avatar }) {

    return (
        <Link to={`/post/${data.post_id}`} className={cx('history-item')}>
            <Image src={avatar} className={cx('avatar')} />
            <div className={cx('message')}>
                <div className={cx('content')}>{data.message}</div>
                <div className={cx('createdTime')}>{format(new Date(data.created_at), 'dd/MM/yyyy HH:mm')}</div>
            </div>
        </Link>
    );
}

export default HistoryItem;