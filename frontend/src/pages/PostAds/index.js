import classNames from 'classnames/bind';
import styles from './PostAds.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LeftIcon, RightIcon, PostAdminIcon, TotalViewsIcon, SalesAdminIcon, InteractAdminIcon } from '~/components/Icons';
import { getAdsTotalCountUserService, getPackageAdsByIdServices, getPostAdsUserServices } from '~/apiServices';
import getPostByIdPost from '~/apiServices/getPostByIdPostServices';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);



function PostAds() {
    const navigate = useNavigate();
    const [adsTableData, setAdsTableData] = useState([]);
    const [totalsPage, setTotalsPage] = useState(1);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [counts, setCounts] = useState({});
    const token = localStorage.getItem('authToken');
    const { t } = useTranslation();
    const handleDetailAds = (item) => {
        navigate(`/postAds/${item.id}`, { state: { ads: item } });
    }

    const handleReducePage = () => {
        setPageCurrent((prev) => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent((prev) => Math.min(prev + 1, totalsPage - 1));
    };

    useEffect(() => {
        if (!token) return;
        const prepareTableData = async () => {
            const res = await getPostAdsUserServices(pageCurrent, 5, token);
            if (res?.data) {

                setTotalsPage(res.data.totalPages);
                const adsList = res.data.content;

                const enrichedData = await Promise.all(
                    adsList.map(async (ads) => {
                        const post = await fetchPostByIdAds(ads.post_id);
                        const packageAds = await fetchPackageAdsById(ads.adsPackage_id);
                        return { ...ads, type_post: post.type_post, language: post.language, like: post.like, comment: post.comment, namePackage: packageAds.name, price: packageAds.price };
                    })
                );

                setAdsTableData(enrichedData);
            }
        };

        prepareTableData();
        fetchTotal()
        // eslint-disable-next-line
    }, [pageCurrent]);

    const fetchTotal = async () => {
        const res = await getAdsTotalCountUserService(token);
        if (res?.data) {
            setCounts(res.data);
        }
    }

    const fetchPostByIdAds = async (id) => {
        const res = await getPostByIdPost(id, token);
        if (res?.data) {
            return res.data;
        }
        return;
    }

    const fetchPackageAdsById = async (id) => {
        const res = await getPackageAdsByIdServices(id, token);
        if (res?.data) {
            return res.data;
        }
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{t('advertisement')}</h2>
            <div className={cx('header')}>
                <div className={cx('figures-total', 'total-post')}>
                    <div className={cx('header-figures')}>
                        <h5>Total Post Ads</h5>
                        <PostAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalAds} {t('postBtn')}</p>
                </div>

                <div className={cx('figures-total', 'total-views')}>
                    <div className={cx('header-figures')}>
                        <h5>{t('totalViews')}</h5>
                        <TotalViewsIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalViews} {t('views')}</p>
                </div>

                <div className={cx('figures-total', 'total-ads')}>
                    <div className={cx('header-figures')}>
                        <h5>{t('totalInteract')}</h5>
                        <InteractAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}> {(counts.totalLikes ?? 0) + (counts.totalComments ?? 0)} {t('interact')}</p>
                </div>

                <div className={cx('figures-total', 'total-price')}>
                    <div className={cx('header-figures')}>
                        <h5>{t('totalActives')}</h5>
                        <SalesAdminIcon width="32px" height="32px" />
                    </div>
                    <p className={cx('body-figures')}>{counts.totalActiveAds} {t('active')}</p>
                </div>
            </div>
            <div className={cx('body')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>{t('stt')}</th>
                            <th>{t('typePost')}</th>
                            <th>{t('language')}</th>
                            <th>{t('views')}</th>
                            <th>{t('like')}</th>
                            <th>{t('comment')}</th>
                            <th>{t('packageAds')}</th>
                            <th>{t('price')}</th>
                            <th>{t('active')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adsTableData.map((item, index) => (
                            <tr key={item.id} onClick={() => handleDetailAds(item)}>
                                <td>{index + 1}</td>
                                <td>{item.type_post}</td>
                                <td>{item.language}</td>
                                <td>{item.views}</td>
                                <td>{item.like}</td>
                                <td>{item.comment}</td>
                                <td>{item.namePackage}</td>
                                <td>${item.price}</td>
                                <td>{item.status ? t('active') : t('inActive')}</td>
                            </tr>
                        ))}
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
