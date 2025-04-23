import classNames from 'classnames/bind';
import styles from './PostAds.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LeftIcon, RightIcon, TotalAdsIcon, PostAdminIcon, TotalViewsIcon, SalesAdminIcon, GrowIcon, ShrinkIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const adsList = [
    {
        id: 1,
        title: 'How to use verb?',
        content: 'Tạo người dùng để sài',
        publish: '13/02/2025',
        like: 1231,
        cmt: 232,
        views: 97462,
        package: 'Basic Package',
        price: 200,
    },
    {
        id: 2,
        title: 'Learn English Fast',
        content: 'Khóa học siêu tốc',
        publish: '11/02/2025',
        like: 520,
        cmt: 89,
        views: 47462,
        package: 'Pro Package',
        price: 100,
    },
];
function PostAds() {
    const navigate = useNavigate();
    const [totalsPage, setTotalsPage] = useState(1);
    const [pageCurrent, setPageCurrent] = useState(0);

    const handleDetailAds = (id) => {
        navigate(`/postAds/${id}`)
    }

    const handleReducePage = () => {
        setPageCurrent((prev) => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        console.log('tang');

        setPageCurrent((prev) => Math.max(prev + 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Advertisement</h2>
            <div className={cx('header')}>
                <div className={cx('figures-total', 'total-post')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Post Ads</h5>
                        <PostAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>4</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 5.2% Up from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-price')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Price Ads</h5>
                        <SalesAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>$730</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 3.7% Up from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-views')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Views</h5>
                        <TotalViewsIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>73,123</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 1.2% Up from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-ads')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Ads</h5>
                        <TotalAdsIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>73,123</p>
                    <p className={cx('footer-figures')}>
                        <ShrinkIcon /> 0.6% Down from yesterday
                    </p>
                </div>
            </div>
            <div className={cx('body')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Title</th>
                            <th>Package Name</th>
                            <th>Price</th>
                            <th>Views</th>
                            <th>Like</th>
                            <th>Comments</th>
                            <th>Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adsList.map((ad, index) => {
                            return (
                                <tr key={ad.id} onClick={() => handleDetailAds(ad.id)}>
                                    <td>{index + 1}</td>
                                    <td>{ad.title}</td>
                                    <td>{ad.package}</td>
                                    <td>${ad.price}</td>
                                    <td>{ad.views.toLocaleString()}</td>
                                    <td>{ad.like}</td>
                                    <td>{ad.cmt}</td>
                                    <td>{ad.publish}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={cx('postAds-footer')}>
                <div className={cx('page-current')}>
                    {`${pageCurrent + 1} of ${totalsPage} Page`}
                </div>

                <div className={cx('pagination')}>
                    <LeftIcon
                        onClick={handleReducePage}
                        className={cx('prev-btn', {
                            disable: pageCurrent === 0,
                        })}
                    />
                    <RightIcon
                        onClick={handleIncreasePage}
                        className={cx('next-btn', {
                            disable: pageCurrent + 1 === totalsPage,
                        })}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostAds;
