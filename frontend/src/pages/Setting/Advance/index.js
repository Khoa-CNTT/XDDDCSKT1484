import classNames from "classnames/bind";
import styles from './Advance.module.scss'
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Advance() {
    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('history')}>
                <div className={cx('history-heading')}>{t('clearHistory')}</div>
                <Button deleted>{t('deleted')}</Button>
            </div>
            <div className={cx('down')}>
                <div className={cx('down-heading')}>{t('downData')}</div>
                <Button primary>{t('downBtn')}</Button>
            </div>
            <div className={cx('lock')}>
                <div className={cx('lock-heading')}>{t('disableAccount')}</div>
                <Button normal>{t('disable')}</Button>
            </div>
            <div className={cx('reset')}>
                <div className={cx('reset-heading')}>{t('resetSetting')}</div>
                <Button round primary>{t('reset')}</Button>
            </div>
        </div>
    );
}

export default Advance;