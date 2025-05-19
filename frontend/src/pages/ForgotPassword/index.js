import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './ForgotPassword.module.scss'
import stylesGrid from '~/styles/grid.module.scss'
import Image from "~/components/Image";
import images from "~/assets/images";
import { useValidator } from '~/hooks';
import FormGroup from "~/components/FormGroup";
import stylesShare from '~/styles/share.module.scss';
import { forgotPasswordServices } from '~/apiServices'
import routesConfig from '~/config/routes'
import Button from "~/components/Button";
import { useTranslation } from "react-i18next";
import { BackIcon } from "~/components/Icons";


const cx = classNames.bind(styles)

function ForgotPassword() {
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        email: '',
    });
    const { t } = useTranslation();
    const navigate = useNavigate()

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('email', 'This field is required'),
            useValidator.isEmail('email', 'Email address is not valid'),
        ]
    });

    const fetchApi = async (email) => {
        const res = await forgotPasswordServices(email);

        if (res?.data) {
            navigate(routesConfig.sendEmail, { state: { fromPage: 'forgotPassword' } })
        } else {
            const { code } = res.response.data
            if (code === 40401) {
                setError('Email is not registered')
            }
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        clearError(name);
    };

    const handleBlur = e => validateField(e.target.name, formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            await fetchApi(formData)
        }
    };

    return (
        <div className={`${cx('wrapper')} ${stylesGrid.grid}`}>
            <div className={`${cx('logo')} ${stylesGrid['grid__row-6']}`}>
                <Image src={images.logo} alt='logo' className={cx('img')} />
            </div>
            <div className={cx('nav')}>
                <Button to={routesConfig.login} className={cx('icon-back')} leftIcon={<BackIcon />} />
            </div>
            <div className={`${cx('content')} ${stylesGrid['grid__row-6']}`}>
                <div className={cx('body')}>
                    <div className={cx('heading')}>
                        {t('forgotPassword')}
                    </div>
                    <div className={cx('title')}>
                        {t('forgotPasswordTitle')}
                    </div>
                    <form className={`${stylesShare.form} ${cx('form-forgot')}`} id="form-forgot">
                        <FormGroup
                            name="email"
                            text={t('email')}
                            placeholder={t('exEmail')}
                            classNameFormGroup={stylesShare.formGroup}
                            classNameLabel={stylesShare.formLabel}
                            classNameInput={stylesShare.formControl}
                            classNameError={stylesShare.formMessage}
                            classNameInvalid={stylesShare.invalid}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.email}
                            valid={errors.email}
                            error={error}
                        />
                        <button onClick={handleSubmit} className={stylesShare.formSubmit}>{t('sendBtn')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

