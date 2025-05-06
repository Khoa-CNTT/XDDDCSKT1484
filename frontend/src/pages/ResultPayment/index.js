import classNames from "classnames/bind";
import styles from './ResultPayment.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { CancelIcon, FailedIcon, HoldOnIcon, PendingIcon, TickIcon, UnknownIcon } from "~/components/Icons";
import Button from "~/components/Button";
import { returnOrderServices } from "~/apiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function ResultPayment() {
    const [infoPayment, setInfoPayment] = useState({
        icon: '',
        status: ''
    });
    const [themeColor, setThemeColor] = useState({
        background: '',
        color: ''
    });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());


    const fetchResultPayment = async (param) => {
        const token = localStorage.getItem('authToken');
        const res = await returnOrderServices(param, token);

        if (res?.data) {
            switch (res.data.result) {
                case 'completed':
                    setInfoPayment({
                        icon: TickIcon,
                        status: t('success'),
                    });
                    setThemeColor({
                        background: 'rgba(35, 162, 109, 0.12)',
                        color: '#23A26D'
                    });
                    break;
                case 'failed':
                    setInfoPayment({
                        icon: FailedIcon,
                        status: t('failed'),
                    });
                    setThemeColor({
                        background: 'rgba(255, 98, 61, 0.12)',
                        color: '#ff623d'
                    });
                    break;
                case 'cancelled':
                    setInfoPayment({
                        icon: CancelIcon,
                        status: t('cancelled'),
                    });
                    setThemeColor({
                        background: 'rgba(255, 98, 61, 0.12)',
                        color: '#E51818'
                    });
                    break;
                case 'pending':
                    setInfoPayment({
                        icon: PendingIcon,
                        status: t('pending'),
                    });
                    setThemeColor({
                        background: 'rgba(81, 128, 214, 0.12)',
                        color: '#1559d6'
                    });
                    break;
                case 'on_hold':
                    setInfoPayment({
                        icon: HoldOnIcon,
                        status: t('holdOn'),
                    });
                    setThemeColor({
                        background: 'rgba(47, 134, 235, 0.12)',
                        color: '#2f86eb'
                    });
                    break;
                default:
                    setInfoPayment({
                        icon: UnknownIcon,
                        status: t('unknown'),
                    });
                    setThemeColor({
                        background: 'rgba(255, 192, 33, 0.12)',
                        color: '#ffc021'
                    });
                    break;
            }
        }
    }

    useEffect(() => {
        fetchResultPayment(params);
        // eslint-disable-next-line
    }, [params])

    const formatMoney = (amount) => {
        return `${((amount / 24000).toFixed()) / 100} USD`
    }

    const formatDate = (date) => {

        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        const hour = date.slice(8, 10);
        const minute = date.slice(10, 12);
        const second = date.slice(12, 14);

        const datetime = `${day}-${month}-${year}, ${hour}:${minute}:${second}`;

        return datetime;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('receipt')}>
                <div className={cx('header')}>
                    <div className={cx('icon')} style={{ backgroundColor: themeColor.background }}>
                        {infoPayment.icon && <infoPayment.icon />}
                    </div>
                    <p className={cx('status-payment')} style={{ color: themeColor.color }}>{t('payment')} {infoPayment.status}</p>
                    <p className={cx('amount-payment')}>{formatMoney(params.vnp_Amount)}</p>
                </div>
                <div className={cx('body')}>
                    <div className={cx('detail')}>
                        {t('paymentDetails')}
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('code')}>
                            <p className={cx('code-title')}>{t('transactionCode')}</p>
                            <p className={cx('code-content')}>{params.vnp_TransactionNo}</p>
                        </div>
                        <div className={cx('time')}>
                            <p className={cx('time-title')}>{t('paymentTime')}</p>
                            <p className={cx('time-content')}>{formatDate(params.vnp_PayDate)}</p>
                        </div>
                        <div className={cx('method')}>
                            <p className={cx('method-title')}>{t('paymentMethod')}</p>
                            <p className={cx('method-content')}>{params.vnp_BankCode}</p>
                        </div>
                        <div className={cx('amount')}>
                            <p className={cx('amount-title')}>{t('amount')}</p>
                            <p className={cx('amount-content')}>{formatMoney(params.vnp_Amount)}</p>
                        </div>
                        <div className={cx('substance')}>
                            <p className={cx('substance-title')}>{t('paymentContent')}</p>
                            <p className={cx('substance-content')}>{params.vnp_OrderInfo}</p>
                        </div>
                        <div className={cx('fee')}>
                            <p className={cx('fee-title')}>{t('fee')}</p>
                            <p className={cx('fee-content')}>{t('free')}</p>
                        </div>
                        <div className={cx('status')}>
                            <p className={cx('status-title')}>{t('paymentStatus')}</p>
                            <p className={cx('status-content')} style={{ backgroundColor: themeColor.background, color: themeColor.color }}>{infoPayment.status}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button className={cx('back-btn')} primary round onClick={() => navigate('/')}>{t('backPost')}</Button>
        </div>
    );
}

export default ResultPayment;