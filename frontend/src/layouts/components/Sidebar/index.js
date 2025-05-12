import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import routesConfig from '~/config/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AboutIcon, AdvertiseIcon, HelpIcon, HomeIcon, LanguagesIcon, NewsIcon, PolicyIcon, PopularIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const location = useLocation();
    const pathname = location.pathname;

    const handleGetPostByLanguage = (lang) => {

        const searchParams = new URLSearchParams(location.search);
        searchParams.set("language", lang);
        const newSearch = searchParams.toString();

        navigate(`/search?${newSearch}`, {
            state: { from: 'sidebar' }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('navbar')}>

                    <span className={cx('title')}>{t('main')}</span>
                    <ul className={cx('navList')}>
                        <Link to='/' className={cx('navItem', pathname === '' ? 'active' : '')}>
                            <HomeIcon />
                            <span>{t('home')}</span>
                        </Link>
                        <li className={cx('navItem')}>
                            <PopularIcon />
                            <span>{t('popular')}</span>
                        </li>
                        <li className={cx('navItem')}>
                            <NewsIcon />
                            <span>{t('new')}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('languages')}>
                    <span className={cx('title')}>{t('language')}</span>
                    <ul className={cx('languageList')}>
                        <li onClick={() => handleGetPostByLanguage('English')} className={cx('languageItem')}>
                            <LanguagesIcon />
                            <span>{t('langEnglish')}</span>
                        </li>
                        <li onClick={() => handleGetPostByLanguage('China')} className={cx('languageItem')}>
                            <LanguagesIcon />
                            <span>{t('langChinese')}</span>
                        </li>
                        <li onClick={() => handleGetPostByLanguage('Japan')} className={cx('languageItem')}>
                            <LanguagesIcon />
                            <span>{t('langJapanese')}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('other')}>
                    <span className={cx('title')}>{t('other')}</span>
                    <div className={cx('otherList')}>
                        <Link to={routesConfig.aboutFL} className={cx('otherItem')}>
                            <AboutIcon />
                            <span>{t('aboutFL')}</span>
                        </Link>
                        <Link to={routesConfig.postAds} className={cx('otherItem')}>
                            <AdvertiseIcon />
                            <span>{t('advertise')}</span>
                        </Link>
                        <Link to={routesConfig.help} className={cx('otherItem')}>
                            <HelpIcon />
                            <span>{t('help')}</span>
                        </Link>
                        <Link to={routesConfig.policy} className={cx('otherItem')}>
                            <PolicyIcon />
                            <span >{t('policy')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
