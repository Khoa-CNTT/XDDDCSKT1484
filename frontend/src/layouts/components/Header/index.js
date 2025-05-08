import { useState, useRef, useMemo, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import History from '~/components/Popper/History';
import routesConfig from '~/config/routes';
import { infoUserCurrentServices, notifyServices, putNotifyServices } from '~/apiServices';
import Notifications from '~/components/Notifications';
import { UserContext } from '~/context/UserContext';
import { NavBarsContext } from '~/context/NavBarsContext';
import { useTranslation } from 'react-i18next';
import { AdvertiseIcon, BarsIcon, ClearSearchIcon, DashboardIcon, HelpIcon, LanguagesIcon, LogoutIcon, NotifyIcon, SearchIcon, SettingIcon, UploadIcon, UserIcon } from '~/components/Icons';
import { useWebSocket } from '~/hooks';

const cx = classNames.bind(styles);

function Header() {
    const { t, i18n } = useTranslation();
    const [searchValue, setSearchValue] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [notify, setNotify] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalsPage, setTotalsPage] = useState(1);
    const navigate = useNavigate();
    const inputRef = useRef();
    const { user, setUser } = useContext(UserContext);
    const { setShowNav } = useContext(NavBarsContext);
    const { notification } = useWebSocket();
    const token = localStorage.getItem('authToken');

    const menuItems = useMemo(() => {
        const items = [
            {
                icon: <UserIcon />,
                title: user?.name || '',
                to: `/user/${user?.id || ''}`,
                separate: true,
            },
            {
                icon: <AdvertiseIcon />,
                title: t('postAds'),
                to: routesConfig.postAds,
            },
            {
                icon: <SettingIcon />,
                title: t('setting'),
                to: routesConfig.setting,
            },
            {
                icon: <HelpIcon />,
                title: t('support'),
                to: routesConfig.help,
            },
            {
                icon: <LanguagesIcon />,
                title: t('language'),
                children: {
                    title: t('language'),
                    data: [
                        { type: 'language', code: 'en', title: t('langEnglish') },
                        { type: 'language', code: 'jp', title: t('langJapanese') },
                        { type: 'language', code: 'cn', title: t('langChinese') },
                    ],
                },
            },
        ];

        if (user) {
            const userRole = user.roles.substring(1, user.roles.length - 1);

            if (userRole === 'ADMIN') {
                items.push({
                    icon: <DashboardIcon width='24px' height='24px' />,
                    title: t('adminManagement'),
                    to: routesConfig.dashboard,
                });
            }
        }

        items.push({
            icon: <LogoutIcon />,
            title: t('logout'),
            to: routesConfig.login,
        });

        return items;
    }, [t, user]);

    useEffect(() => {
        if (notification.length > 0) {
            setNotify({
                display: true,
                message: notification[notification.length - 1],
            });
        }
    }, [notification]);

    useEffect(() => {
        const initializeUser = async () => {
            const userCurrent = JSON.parse(localStorage.getItem('currentUser'));

            if (userCurrent) {
                setUser(userCurrent);
                const token = localStorage.getItem('authToken');
                if (token) {
                    const isValid = await fetchInfoUser();
                    if (!isValid) {
                        localStorage.clear();
                        setUser(null);
                    }
                }
            }
        };

        initializeUser();
        // eslint-disable-next-line
    }, [setUser]);


    const fetchInfoUser = useCallback(async () => {
        if (!token) return false;

        const res = await infoUserCurrentServices(token);
        if (!res?.data) {
            localStorage.clear();
            setUser(null);
            return false;
        }
        return true;
        // eslint-disable-next-line
    }, [setUser]);

    const fetchNotifications = async (page) => {
        const res = await notifyServices(page, 5, token);
        if (res?.data) {
            setNotifications(prev => [...prev, ...res.data.content]);
            setTotalsPage(res.data.totalsPage);
        }
    };

    const handlers = useMemo(() => ({
        clearSearch: () => {
            setSearchValue('');
            inputRef.current?.focus();
        },
        search: () => {
            if (searchValue.trim()) {
                navigate(`/search?q=${searchValue.trim()}`);
            }
        },
        handleKeyUp: (e) => {
            if (e.code === 'Enter') handlers.search();
        },
    }), [searchValue, navigate]);

    const handleChange = useCallback((e) => {
        const valueSearch = e.target.value;
        if (!valueSearch.startsWith(' ')) {
            setSearchValue(valueSearch);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchNotifications(currentPage);
        }
        // eslint-disable-next-line
    }, [token, currentPage]);

    const handleMenuChange = async (menuItem) => {
        if (menuItem.type === 'language') {
            i18n.changeLanguage(menuItem.code)
        }
    };

    const handleClickNotify = async () => {
        await putNotifyServices(token);
        setCurrentPage(0);
        setNotifications([]);
        fetchNotifications(0);
    }


    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchNotifications(nextPage);
    };


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Navbar Mobile */}
                <div onClick={() => setShowNav(prev => !prev)} className={cx('bars')}>
                    <BarsIcon />
                </div>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={routesConfig.home}>
                        <img src={images.logo} alt="Forum" />
                        <h4 className={cx('logo-title')}>ForumLanguages</h4>
                    </Link>
                </div>

                {/* Search */}
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onKeyUp={handlers.handleKeyUp}
                        placeholder={t('searchPlaceholder')}
                    />
                    {searchValue && (
                        <button onClick={handlers.clearSearch} className={cx('clear')}>
                            <ClearSearchIcon />
                        </button>
                    )}
                    <button onMouseDown={(e) => e.preventDefault()} onClick={handlers.search} className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>

                <div className={cx('btn-search__mobile')}>
                    <SearchIcon />
                </div>

                {/* Actions */}
                <div className={cx('action')}>
                    {user?.name ? (
                        <>
                            <Tippy content={t('createTooltip')} placement="bottom">
                                <Button className={cx('create')} to={routesConfig.upload} normal round leftIcon={<UploadIcon />}>
                                    {t('create')}
                                </Button>
                            </Tippy>
                            <History
                                items={notifications}
                                avatar={user.img}
                                header
                                title={t('notifications')}
                                textBtn={t('markRead')}
                                handleLoadMore={handleLoadMore}
                                showLoadMore={totalsPage === (currentPage + 1)}
                            >
                                <Button onClick={handleClickNotify} className={cx('notify-btn')} iconText leftIcon={<NotifyIcon />} />
                            </History>
                            <Menu key={i18n.language} items={menuItems} onChange={handleMenuChange}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={user?.img}
                                    alt={user?.name || 'User Avatar'}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button className={cx('btn-login')} to={routesConfig.login} normal round>
                                {t('login')}
                            </Button>
                            <Button className={cx('btn-register')} to={routesConfig.register} normal round>
                                {t('register')}
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {notify.display && <Notifications message={notify.message} onClose={() => setNotify({})} />}
        </header>
    );
}

export default Header;
