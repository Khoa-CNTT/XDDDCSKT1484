import classNames from "classnames/bind";
import styles from './Dashboard.module.scss'
import { GrowIcon, InteractAdminIcon, PostAdminIcon, SalesAdminIcon, ShrinkIcon, UserAdminIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 70 },
    { month: "May", value: 40 },
    { month: "Jun", value: 90 },
    { month: "Jul", value: 55 },
    { month: "Aug", value: 60 },
    { month: "Sep", value: 35 },
    { month: "Oct", value: 80 },
    { month: "Nov", value: 45 },
    { month: "Dec", value: 100 },
];

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dashboard')}>
                <h3 className={cx('dashboard-heading')}>Dashboard</h3>
                <div className={cx('dashboard-figures')}>
                    <div className={cx('figures-total', 'total-post')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Post</h5>
                            <PostAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>5600</p>
                        <p className={cx('footer-figures')}><GrowIcon /> 8.3% Up from yesterday</p>
                    </div>
                    <div className={cx('figures-total', 'total-user')}>
                        <div className={cx('header-figures')}>
                            <h5>Total User</h5>
                            <UserAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>5600</p>
                        <p className={cx('footer-figures')}><GrowIcon /> 8.3% Up from yesterday</p>
                    </div>
                    <div className={cx('figures-total', 'total-interact')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Interact</h5>
                            <InteractAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>5600</p>
                        <p className={cx('footer-figures')}><ShrinkIcon /> 8.3% Down from yesterday</p>
                    </div>
                    <div className={cx('figures-total', 'total-revenue')}>
                        <div className={cx('header-figures')}>
                            <h5>Total Revenue</h5>
                            <SalesAdminIcon width="36px" height="36px" />
                        </div>
                        <p className={cx('body-figures')}>5600</p>
                        <p className={cx('footer-figures')}><GrowIcon /> 8.3% Up from yesterday</p>
                    </div>
                </div>
                <div className={cx('dashboard-activity')}>
                    <h4 className={cx('chart-heading')}>Monthly Data Chart</h4>
                    <div className={cx('chart-container')}>
                        {data.map((item, index) => (
                            <div key={index}>
                                <div
                                    className={cx('chart-bar')}
                                    style={{ height: `${item.value * 2}px`, }}
                                ></div>
                                <p className={cx('chart-month')}>{item.month}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;