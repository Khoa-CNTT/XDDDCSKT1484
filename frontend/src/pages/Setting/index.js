import classNames from "classnames/bind";
import styles from './Setting.module.scss'
import Button from "~/components/Button";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateInfoUserServices } from "~/apiServices";

const cx = classNames.bind(styles)

const languageList = {
    English: 'en',
    China: 'cn',
    Japan: "jp",
}

function Setting() {
    const [currentUser, setCurrentUser] = useState({});
    const inputRef = useRef();
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const userCurrent = JSON.parse(localStorage.getItem('currentUser'));
        if (userCurrent) {
            setCurrentUser(userCurrent);
        }
    }, []);

    const handleFullname = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.style.borderColor = '#999';
        }
    };

    const handleSave = async () => {
        const data = {
            name: currentUser.name,
            gender: currentUser.gender,
            language: currentUser.language,
        }

        const token = localStorage.getItem('authToken');

        const res = await updateInfoUserServices(data, token);

        if (res?.data) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            if (i18n.language !== languageList[data.language]) {
                i18n.changeLanguage(languageList[data.language])
            }
        }
        if (inputRef.current) {
            inputRef.current.blur();
            inputRef.current.style.borderColor = 'transparent';
        }
    }

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

            <div className={cx('fullname')}>
                <span className={cx('fullname-heading')}>
                    {t('fullname')}
                </span>
                <div className={cx('fullname-body')}>
                    <input
                        ref={inputRef}
                        value={currentUser.name || ''}
                        onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value.trim() }))}
                        className={cx('fullname-input')}
                    />
                    <Button className={cx('btn-change')} normal onClick={handleFullname}>{t('change')}</Button>
                </div>
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
                        {t('postLanguage')}
                    </span>
                    <span className={cx('language-content')}>
                        {t('postLangDescription')}
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

            <div className={cx('save')}>
                <Button className={cx('save-btn')} round normal onClick={handleSave}>{t('saveBtn')}</Button>
            </div>
        </div >
    );
}

export default Setting;
