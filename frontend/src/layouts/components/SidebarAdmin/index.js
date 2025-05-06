import classNames from 'classnames/bind';
import styles from './SidebarAdmin.module.scss'
import routes from '~/config/routes';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { AdvertiseIcon, DashboardIcon, PostManagementIcon, ReportAdminIcon, StatisticIcon, UserManagementIcon } from '~/components/Icons';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);


function SidebarAdmin() {
    const [isSelected, setIsSelected] = useState('');
    const location = useLocation();
    const { t } = useTranslation();
    const item = [
        { to: routes.dashboard, icon: <DashboardIcon />, title: t('dashboard') },
        { to: routes.usersManagement, icon: <UserManagementIcon />, title: t('users') },
        { to: routes.postsManagement, icon: <PostManagementIcon />, title: t('posts') },
        { to: routes.advManagement, icon: <AdvertiseIcon />, title: t('advertisement') },
        { to: routes.statistic, icon: <StatisticIcon />, title: t('statistic') },
        { to: routes.report, icon: <ReportAdminIcon />, title: t('report') },
    ]
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        setIsSelected(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <h3 className={cx('admin')}>{t('admin').toUpperCase()}</h3>
                {item.map((item, index) => (
                    <Button
                        onClick={() => setIsSelected(item.title)}
                        className={cx('nav', { active: isSelected === item.title })}
                        key={index}
                        leftIcon={item.icon}
                        to={item.to}
                    >
                        {item.title}
                    </Button>
                ))
                }
            </div>
        </div>
    );
}

export default SidebarAdmin;