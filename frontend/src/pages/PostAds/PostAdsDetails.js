import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './PostAdsDetail.module.scss';
import classNames from 'classnames/bind';
import { LeftIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getTransactionByIdAdsServices } from '~/apiServices';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function PostAdsDetail() {
    const { t } = useTranslation();
    const [transaction, setTransaction] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const ads = location.state?.ads;

    const fetchTransaction = async (id) => {
        const res = await getTransactionByIdAdsServices(id, token);
        if (res?.data) {
            setTransaction(res.data)
        }
    }

    useEffect(() => {
        fetchTransaction(ads.id);
        // eslint-disable-next-line
    }, [location.state])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')}>
                <Button onClick={() => navigate('/postAds')} leftIcon={<LeftIcon />}>{t('backBtn')}</Button>
            </div>

            <h2 className={cx('title')}>{ads.type_post}</h2>

            <div className={cx('grid')}>
                <div>
                    <strong>{t('package')}:</strong> {ads.namePackage}
                </div>
                <div>
                    <strong>{t('price')}:</strong>{ads.price} $
                </div>
                <div>
                    <strong>{t('views')}:</strong> {ads.views}
                </div>
                <div>
                    <strong>{t('like')}:</strong> {ads.like || 0}
                </div>
                <div>
                    <strong>{t('comment')}:</strong> {ads.comment || 0}
                </div>
                <div>
                    <strong>{t('published')}:</strong> {format(new Date(ads.created_at), 'dd/MM/yyyy HH:mm')}
                </div>
                <div>
                    <strong>{t('status')}:</strong> {ads.status ? 'Active' : 'Inactive'}
                </div>
            </div>

            <div className={cx('invoice')}>
                <h3 className={cx('invoice-title')}>{t('invoiceDetails')}</h3>
                <div className={cx('invoice-list')}>
                    <div className={cx('invoice-item')}>
                        <strong>{t('namePayment')}:</strong>
                        <p>{transaction.name}</p>
                    </div>
                    <div className={cx('invoice-item')}>
                        <strong>{t('invoiceID')}:</strong>
                        <p>
                            {transaction.transaction_id}
                        </p>
                    </div>
                    <div className={cx('invoice-item')}>
                        <strong>{t('total')}:</strong>
                        <p>
                            {transaction.amount} {transaction.currency}
                        </p>
                    </div>
                    <div className={cx('invoice-item')}>
                        <strong>{t('message')}:</strong>
                        <p>
                            {transaction.message}
                        </p>
                    </div>
                    <div className={cx('invoice-item')}>
                        <strong>{t('date')}:</strong>
                        <p>
                            {format(new Date(ads.created_at), 'dd/MM/yyyy HH:mm')}
                        </p>
                    </div>
                    <div className={cx('invoice-item')}>
                        <strong>{t('status')}:</strong>
                        <p>
                            {transaction.status ? (
                                transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
                            ) : (
                                t('unknown')
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostAdsDetail;
