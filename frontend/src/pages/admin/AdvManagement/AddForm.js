import classNames from "classnames/bind";
import styles from './AdsManagement.module.scss';
import { useState } from "react";

const cx = classNames.bind(styles);

function AddForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', price: '', max_impressions: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.max_impressions) return;
    onAdd(form);
    setForm({ name: '', price: '', max_impressions: '' });
  };

  return (
    <div className={cx('add-form')}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Package Name" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
      <input name="max_impressions" type="number" value={form.max_impressions} onChange={handleChange} placeholder="Max Impressions" />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddForm;
