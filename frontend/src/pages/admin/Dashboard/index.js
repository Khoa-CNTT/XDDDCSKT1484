import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import {
    InteractAdminIcon,
    PostAdminIcon,
    SalesAdminIcon,
    UserAdminIcon,
} from '~/components/Icons';
import { useEffect, useState } from 'react';
import {
    getTotalRevenueServices,
    getTotalCountServices,
    getTotalRevenueMonthlyServices,
} from '~/apiServices';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Dashboard() {
    const [counts, setCount] = useState({
        totalPost: 0,
        totalUser: 0,
        totalLike: 0,
        totalComment: 0,
    });
    const { t } = useTranslation();
    const [revenue, setRevenue] = useState({ totalAmount: 0, currency: 'VND' });
    const [revenueMonthly, setRevenueMonthly] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchTotal(token);
        fetchRevenue(token);
        fetchRevenueMonthly(selectedYear, token);
        // eslint-disable-next-line 
    }, [token, selectedYear]);

    const fetchTotal = async (token) => {
        const res = await getTotalCountServices(token);
        if (res?.data) {
            setCount({
                totalPost: res.data.totalPost,
                totalUser: res.data.totalUser,
                totalLike: res.data.totalLike,
                totalComment: res.data.totalComment,
            });
        }
    };

    const fetchRevenue = async (token) => {
        const res = await getTotalRevenueServices(token);
        if (res?.data) {
            setRevenue({
                totalAmount: res.data.totalAmount,
                currency: res.data.currency,
            });
        }
    };

    const fetchRevenueMonthly = async (year, token) => {
        try {
            const res = await getTotalRevenueMonthlyServices(year, token);
            const monthlyData = res?.data?.monthlyData || [];

            const result = [];
            for (let i = 1; i <= 12; i++) {
                const monthItem = monthlyData.find(item => item.month === i);
                result.push({
                    month: getMonthName(i),
                    value: monthItem ? monthItem.amount : 0
                });
            }

            setRevenueMonthly(result);
        } catch (error) {
            console.error(error);
        }
    };


    const getMonthName = (monthNumber) => {
        const monthNames = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'),
        t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];
        return monthNames[monthNumber - 1] || "";
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('dashboard')}>
                <h3 className={cx('dashboard-heading')}>{t('dashboard')}</h3>

                {/* Figures */}
                <div className={cx('dashboard-figures')}>
                    <div className={cx('figures-total', 'total-post')}>
                        <div className={cx('header-figures')}>
                            <h5>{t('totalPost')}</h5>
                            <PostAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>{counts.totalPost} {t('postBtn')}</p>

                    </div>
                    <div className={cx('figures-total', 'total-user')}>
                        <div className={cx('header-figures')}>
                            <h5>{t('totalUser')}</h5>
                            <UserAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>{counts.totalUser} {t('users')}</p>

                    </div>
                    <div className={cx('figures-total', 'total-interact')}>
                        <div className={cx('header-figures')}>
                            <h5>{t('totalInteract')}</h5>
                            <InteractAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>
                            {counts.totalLike + counts.totalComment} {t('interact')}
                        </p>
                    </div>
                    <div className={cx('figures-total', 'total-revenue')}>
                        <div className={cx('header-figures')}>
                            <h5>{t('totalRevenue')}</h5>
                            <SalesAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>
                            {revenue.totalAmount} {revenue.currency}
                        </p>
                    </div>
                </div>

                {/*  Year */}
                <div className={cx('select-year')}>
                    <label htmlFor="year-select">{t('selectYear')}: </label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) =>
                            setSelectedYear(Number(e.target.value))
                        }
                        className={cx('year-select')}
                    >
                        {[2024, 2025, 2026, 2027, 2028].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Monthly Chart */}
                <div className={cx('dashboard-activity')}>
                    <h4 className={cx('chart-heading')}>
                        {t('monthlyRevenueChart')}
                    </h4>
                    <div className={cx('chart-container')}>
                        {revenueMonthly.map((item, index) => (
                            <div key={index}>
                                <div
                                    className={cx('chart-bar')}
                                    style={{ height: `${item.value * 0.1}px` }}
                                ></div>
                                <p className={cx('chart-month')}>
                                    {item.month}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
