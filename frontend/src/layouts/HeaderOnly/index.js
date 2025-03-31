import classNames from 'classnames/bind';
import styles from '~/layouts/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import SidebarMobile from '~/layouts/components/SidebarMobile';
import { useContext } from 'react';
import { NavBarsContext } from '~/context/NavBarsContext';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const { showNav } = useContext(NavBarsContext);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('contain')}>
                {showNav &&
                    <SidebarMobile />
                }
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;