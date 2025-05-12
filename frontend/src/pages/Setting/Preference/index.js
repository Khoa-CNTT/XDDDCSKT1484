import classNames from "classnames/bind";
import styles from './Preference.module.scss'
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Preference() {

    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('theme')}>
                <div className={cx('theme-heading')}>
                    {t('theme')}
                </div>
                <div className={cx('radio')}>
                    <input type='radio' name="theme" id="dark" value='dark' />
                    <label htmlFor="dark">{t('dark')}</label>
                    <input type='radio' name="theme" id="light" value='light' />
                    <label htmlFor="light">{t('light')}</label>
                </div>
            </div>
            <div className={cx('time')}>
                <div className={cx('time-heading')}>
                    {t('showTime')}
                </div>
                <div className={cx('radio')}>
                    <input type='radio' name="time" id="12h" value='12h' />
                    <label htmlFor="12h">12</label>
                    <input type='radio' name="time" id="24h" value='24h' />
                    <label htmlFor="24h">24</label>
                </div>
            </div>
            <div className={cx('post')}>
                <div className={cx('post-heading')}>{t('sortPost')}</div>
                <select className={cx('select')}>
                    <option>{t('latest')}</option>
                    <option>{t('oldest')}</option>
                    <option>{t('outstanding')}</option>
                </select>
            </div>
            <div className={cx('font')}>
                <div className={cx('font-heading')}>{t('fontSize')}</div>
                <select className={cx('select')}>
                    <option>{t('large')}</option>
                    <option>{t('medium')}</option>
                    <option>{t('small')}</option>
                </select>
            </div>
        </div>
    );
}

export default Preference;