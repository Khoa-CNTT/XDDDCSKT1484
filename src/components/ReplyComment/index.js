import classNames from "classnames/bind";
import styles from './ReplyComment.module.scss'
import { MoreIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function ReplyComment({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('reply')}>
                <div className={cx('body')}>
                    <h4 className={cx('username')}>{data.user_name}</h4>
                    <span className={cx('createAt')}>{data.created_at} </span>
                </div>
                <div className={cx('content')}>{data.content}</div>
            </div>
            <div className={cx('more-btn')}>
                <MoreIcon />
            </div>
        </div>
    );
}

export default ReplyComment;