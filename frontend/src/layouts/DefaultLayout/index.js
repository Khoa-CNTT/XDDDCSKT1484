import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Header from '~/layouts/components/Header';
import { useContext } from 'react';

import { NavBarsContext } from '~/context/NavBarsContext';
import SidebarMobile from '../components/SidebarMobile';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { showNav } = useContext(NavBarsContext);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('contain')}>
                <Sidebar />
                {showNav &&
                    <SidebarMobile />
                }
                <div className={cx('content')}>{children}</div>
            </div>

        </div>
    );
}

export default DefaultLayout;