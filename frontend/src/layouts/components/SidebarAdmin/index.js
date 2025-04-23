import classNames from 'classnames/bind';
import styles from './SidebarAdmin.module.scss'
import routes from '~/config/routes';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { DashboardIcon, PostManagementIcon, ReportAdminIcon, StatisticIcon, UserManagementIcon } from '~/components/Icons';
import { useLocation } from 'react-router-dom';
import AdsManagement from '~/pages/admin/AdvManagement';

const cx = classNames.bind(styles);

const item = [
    { to: routes.dashboard, icon: <DashboardIcon />, title: 'Dashboard' },
    { to: routes.usersManagement, icon: <UserManagementIcon />, title: 'Users' },
    { to: routes.postsManagement, icon: <PostManagementIcon />, title: 'Posts' },
    { to: routes.advManagement, icon: <PostManagementIcon />, title: 'Advertisement' },
    { to: routes.statistic, icon: <StatisticIcon />, title: 'Statistic' },
    { to: routes.report, icon: <ReportAdminIcon />, title: 'Report' },
]

function SidebarAdmin() {
    const [isSelected, setIsSelected] = useState('');
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        setIsSelected(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <h3 className={cx('admin')}>ADMIN</h3>
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