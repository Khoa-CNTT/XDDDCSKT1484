import { Link, useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './ActiveAccount.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Button from "~/components/Button";
import Image from "~/components/Image";
import images from "~/assets/images";
import { sendEmailServices } from "~/apiServices";
import routesConfig from '~/config/routes'
import { useTranslation } from 'react-i18next';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles)

function ActiveAccount() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const handleSendEmail = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No auth token found in localStorage");
            return;
        }

        const res = await sendEmailServices(token);
        if (res?.data) {
            navigate(routesConfig.sendEmail, { state: { fromPage: 'activeAccount' } });
        } else {
            console.error("Failed to send email. Response:", res);
        }
    };

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('logo')}`}>
                <Image className={cx('img')} src={images.logo} alt='Logo' />
            </div>
            <div className={cx('nav')}>
                <Button to={routesConfig.forgotPassword} className={cx('icon-back')} leftIcon={<BackIcon />} />
            </div>
            <div className={` ${stylesGrid['grid__row-6']} ${cx('content')} `}>
                <div className={cx('header')}>
                    <h4 className={cx('heading')}>{t('activeHeading')}</h4>
                    <p className={cx('title')}>{t('activeTitle')}</p>
                </div>
                <div className={cx('body')}>
                    <Button onClick={handleSendEmail} className={cx('btn-send')} round primary >{t('sendBtn')}</Button>
                    <Link className={cx('link')} to={routesConfig.login}>{t('anotherAccount')}</Link>
                </div>
            </div>
        </div>
    );
}

export default ActiveAccount;
