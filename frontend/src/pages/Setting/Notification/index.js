import classNames from "classnames/bind";
import styles from './Notification.module.scss'
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Notification() {
    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('find')}>
                <div className={cx('find-heading')}>{t('alowNotify')}</div>
                <label className={cx('switch')}>
                    <input type="checkbox" />
                    <span className={cx('switch-round')}></span>
                </label>
            </div>
            <div className={cx('comment')}>
                <div className={cx('comment-heading')}>{t('notifyPost')}</div>
                <div className={cx('checkbox')}><input type="checkbox" /></div>
            </div>
            <div className={cx('friend')}>
                <div className={cx('friend-heading')}>{t('friendNotify')}</div>
                <div className={cx('checkbox')}><input type="checkbox" /></div>
            </div>
            <div className={cx('email')}>
                <div className={cx('email-heading')}>
                    {t('notifyEmail')}
                </div>
                <div className={cx('radio')}>
                    <input type='radio' name="email" id="yes" value='yes' />
                    <label htmlFor="yes">{t('yes')}</label>
                    <input type='radio' name="email" id="no" value='no' />
                    <label htmlFor="no">{t('no')}</label>
                </div>
            </div>
        </div>
    );
}

export default Notification;