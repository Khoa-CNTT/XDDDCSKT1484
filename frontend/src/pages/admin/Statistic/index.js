import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import {
    GrowIcon,
    InteractAdminIcon,
    PostAdminIcon,
    SalesAdminIcon,
    ShrinkIcon,
    UserAdminIcon,
} from '~/components/Icons';
import {
    getAdsTotalCountServices,
    getAdsTotalTopSpendersServices,
} from '~/apiServices';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const data = [
    { month: 'Jan', revenue: 80, profit: 50 },
    { month: 'Feb', revenue: 120, profit: 70 },
    { month: 'Mar', revenue: 90, profit: 60 },
    { month: 'Apr', revenue: 150, profit: 90 },
    { month: 'May', revenue: 130, profit: 75 },
    { month: 'Jun', revenue: 170, profit: 100 },
    { month: 'Jul', revenue: 140, profit: 85 },
    { month: 'Aug', revenue: 160, profit: 95 },
    { month: 'Sep', revenue: 100, profit: 65 },
    { month: 'Oct', revenue: 180, profit: 110 },
    { month: 'Nov', revenue: 120, profit: 80 },
    { month: 'Dec', revenue: 190, profit: 120 },
];

const formatDateOnly = (date) => {
    return date.toISOString().split('T')[0]; 
};

function Statistic() {
    const [endDate, setEndDate] = useState(formatDateOnly(new Date())); 
    const [startDate, setStartDate] = useState(formatDateOnly(new Date())); 
    const [counts, setCount] = useState({
        totalAds: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        totalActiveAds: 0,
    });
    const [listSpenders, setListSpender] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (token) {
            fetchTopSpender(token);
        }
    }, [token]);

    const fetchTotal = async (token, start, end) => {
        try {
            const res = await getAdsTotalCountServices(token, {
                startDate: start,
                endDate: end,
            });
            if (res?.data) {
                setCount(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTopSpender = async (token) => {
        try {
            const res = await getAdsTotalTopSpendersServices(token);
            if (res?.data) {
                setListSpender(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('statistic')}>
                <h3 className={cx('statistic-heading')}>Statistic</h3>

                {/* Date Filter */}
                <div className={cx('filter-container')}>
                    <div className={cx('filter-item')}>
                        <label htmlFor="start-date">Start Date</label>
                        <input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} // Lưu giá trị trực tiếp là chuỗi
                            className={cx('datepicker-input')}
                        />
                    </div>
                    <div className={cx('filter-item')}>
                        <label htmlFor="end-date">End Date</label>
                        <input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} // Lưu giá trị trực tiếp là chuỗi
                            className={cx('datepicker-input')}
                        />
                    </div>
                    <button
                        className={cx('apply-btn')}
                        onClick={() => fetchTotal(token, startDate, endDate)} // Gửi chuỗi ngày
                    >
                        Apply
                    </button>
                </div>

                {/* Figures */}
                <div className={cx('statistic-figures')}>
                    <div className={cx('figures-total', 'total-post')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Ads</h5>
                            <PostAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>{counts.totalAds}</p>
                        <p className={cx('footer-figures')}>
                            <GrowIcon /> 8.3% Up from yesterday
                        </p>
                    </div>
                    <div className={cx('figures-total', 'total-user')}>
                        <div className={cx('header-figures')}>
                            <h5>Total View</h5>
                            <UserAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>
                            {counts.totalViews}
                        </p>
                        <p className={cx('footer-figures')}>
                            <GrowIcon /> 8.3% Up from yesterday
                        </p>
                    </div>
                    <div className={cx('figures-total', 'total-interact')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Interact</h5>
                            <InteractAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>
                            {counts.totalLikes + counts.totalComments}
                        </p>
                        <p className={cx('footer-figures')}>
                            <ShrinkIcon /> 8.3% Down from yesterday
                        </p>
                    </div>
                    <div className={cx('figures-total', 'total-revenue')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Active Ads</h5>
                            <SalesAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>
                            {counts.totalActiveAds}
                        </p>
                        <p className={cx('footer-figures')}>
                            <GrowIcon /> 8.3% Up from yesterday
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <h3 className={cx('statistic-heading-chart')}>
                    Monthly Performance
                </h3>
                <div className={cx('chart-container')}>
                    {data.map((item, index) => (
                        <div key={index} className={cx('bar-group')}>
                            <div
                                className={cx('bar', 'bar-revenue')}
                                style={{ height: `${item.revenue}px` }}
                            ></div>
                            <div
                                className={cx('bar', 'bar-profit')}
                                style={{ height: `${item.profit}px` }}
                            ></div>
                            <span className={cx('month-label')}>
                                {item.month}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={cx('legend')}>
                    <div className={cx('legend-item')}>
                        <div
                            className={cx('legend-box', 'legend-revenue')}
                        ></div>{' '}
                        Revenue
                    </div>
                    <div className={cx('legend-item')}>
                        <div
                            className={cx('legend-box', 'legend-profit')}
                        ></div>{' '}
                        Profit
                    </div>
                </div>

                {/* Top Spenders */}
                <div className={cx('top-users')}>
                    <h3 className={cx('top-users-title')}>
                        Top 5 Users by Ads Spending
                    </h3>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSpenders.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>${item.totalSpent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
