import classNames from "classnames/bind";
import styles from './Report.module.scss'
import { EditIcon, FilterIcon, LeftIcon, RightIcon, TrashIcon } from "~/components/Icons";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { deletedReportServices, getReportServices, patchReportServices } from "~/apiServices";
import ModalDel from "~/components/ModalDel";
import ModalEdit from "~/components/ModalEdit";

const cx = classNames.bind(styles)

function Report() {
    const [totalsPage, setTotalsPage] = useState(1)
    const [pageCurrent, setPageCurrent] = useState(0);
    const [listReport, setListReport] = useState([]);
    const [typeReport, setTypeReport] = useState('');
    const [modalEdit, setModalEdit] = useState(null);
    const [modalDel, setModalDel] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchAllReport(pageCurrent, token);
    }, [pageCurrent, token])

    const fetchAllReport = async (page, token) => {
        const res = await getReportServices(page, 10, token);
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

    const handleDelete = async () => {
        const res = await deletedReportServices(modalDel, token);
        if (res?.data) {
            fetchAllReport(pageCurrent, token);
            setModalDel(null);
        }
    }

    const handleEdit = async () => {
        const res = await patchReportServices(modalEdit.postId, token);
        if (res?.data.result) {
            fetchAllReport(pageCurrent, token);
            setModalEdit(null);
        }
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
                            <tr>
                                <th>STT</th>
                                <th>Type Post</th>
                                <th>Reason</th>
                                <th>Date Post</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listReport.length > 0 ?
                                (
                                    listReport.map((report, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{report.typePost}</td>
                                            <td>{report.reason}</td>
                                            <td>{format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                                            <td>{report.status.toString()}</td>
                                            <td style={{ minWidth: 80 }}>
                                                <EditIcon onClick={() => setModalEdit(report)} />
                                                <TrashIcon onClick={() => setModalDel(report.id)} />
                                            </td>
                                        </tr>
                                    )
                                    )
                                )
                                :
                                (
                                    <tr><td colSpan="6">Không có report nào</td></tr>
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
            {modalEdit &&
                <ModalEdit
                    text='Report'
                    name='status'
                    type="select"
                    options={[
                        'true',
                        'false',
                    ]}
                    defaultValue={modalEdit.status}
                    handleEdit={handleEdit}
                    handleCancel={() => setModalEdit(null)}
                />
            }
            {modalDel &&
                <ModalDel
                    text='report'
                    handleDelete={handleDelete}
                    handleCancel={() => setModalDel(null)}
                />
            }
        </div>
    );
}

export default Report;