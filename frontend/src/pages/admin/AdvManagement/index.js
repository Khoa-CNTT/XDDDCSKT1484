import classNames from 'classnames/bind';
import styles from './AdsManagement.module.scss';
import { useEffect, useState } from 'react';
import { LeftIcon, RightIcon, EditIcon, TrashIcon } from '~/components/Icons';
import { deletedPackageAdsServices, getPackageAdsServices, postPackageAdsServices, putPackageAdsServices } from '~/apiServices';
import ModalDel from '~/components/ModalDel';
import ModalEdit from '~/components/ModalEdit';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function AdsManagement() {
    const [modalEdit, setModalEdit] = useState(null);
    const [modalDel, setModalDel] = useState(null);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [totalsPage, setTotalsPage] = useState(1);
    const [form, setForm] = useState({ name: '', description: '', price: '', max_impressions: '' });
    const [packageAds, setPackageAds] = useState([]);
    const token = localStorage.getItem('authToken');
    const { t } = useTranslation();
    const fetchAdsPackage = async () => {
        const res = await getPackageAdsServices(pageCurrent, 5, token);
        if (res?.data && res.data?.content.length > 0) {
            setPackageAds(res.data.content);
            setTotalsPage(res.data?.totalPages);
        }
    }

    useEffect(() => {
        fetchAdsPackage();
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description || !form.price || !form.max_impressions) return;
        const res = await postPackageAdsServices(form, token);

        if (res?.data)
            setForm({ name: '', description: '', price: '', max_impressions: '' });

    };

    const handleDelete = async () => {
        if (modalDel) {
            const res = await deletedPackageAdsServices(modalDel, token);
            if (res?.data) {
                fetchAdsPackage();
                setModalDel(null);
            }
        }
    };

    const onEdit = (ads) => {
        setModalEdit(ads);
    }

    const onDelete = (id) => {
        setModalDel(id);
    }

    const handleEdit = async (data) => {
        const res = await putPackageAdsServices(modalEdit.id, data, token);
        if (res?.data) {
            fetchAdsPackage();
            setModalEdit(null);
        }

    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent(prev => Math.max(prev + 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('ads')}>
                <div className={cx('ads-header')}>
                    <div className={cx('ads-heading')}>{t('managementAds')}</div>
                </div>

                <div className={cx('add-form')}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder={t('packageName')} />
                    <input name="description" value={form.description} onChange={handleChange} placeholder={t('packageDescription')} />
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder={t('price')} />
                    <input name="max_impressions" type="number" value={form.max_impressions} onChange={handleChange} placeholder={t('maxImpressions')} />
                    <button onClick={handleSubmit}>{t('btnAdd')}</button>
                </div>

                <div className={cx('ads-details')}>
                    <table className={cx('table-ads')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('packageName')}</th>
                                <th>{t('description')}</th>
                                <th>{t('price')}</th>
                                <th>{t('maxImpressions')}</th>
                                <th>{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packageAds.length > 0 ? (
                                packageAds.map((ads, index) => (
                                    <tr key={ads.id}>
                                        <td>{index + 1}</td>
                                        <td>{ads.name}</td>
                                        <td>{ads.description}</td>
                                        <td>{ads.price} $</td>
                                        <td>{ads.max_impressions}</td>
                                        <td>
                                            <EditIcon className={cx('icon-btn')} onClick={() => onEdit(ads)} />
                                            <TrashIcon className={cx('icon-btn')} onClick={() => onDelete(ads.id)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6">{t('noAdsFound')}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={cx('ads-footer')}>
                    <div className={cx('page-current')}>
                        {`${pageCurrent + 1} ${t('of')} ${totalsPage} ${t('page')}`}
                    </div>

                    <div className={cx('pagination')}>
                        <LeftIcon onClick={handleReducePage} className={cx('prev-btn', { 'disable': pageCurrent === 0 })} />
                        <RightIcon onClick={handleIncreasePage} className={cx('next-btn', { 'disable': (pageCurrent + 1) === totalsPage })} />
                    </div>
                </div>

                {modalEdit && (
                    <ModalEdit
                        text='package'
                        fields={[
                            {
                                name: 'name',
                                value: modalEdit.name,
                                type: 'text',
                            },
                            {
                                name: 'description',
                                value: modalEdit.description,
                                type: 'text',
                            },
                            {
                                name: 'price',
                                value: modalEdit.price,
                                type: 'number',
                            },
                            {
                                name: 'max_impressions',
                                value: modalEdit.max_impressions,
                                type: 'number',
                            },
                        ]}
                        handleCancel={() => setModalEdit(null)}
                        handleEdit={handleEdit}
                    />
                )}
                {modalDel && (
                    <ModalDel
                        text='package'
                        handleDelete={handleDelete}
                        handleCancel={() => setModalDel(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default AdsManagement;
