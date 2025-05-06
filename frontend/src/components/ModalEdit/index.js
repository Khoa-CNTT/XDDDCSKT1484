import classNames from "classnames/bind";
import styles from './Modal.module.scss';
import { useState, useEffect, Fragment } from "react";
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function ModalEdit({ text, type = 'input', options = [], defaultValue = '', name = '', fields = [], handleEdit, handleCancel }) {
    const [form, setForm] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        const initialForm = fields.reduce((acc, field) => {
            acc[field.name] = field.value || '';
            return acc;
        }, {});
        setForm(initialForm);
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onEdit = () => {
        const hasEmpty = Object.values(form).some(value => value.toString().trim() === '');
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
                    <h3 className={cx('heading')}>{t('edit')} {text}</h3>

                    {type === 'input' ? (
                        fields.map((field, index) => (
                            <Fragment key={index}>
                                <label htmlFor={field.name} className={cx('label')}>
                                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                </label>
                                <input
                                    id={field.name}
                                    className={cx('input')}
                                    name={field.name}
                                    type={field.type}
                                    value={form[field.name] || ''}
                                    onChange={handleChange}
                                />
                            </Fragment>
                        ))
                    ) : (
                        <label className={cx('label')} htmlFor={name}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                            <select
                                id={name}
                                name={name}
                                className={cx('select')}
                                value={form[name] || defaultValue}
                                onChange={handleChange}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>

                <div className={cx('actions')}>
                    <Button primary onClick={onEdit}>{t('saveBtn')}</Button>
                    <Button deleted onClick={handleCancel}>{t('cancel')}</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
