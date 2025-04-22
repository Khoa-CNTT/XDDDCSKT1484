import { useParams, useNavigate } from 'react-router-dom';
import styles from './PostAdsDetail.module.scss';
import classNames from 'classnames/bind';
import { LeftIcon } from '~/components/Icons';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

const data = {
    1: {
        title: 'How to use verb?',
        content: 'Tạo người dùng để sài',
        publish: '13/02/2025',
        package: 'Basic Package',
        price: 200,
        views: 97462,
        likes: 1231,
        comments: 232,
        invoiceId: 'INV-20250413',
        status: 'Paid',
    },
    2: {
        title: 'Learn English Fast',
        content:
            'Khóa học siêu tốc hóa học siêu tốc hóa học siêu tốc hóa học siêu tốc hóa học siêu tốc',
        publish: '11/02/2025',
        package: 'Pro Package',
        price: 100,
        views: 47462,
        likes: 520,
        comments: 89,
        invoiceId: 'INV-20250411',
        status: 'Pending',
    },
};

function PostAdsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const ad = data[id];

    if (!ad) return <div>Ad not found!</div>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')}>
                <Button leftIcon={<LeftIcon />}>Back</Button>
            </div>

            <h2 className={cx('title')}>{ad.title}</h2>
            <p className={cx('desc')}>{ad.content}</p>

            <div className={cx('grid')}>
                <div>
                    <strong>Package:</strong> {ad.package}
                </div>
                <div>
                    <strong>Price:</strong> ${ad.price}
                </div>
                <div>
                    <strong>Views:</strong> {ad.views.toLocaleString()}
                </div>
                <div>
                    <strong>Likes:</strong> {ad.likes}
                </div>
                <div>
                    <strong>Comments:</strong> {ad.comments}
                </div>
                <div>
                    <strong>Published:</strong> {ad.publish}
                </div>
                <div>
                    <strong>Status:</strong> {ad.status}
                </div>
            </div>

            <div className={cx('invoice')}>
                <h3 className={cx('invoice-title')}>Invoice Details</h3>
                <div className={cx('invoice-item')}>
                    <p>
                        <strong>Invoice ID:</strong> <span>{ad.invoiceId}</span>
                    </p>
                </div>
                <div className={cx('invoice-item')}>
                    <p>
                        <strong>Total:</strong> <span>${ad.price}</span>
                    </p>
                </div>
                <div className={cx('invoice-item')}>
                    <p>
                        <strong>Status:</strong> <span>{ad.status}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PostAdsDetail;
