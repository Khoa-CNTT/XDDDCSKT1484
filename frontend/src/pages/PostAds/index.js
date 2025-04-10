import classNames from "classnames/bind";
import styles from './PostAds.module.scss'

const cx = classNames.bind(styles);

function PostAds() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('total-item', 'post')}>
                    <div className={cx('total-heading')}>
                        Total Post Ads
                    </div>
                    <div className={cx('total-figures')}>
                        4
                    </div>
                </div>
                <div className={cx('total-item', 'price')}>
                    <div className={cx('total-heading')}>
                        Total Price Ads
                    </div>
                    <div className={cx('total-figures')}>
                        730$
                    </div>
                </div><div className={cx('total-item', 'views')}>
                    <div className={cx('total-heading')}>
                        Total Views
                    </div>
                    <div className={cx('total-figures')}>
                        73,123
                    </div>
                </div><div className={cx('total-item')}>
                    <div className={cx('total-heading')}>
                        Total Ads
                    </div>
                    <div className={cx('total-figures')}>
                        73,123
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('ads-item')}>
                    <div className={cx('')}>
                        <div className={cx('title')}>
                            How to use verb?
                        </div>
                        <div className={cx('content')}>
                            Tạo người dùng để sài
                        </div>
                        <div className={cx('publish')}>
                            13/02/2025
                        </div>
                    </div>
                    <div className={cx('interact')}>
                        <div className={cx('like')}>
                            1231
                        </div>
                        <div className={cx('cmt')}>
                            232
                        </div>
                    </div>
                    <div className={cx('view')}>
                        97462
                    </div>
                    <div className={cx('ads-package')}>
                        vip
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('')}>

                </div>
                <div className={cx('')}>

                </div>
            </div>
        </div>
    );
}

export default PostAds;