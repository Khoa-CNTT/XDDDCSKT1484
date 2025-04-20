import classNames from "classnames/bind";
import styles from './AdsManagement.module.scss';
import { EditIcon, TrashIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function AdsTable({ adsList, onEdit, onDelete }) {
  return (
    <div className={cx('ads-details')}>
      <table className={cx('table-ads')}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Package Name</th>
            <th>Price</th>
            <th>Max Impressions</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adsList.length > 0 ? (
            adsList.map((ad, index) => (
              <tr key={ad.id}>
                <td>{index + 1}</td>
                <td>{ad.name}</td>
                <td>{ad.price}</td>
                <td>{ad.max_impressions}</td>
                <td>{ad.status}</td>
                <td>
                  <EditIcon className={cx('icon-btn')} onClick={() => onEdit(ad)} />
                  <TrashIcon className={cx('icon-btn')} onClick={() => onDelete(ad.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No ads found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdsTable;
