import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { LeftIcon } from '~/components/Icons';



const cx = classNames.bind(styles);

function Header({ title, onBack }) {


    return (
        <header className={cx('header')}>
            <button onClick={onBack} className={cx('back-btn')}>
                <LeftIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;