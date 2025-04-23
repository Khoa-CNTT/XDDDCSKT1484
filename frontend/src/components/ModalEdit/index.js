import classNames from "classnames/bind";
import styles from './Modal.module.scss';
import { useState, useEffect, Fragment } from "react";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ModalEdit({ text, fields, handleEdit, handleCancel }) {
    const [form, setForm] = useState({});

    useEffect(() => {
        const result = fields.reduce((acc, field) => {
            acc[field.name] = field.value || '';
            return acc;
        }, {});
        setForm(result);
    }, [fields]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onEdit = () => {
        const hasEmpty = Object.values(form).some(value => value.trim() === '');
        if (hasEmpty) {
            alert("Vui lòng nhập đầy đủ và hợp lệ thông tin.");
            return;
        }

        handleEdit(form);
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-body')}>
                <div className={cx('content')}>
                    <h3 className={cx('heading')}> Edit {text}</h3>
                    {fields.map((field, index) => (
                        <Fragment key={index}>
                            <label className={cx('label')}>{field.name.charAt(0).toUpperCase()}{field.name.slice(1)}</label>
                            <input
                                name={field.name}
                                type={field.type}
                                value={form[field.name] || ''}
                                onChange={handleChange}
                            />
                        </Fragment>
                    ))}
                </div>
                <div className={cx('actions')}>
                    <Button primary onClick={onEdit}>Save</Button>
                    <Button deleted onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
