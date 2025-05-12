import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './History.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useMemo } from 'react';
import HistoryItem from './HistoryItem';
import Header from './Header';
import Button from '~/components/Button';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function History({ children, items = [], title, avatar, handleLoadMore, showLoadMore }) {

    const { t } = useTranslation();
    const renderItems = useMemo(
        () =>
            items.map((item, index) => (
                <HistoryItem avatar={avatar} key={index} data={item} />
            )),
        [items, avatar]
    );

    return (
        //Using a wrapper <div> or <span> tag around the reference
        //element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                trigger='click'
                offset={[12, 8]}
                interactive
                hideOnClick='toggle'
                delay={[0, 100]}
                placement="bottom-end"
                render={(attrs) => (
                    <ul className={cx('history-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('history-popper')}>
                            <Header title={title} />
                            <div className={cx('history-body')}>
                                {renderItems}
                                {!showLoadMore && <Button onClick={handleLoadMore} className={cx('btn-load')} normal>{t('btnLoadMore')}</Button>}
                            </div>
                        </PopperWrapper>
                    </ul>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default History;
