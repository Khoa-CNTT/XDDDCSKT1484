import classNames from 'classnames/bind';
import styles from './PostAds.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LeftIcon, RightIcon, PostAdminIcon, TotalViewsIcon, SalesAdminIcon, GrowIcon, ShrinkIcon, InteractAdminIcon } from '~/components/Icons';
import { getAdsTotalCountUserService, getPostAdsUserServices } from '~/apiServices';

const cx = classNames.bind(styles);



function PostAds() {
    const navigate = useNavigate();
    const [totalsPage, setTotalsPage] = useState(1);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [postAds, setPostAds] = useState([]);
    const [counts, setCounts] = useState(0);

    const handleDetailAds = (id) => {
        navigate(`/postAds/${id}`)
    }

    const handleReducePage = () => {
        setPageCurrent((prev) => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent((prev) => Math.max(prev + 1, totalsPage - 1));
    };

    useEffect(() => {
        fetchPostAds(pageCurrent);
        fetchTotal();
    }, [pageCurrent])

    const fetchTotal = async () =>{
        const token = localStorage.getItem('authToken');
        const res = await getAdsTotalCountUserService(token);
        if(res?.data){
            setCounts(res.data);
        }
    }
    const fetchPostAds = async (page) => {
        const token = localStorage.getItem('authToken')
        const res = await getPostAdsUserServices(page, 10, token);
        if (res?.data) {
            setPostAds(res.data.content);
        }
    }


    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Advertisement</h2>
            <div className={cx('header')}>
                <div className={cx('figures-total', 'total-post')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Post Ads</h5>
                        <PostAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalAds}</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 5.2% Up from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-views')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Views</h5>
                        <TotalViewsIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalViews}</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 1.2% Up from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-ads')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Interact</h5>
                        <InteractAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalLikes + counts.totalComments}</p>
                    <p className={cx('footer-figures')}>
                        <ShrinkIcon /> 0.6% Down from yesterday
                    </p>
                </div>

                <div className={cx('figures-total', 'total-price')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Actives </h5>
                        <SalesAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalActiveAds}</p>
                    <p className={cx('footer-figures')}>
                        <GrowIcon /> 3.7% Up from yesterday
                    </p>
                </div>
            </div>
            <div className={cx('body')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Type Post</th>
                            <th>Language</th>
                            <th>Views</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Actives</th>
                            <th>Package Ads</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postAds.map((ads, index) => {
                            return (
                                <tr key={ads.id} onClick={() => handleDetailAds(ads.id)}>
                                    {/* <td>{index + 1}</td>
                                    <td>{ads.title}</td> */}
                                    {/* <td>{ads.package}</td>
                                    <td>${ads.price}</td>
                                    <td>{ads.views}</td>
                                    <td>{ads.like}</td>
                                    <td>{ads.cmt}</td>
                                    <td>{ads.publish}</td> */}
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
