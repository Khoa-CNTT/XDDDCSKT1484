import classNames from "classnames/bind";
import styles from './Report.module.scss'
import { EditIcon, FilterIcon, LeftIcon, RightIcon, TrashIcon } from "~/components/Icons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getReportServices } from "~/apiServices";

const cx = classNames.bind(styles)

function Report() {
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listReport, setListReport] = useState([]);
    const [typeReport, setTypeReport] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchAllReport(pageCurrent, 10, token);
    }, [pageCurrent])

    const fetchAllReport = async (page, size, token) => {
        const res = await getReportServices(page, size, token);
        if (res?.data) {
            setListReport(res.data.content);
            setTotalsPage(res.data?.totalPages);
        }
    }

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        console.log('tang');

        setPageCurrent(prev => Math.max(prev + 1, totalsPage - 1));
    };

    const handleChange = e => {
        setTypeReport(e.target.value)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('report')}>
                <h3 className={cx('report-heading')}>
                    Report
                </h3>
                <div className={cx('report-filter')}>
                    <FilterIcon className={cx('filter-icon')} />
                    <h3 className={cx('filter-heading')}>
                        Filter By
                    </h3>
                    <select
                        value={typeReport}
                        className={cx('filter-type')}
                        onChange={handleChange}
                    >
                        <option value='' disabled>Type</option>
                        <option value='Post'>Post</option>
                        <option value='Comment'>Comment</option>
                        <option value='Account'>Account</option>
                    </select>
                </div>
                <div className={cx('report-details')}>
                    <table className={cx('table-report')}>
                        <thead>
                            <th>STT</th>
                            <th>Type Post</th>
                            <th>Reason</th>
                            <th>Date Post</th>
                            <th>Status</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {listReport.length > 0 ?
                                (
                                    listReport.map((report, index) => (
                                        !report.status && (
                                            <tr key={report.id}>
                                                <th>{index + 1}</th>
                                                <td>{report.typePost}</td>
                                                <td>{report.reason}</td>
                                                <td>{format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                                                <td>{report.status}</td>
                                                <td>
                                                    <EditIcon />
                                                    <TrashIcon />
                                                </td>
                                            </tr>
                                        )
                                    ))
                                )
                                :
                                (
                                    <tr><td colspan="6">Không có report nào</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={cx('report-footer')}>
                    <div className={cx('page-current')}>
                        {`${pageCurrent + 1} of ${totalsPage} Page`}
                    </div>

                    <div className={cx('pagination')}>
                        <LeftIcon onClick={handleReducePage} className={cx('prev-btn', { 'disable': pageCurrent === 0 })} />
                        <RightIcon onClick={handleIncreasePage} className={cx('next-btn', { 'disable': (pageCurrent + 1) === totalsPage })} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;