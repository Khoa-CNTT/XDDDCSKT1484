import classNames from "classnames/bind";
import styles from './ResultPayment.module.scss'
import { useLocation } from "react-router-dom";
import { FailedIcon, TickIcon } from "~/components/Icons";
import Button from "~/components/Button";
import { returnOrderServices } from "~/apiServices";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function ResultPayment() {
    const [status, setStatus] = useState('');
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());
    console.log(params);

    const fetchResultPayment = async (param) => {
        const token = localStorage.getItem('authToken');
        const res = await returnOrderServices(param, token);

        if (res?.data) {
            switch (res.data.result) {
                case 'completed':
                    setStatus('Success');
                    break;
                case 'failed':
                    setStatus('Success');
                    break;
                case 'cancelled':
                    setStatus('Success');
                    break;
                case 'pending':
                    setStatus('Success');
                    break;
                case 'on_hold':
                    setStatus('Success');
                    break;
                default:
                    setStatus('unknown');
                    break;

            }

        }
    }

    useEffect(() => {
        fetchResultPayment(params);
    }, [params])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('receipt')}>
                <div className={cx('header')}>
                    <div className={cx('icon')}>
                        {status === 'Success' ?
                            <TickIcon />
                            :
                            <FailedIcon />
                        }
                    </div>
                    <p className={cx('status-payment')}>Payment Success!</p>
                    <p className={cx('amount-payment')}>100 USD</p>
                </div>
                <div className={cx('body')}>
                    <div className={cx('detail')}>
                        Payment Details
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('code')}>
                            <p className={cx('code-title')}>Transaction code</p>
                            <p className={cx('code-content')}>000085752257</p>
                        </div>
                        <div className={cx('time')}>
                            <p className={cx('time-title')}>Payment Time</p>
                            <p className={cx('time-content')}>25-02-2023, 13:22:16</p>
                        </div>
                        <div className={cx('method')}>
                            <p className={cx('method-title')}>Payment Method</p>
                            <p className={cx('method-content')}>VNPAY</p>
                        </div>
                        <div className={cx('amount')}>
                            <p className={cx('amount-title')}>Amount</p>
                            <p className={cx('amount-content')}>100 USD</p>
                        </div>
                        <div className={cx('fee')}>
                            <p className={cx('fee-title')}>Fee</p>
                            <p className={cx('fee-content')}>Free</p>
                        </div>
                        <div className={cx('status')}>
                            <p className={cx('status-title')}>Payment Status</p>
                            <p className={cx('status-content')}>Success</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button className={cx('back-btn')} primary round>Back to Post</Button>
        </div>
    );
}

export default ResultPayment;