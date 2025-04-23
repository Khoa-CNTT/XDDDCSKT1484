import classNames from "classnames/bind";
import styles from '~/components/ModalEdit/Modal.module.scss';
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ModalDel({ text, handleDelete, handleCancel }) {

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-body')}>
                <div className={cx('content')}>
                    <h3 className={cx('heading')}>Deleted {text}</h3>
                    <p className={cx('title')}>Are you sure you want to delete {text}?</p>
                </div>
                <div className={cx('actions')}>
                    <Button deleted onClick={handleDelete}>Deleted</Button>
                    <Button normal onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalDel;
