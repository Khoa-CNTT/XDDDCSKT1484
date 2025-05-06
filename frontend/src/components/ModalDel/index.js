import classNames from "classnames/bind";
import styles from '~/components/ModalEdit/Modal.module.scss';
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function ModalDel({ text, handleDelete, handleCancel }) {
    const { t } = useTranslation();
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-body')}>
                <div className={cx('content')}>
                    <h3 className={cx('heading')}>{t('deleted')} {text}</h3>
                    <p className={cx('title')}>{t('deletedConfirm')} {text}?</p>
                </div>
                <div className={cx('actions')}>
                    <Button deleted onClick={handleDelete}>{t('deleted')}</Button>
                    <Button normal onClick={handleCancel}>{t('deletedBtnCancel')}</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalDel;
