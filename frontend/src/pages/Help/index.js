import classNames from "classnames/bind";
import styles from './Help.module.scss';
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import Image from "~/components/Image";
import images from "~/assets/images";
import { useTranslation } from "react-i18next";
import { HelpIcon, RightIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Help() {
    const [isSelected, setIsSelected] = useState(0);
    const { t } = useTranslation();


    const handleSelected = (index) => {
        setIsSelected(index);
    };

    const renderHelp = () => {
        let renderContent = ''
        switch (isSelected) {
            case 0:
                renderContent = (
                    <Fragment>
                        <p>{t('registerTitle')}</p>
                        <p>{t('registerStep1')}</p>
                        <ul>
                            <li>{t('registerUsername')}</li>
                            <li>{t('registerEmail')}</li>
                            <li>{t('registerLang')}</li>
                            <li>{t('registerPassword')}</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.register} />
                        <p>{t('registerStep2')}</p>
                        <p>{t('registerSuccess')}</p>
                        <Image className={cx('img-help')} src={images.registerSuccess} />
                    </Fragment>
                )
                break;
            case 1:
                renderContent = (
                    <Fragment>
                        <p>{t('loginTitle')}</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>{t('loginStep1')}</p>
                        <p>{t('loginCheck')}</p>
                        <p>{t('loginActivation')}</p>
                        <p>{t('loginDirect')}</p>
                        <Image className={cx('img-help')} src={images.activeAccount} />
                        <p>{t('loginStep2')}</p>
                        <p>{t('loginStep3')}</p>
                        <Image className={cx('img-help')} src={images.sendMailAA} />
                        <p>{t('loginEmailCheck')}</p>
                        <Image className={cx('img-help')} src={images.gmailAA} />
                        <p>{t('loginStep4')}</p>
                        <Image className={cx('img-help')} src={images.activeSuccess} />
                        <p>{t('loginActivationSuccess')}</p>
                    </Fragment>
                )
                break;
            case 2:
                renderContent = (
                    <Fragment>
                        <p>{t('forgotPasswordStep1')}</p>
                        <Image className={cx('img-help')} src={images.login} />
                        <p>{t('forgotPasswordStep2')}</p>
                        <Image className={cx('img-help')} src={images.forgotPW} />
                        <p>{t('helpForgotSendMail')}</p>
                        <Image className={cx('img-help')} src={images.sendMailPW} />
                        <p>{t('forgotPasswordStep3')}</p>
                        <Image className={cx('img-help')} src={images.gmailPW} />
                        <p>{t('forgotPasswordStep4')}</p>
                        <Image className={cx('img-help')} src={images.resetPW} />
                    </Fragment>
                )
                break;
            case 3:
                renderContent = (
                    <Fragment>
                        <p>{t('postGuideStep1')}</p>
                        <Image className={cx('img-help')} src={images.homeCreate} />
                        <p>{t('postGuideStep2')}</p>
                        <ul>
                            <li>{t('postGuideLang')}</li>
                            <li>{t('postGuideTitle')}</li>
                            <li>{t('postGuideImage')}</li>
                            <li>{t('postGuideContent')}</li>
                        </ul>
                        <Image className={cx('img-help')} src={images.upload} />
                        <p>{t('postGuideStep3')}</p>
                    </Fragment>
                );
                break;
            case 4:
                renderContent = (
                    <Fragment>
                        <p>{t('profileUpdateStep1')}</p>
                        <Image className={cx('img-help')} src={images.homeInfo} />
                        <p>{t('profileUpdateStep2')}</p>
                        <Image className={cx('img-help')} src={images.information} />
                    </Fragment>
                )
                break;
            default:
        }

        return renderContent
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('contain')}>
                <div className={cx('header')}>
                    <Link to='/' className={cx('home')}>{t('home')}</Link>
                    <RightIcon />
                    <p className={cx('help')}>{t('help')}</p>
                </div>
                <div className={cx('body')}>
                    <ul className={cx('nav')}>
                        <li className={cx('heading')}>
                            <HelpIcon width="3rem" height="3rem" className={cx('icon-heading')} />
                            {t('faq')}
                        </li>
                        {[t('register'), t('login'), t('helpForgot'), t('postGuide'), t('helpInfo')].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelected(index)}
                                className={cx('item', { selected: isSelected === index })}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className={cx('content')}>
                        {renderHelp()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
