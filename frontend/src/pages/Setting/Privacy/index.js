import classNames from "classnames/bind";
import styles from './Privacy.module.scss'
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Privacy() {
    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile')}>
                <div className={cx('profile-heading')}>{t('seeProfile')}</div>
                <select className={cx('select')}>
                    <option>{t('public')}</option>
                    <option>{t('friendOnly')}</option>
                    <option>{t('onlyMe')}</option>
                </select>
            </div>
            <div className={cx('post')}>
                <div className={cx('post-heading')}>{t('seePost')}</div>
                <select className={cx('select')}>
                    <option>{t('public')}</option>
                    <option>{t('friendOnly')}</option>
                    <option>{t('onlyMe')}</option>
                </select>
            </div>
            <div className={cx('friend')}>
                <div className={cx('friend-heading')}>{t('makeFriend')}</div>
                <div className={cx('radio')}>
                    <input type='radio' name="AddFriend" id="publicFr" value='publicFr' />
                    <label htmlFor="publicFr">{t('public')}</label>
                    <input type='radio' name="AddFriend" id="friendFr" value='friendFr' />
                    <label htmlFor="friendFr">{t('friendOfFriend')}</label>
                </div>
            </div>
            <div className={cx('find')}>
                <div className={cx('find-heading')}>{t('findUsername')}</div>
                <label className={cx('switch')}>
                    <input type="checkbox" />
                    <span className={cx('switch-round')}></span>
                </label>
            </div>
            <div className={cx('chat')}>
                <div className={cx('chat-heading')}>{t('sendMessage')}</div>
                <div className={cx('radio')}>
                    <input type='radio' name="chat" id="publicChat" value='publicChat' />
                    <label htmlFor="publicChat">{t('public')}</label>
                    <input type='radio' name="chat" id="friendChat" value='friendChat' />
                    <label htmlFor="friendChat">{t('statusFriend')}</label>
                </div>
            </div>
        </div>
    );
}

export default Privacy;