import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import {
    getAdsTotalTopSpendersServices, getAdsTotalRecentPostsServices, getAdsTotalTopPostsServices, getAdsTotalTopInteractsServices
} from '~/apiServices';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const formatDateOnly = (date) => {
    return date.toISOString().split('T')[0];
};

function Statistic() {
    const [endDate, setEndDate] = useState(formatDateOnly(new Date()));
    const [startDate, setStartDate] = useState(formatDateOnly(new Date()));
    const [typeStatic, setTypeStatic] = useState('mostMoneyUser');
    const [listTop, setListTop] = useState([]);
    const token = localStorage.getItem('authToken');

    const { t } = useTranslation();


    const handleChangeType = (e) => {
        setTypeStatic(e.target.value);
        setListTop([]);
    };

    const handleApply = async () => {
        if (!token) return;
        switch (typeStatic) {
            case 'mostInteraction':
                const resTopPosts = await getAdsTotalTopInteractsServices(startDate, endDate, token);
                setListTop(resTopPosts?.data);
                break;
            case 'mostAdsSpend':
                const resTopSpenders = await getAdsTotalTopPostsServices(startDate, endDate, token);
                setListTop(resTopSpenders?.data);
                break;
            case 'mostMoneyUser':
                const resMoneyUsers = await getAdsTotalTopSpendersServices(startDate, endDate, token);
                setListTop(resMoneyUsers?.data);
                break;
            case 'mostPostAdsRecent':
                const resRecentPosts = await getAdsTotalRecentPostsServices(startDate, endDate, token);
                setListTop(resRecentPosts?.data);
                break;
            default:
                console.log('Unknown typeStatic');
        }

    };

    const renderTable = () => {
        switch (typeStatic) {
            case 'mostInteraction':
                return (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('typePost')}</th>
                                <th>{t('language')}</th>
                                <th>{t('published')}</th>
                                <th>{t('like')}</th>
                                <th>{t('comment')}</th>
                                <th>{t('totalInteract')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTop.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.type_post}</td>
                                    <td>{item.language}</td>
                                    <td>{format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{item.total_likes}</td>
                                    <td>{item.total_comments}</td>
                                    <td>{item.total_interactions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            case 'mostAdsSpend':
                return (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('typePost')}</th>
                                <th>{t('language')}</th>
                                <th>{t('published')}</th>
                                <th>{t('price')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTop.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.type_post}</td>
                                    <td>{item.language}</td>
                                    <td>{format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{item.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'mostMoneyUser':
                return (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('name')}</th>
                                <th>{t('email')}</th>
                                <th>{t('totalSpent')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTop.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.totalSpent}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'mostPostAdsRecent':
                return (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>{t('stt')}</th>
                                <th>{t('typePost')}</th>
                                <th>{t('language')}</th>
                                <th>{t('published')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTop.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.type_post}</td>
                                    <td>{item.language}</td>
                                    <td>{format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{item.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return <p>{t('noData')}</p>;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('statistic')}>
                <h3 className={cx('statistic-heading')}>{t('statistic')}</h3>

                {/* Date Filter */}
                <div className={cx('filter-container')}>
                    <div className={cx('filter-item')}>
                        <label htmlFor="start-date">{t('startDate')}</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={cx('datepicker-input')}
                        />
                    </div>
                    <div className={cx('filter-item')}>
                        <label htmlFor="end-date">{t('endDate')}</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={cx('datepicker-input')}
                        />
                    </div>
                    <div className={cx('filter-item')}>
                        <label htmlFor="type">{t('typeStatic')}</label>
                        <select
                            id="type"
                            className={cx('select-type')}
                            value={typeStatic}
                            onChange={handleChangeType}
                        >
                            <option value="mostMoneyUser">{t('userMostMoney')}</option>
                            <option value="mostInteraction">{t('highestInteraction')}</option>
                            <option value="mostAdsSpend">{t('mostAdsSpend')}</option>
                            <option value="mostPostAdsRecent">{t('recentAdsPosts')}</option>
                        </select>
                    </div>
                    <button
                        className={cx('apply-btn')}
                        onClick={handleApply}
                    >
                        {t('apply')}
                    </button>
                </div>
                {/* Top Spenders */}
                <div className={cx('top-users')}>
                    <h3 className={cx('top-users-title')}>
                        {t('top5Spending')}
                    </h3>
                    {renderTable()}
                </div>
            </div>
        </div>
    );
}

export default Statistic;
