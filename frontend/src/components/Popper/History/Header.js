import classNames from 'classnames/bind';
import styles from './History.module.scss';


const cx = classNames.bind(styles);

function Header({ title }) {


    return (
        <header className={cx('header')}>
            <h4 className={cx('title')}>{title}</h4>
        </header>
    );
}

export default Header;