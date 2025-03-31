import classNames from "classnames/bind";
import styles from './AboutFL.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function AboutFL() {
    const { t } = useTranslation();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('wrapper-intro')}>
                    <div className={cx('intro-heading')}>
                        <h2>{t('aboutForum')}</h2>
                    </div>
                    <div className={cx('intro-body')}>
                        <div className={cx('intro-header')}>
                            <div className={cx('intro-logo')}>
                                <Image src={images.logo} alt='Forum' className={cx('intro-img')} />
                            </div>
                            <div className={cx('intro-context')}>
                                <h3>{t('introTitle')}</h3>
                                <p>{t('introText1')}</p>
                                <p>{t('introText2')}</p>
                                <p>{t('introText3')}</p>
                                <p>{t('introText4')}</p>
                            </div>
                        </div>
                        <p>{t('introSolution1')}</p>
                        <p>{t('introSolution2')}</p>
                    </div>
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('vision')}>
                    <div className={cx('wrapper-vision')}>
                        <h3>{t('vision')}</h3>
                        <p>{t('visionText')}</p>
                    </div>
                </div>
                <div className={cx('core-values')}>
                    <div className={cx('wrapper-values')}>
                        <h3>{t('coreValues')}</h3>
                        <p><strong>{t('valueText1Strong')}</strong>{t('valueText1')}</p>
                        <p><strong>{t('valueText2Strong')}</strong>{t('valueText2')}</p>
                        <p><strong>{t('valueText3Strong')}</strong>{t('valueText3')}</p>
                        <p><strong>{t('valueText4Strong')}</strong>{t('valueText4')}</p>
                    </div>
                </div>
                <div className={cx('benefits')}>
                    <div className={cx('wrapper-benefits')}>
                        <h3>{t('benefits')}</h3>
                        <div className={cx('benefits-content')}>
                            <div className={cx('benefits-item')}>
                                <p><strong>{t('benefitsText1Strong')}</strong>{t('benefitsText1')}</p>
                                <p><strong>{t('benefitsText2Strong')}</strong>{t('benefitsText2')}</p>
                            </div>
                            <div className={cx('benefits-item')}>
                                <p><strong>{t('benefitsText3Strong')}</strong>{t('benefitsText3')}</p>
                                <p><strong>{t('benefitsText4Strong')}</strong>{t('benefitsText4')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('strategy')}>
                    <div className={cx('wrapper-strategy')}>
                        <h3>{t('strategy')}</h3>
                        <p><strong>{t('strategyText1Strong')}</strong></p>
                        <p>{t('strategyText1')}</p>
                        <p><strong>{t('strategyText2Strong')}</strong></p>
                        <p>{t('strategyText2')}</p>
                        <p><strong>{t('strategyText3Strong')}</strong></p>
                        <p>{t('strategyText3')}</p>
                        <p><strong>{t('strategyText4Strong')}</strong></p>
                        <p>{t('strategyText4')}</p>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('wrapper-footer')}>
                    <div className={cx('slogan')}>
                        <p>{t('slogan')}</p>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default AboutFL;