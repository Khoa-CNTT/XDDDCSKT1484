import classNames from 'classnames/bind';
import styles from '~/layouts/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import SidebarAdmin from '~/layouts/components/SidebarAdmin';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('contain')}>
                <SidebarAdmin />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;