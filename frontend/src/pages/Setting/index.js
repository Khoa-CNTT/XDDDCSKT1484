import classNames from "classnames/bind";
import styles from './Setting.module.scss'
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function Setting() {

    const [currentUser, setCurrentUser] = useState({});
    const { t } = useTranslation();
    useEffect(() => {
        const userCurrent = JSON.parse(localStorage.getItem('currentUser'));
        if (userCurrent) {
            setCurrentUser(userCurrent);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>{t('setting')}</h1>

            <ul className={cx('category')}>
                <li className={cx('item')} >{t('account')}</li>
                <li className={cx('item')} >{t('privacy')}</li>
                <li className={cx('item')} >{t('preferences')}</li>
                <li className={cx('item')} >{t('notifications')}</li>
                <li className={cx('item')} >{t('advance')}</li>
            </ul>

            <div className={cx('account')}>
                <span className={cx('account-heading')}>{t('accountInfo')}</span>
            </div>

            <div className={cx('email')}>
                <span className={cx('email-heading')}>
                    {t('emailAddress')}
                </span>
                <span className={cx('email-content')}>
                    {currentUser.email}
                </span>
            </div>

            <div className={cx('gender')}>
                <div className={cx('gender-title')}>
                    <span className={cx('gender-heading')}>
                        {t('gender')}
                    </span>
                    <span className={cx('gender-content')}>
                        {t('genderNotice')}
                    </span>
                </div>
                <select
                    className={cx('gender-btn')}
                    value={currentUser.gender || ''}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, gender: e.target.value }))}
                >
                    <option value='' disabled>{currentUser.gender}</option>
                    <option value='Male'>{t('male')}</option>
                    <option value='Female'>{t('female')}</option>
                    <option value='Other'>{t('other')}</option>
                </select>
            </div>

            <div className={cx('language')}>
                <div className={cx('language-title')}>
                    <span className={cx('language-heading')}>
                        {t('displayLanguage')}
                    </span>
                    <span className={cx('language-content')}>
                        {t('displayLangDescription')}
                    </span>
                </div>
                <select
                    className={cx('language-btn')}
                    value={currentUser.language || ''}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, language: e.target.value }))}
                >
                    <option value='' disabled>{currentUser.language}</option>
                    <option value='English'>{t('langEnglish')}</option>
                    <option value='China'>{t('langChinese')}</option>
                    <option value='Japan'>{t('langJapanese')}</option>
                </select>
            </div>

            <div className={cx('delete')}>
                <div className={cx('delete-title')}>
                    <span className={cx('delete-heading')}>
                        {t('deletedAccount')}
                    </span>
                    <span className={cx('delete-content')}>
                        {t('deleteWarning')}
                    </span>
                </div>
                <Button deleted round className={cx('delete-btn')}>{t('deletedAccount')}</Button>
            </div>

            <div className={cx('save')}>
                <Button className={cx('save-btn')} round normal>{t('saveBtn')}</Button>
            </div>
        </div >
    );
}

export default Setting;
