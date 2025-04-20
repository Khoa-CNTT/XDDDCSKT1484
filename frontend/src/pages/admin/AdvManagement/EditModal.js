import classNames from "classnames/bind";
import styles from './AdsManagement.module.scss';
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function EditModal({ ad, onSave, onCancel }) {
  const [form, setForm] = useState(ad);

  useEffect(() => {
    setForm(ad);
  }, [ad]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={cx('modal')}>
      <div className={cx('modal-content')}>
        <h3>Edit Package</h3>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="price" type="number" value={form.price} onChange={handleChange} />
        <input name="max_impressions" type="number" value={form.max_impressions} onChange={handleChange} />
        <div className={cx('modal-actions')}>
          <button onClick={() => onSave(form)}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
