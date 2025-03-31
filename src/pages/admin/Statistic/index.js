import classNames from "classnames/bind";
import styles from "./Statistic.module.scss";

const cx = classNames.bind(styles);

const data = [
    { month: "Jan", revenue: 80, profit: 50 },
    { month: "Feb", revenue: 120, profit: 70 },
    { month: "Mar", revenue: 90, profit: 60 },
    { month: "Apr", revenue: 150, profit: 90 },
    { month: "May", revenue: 130, profit: 75 },
    { month: "Jun", revenue: 170, profit: 100 },
    { month: "Jul", revenue: 140, profit: 85 },
    { month: "Aug", revenue: 160, profit: 95 },
    { month: "Sep", revenue: 100, profit: 65 },
    { month: "Oct", revenue: 180, profit: 110 },
    { month: "Nov", revenue: 120, profit: 80 },
    { month: "Dec", revenue: 190, profit: 120 },
];

function Statistic() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("statistic")}>
                <h3 className={cx("statistic-heading")}>Monthly Performance</h3>
                <div className={cx("chart-container")}>
                    {data.map((item, index) => (
                        <div key={index} className={cx("bar-group")}>
                            <div
                                className={cx("bar", "bar-revenue")}
                                style={{ height: `${item.revenue}px` }}
                            ></div>
                            <div
                                className={cx("bar", "bar-profit")}
                                style={{ height: `${item.profit}px` }}
                            ></div>
                            <span className={cx("month-label")}>{item.month}</span>
                        </div>
                    ))}
                </div>
                <div className={cx("legend")}>
                    <div className={cx("legend-item")}>
                        <div className={cx("legend-box", "legend-revenue")}></div> Revenue
                    </div>
                    <div className={cx("legend-item")}>
                        <div className={cx("legend-box", "legend-profit")}></div> Profit
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
