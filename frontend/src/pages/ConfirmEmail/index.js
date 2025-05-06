import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './ConfirmEmail.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";
import { verifyAccountServices } from "~/apiServices";
import routesConfig from '~/config/routes'
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function ConfirmEmail() {
    const { t } = useTranslation();
    const [status, setStatus] = useState({
        heading: '',
        title: '',
        showLink: false,
    })

    const fetchApi = async (token) => {
        const res = await verifyAccountServices(token)
        if (res?.data) {
            setStatus({
                heading: t('activeSuccessHeading'),
                title: t('activeSuccessTitle'),
                showLink: true,
            })

        } else {
            const { message } = res.response.data
            setStatus({
                heading: 'Active Error',
                title: message,
                showLink: false,
            })
        }
    }

    useEffect(() => {
        const url = document.URL;
        const urlParam = new URLSearchParams(url.split('?')[1]);
        const token = urlParam.get('token');

        if (token) {
            setStatus((prevStatus) => {
                if (prevStatus.token !== token) {
                    fetchApi(token);
                }
                return { ...prevStatus, token };
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>{status.heading}</div>
                    <div className={cx('title')}>{status.title}</div>
                    {status.showLink && <Link to={routesConfig.login} className={cx('link')}>{t('goLogin')}</Link>}
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmail;
