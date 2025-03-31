import classNames from "classnames/bind";
import styles from './Notifications.module.scss'
import { CloseIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function Notifications({ message, onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('notify')}>
                <span className={cx('message')}>{message}</span>
                <div className={cx('close-btn')} onClick={onClose}>
                    <CloseIcon />
                </div>
            </div>
        </div>
    );
}

export default Notifications;