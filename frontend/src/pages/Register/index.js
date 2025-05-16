import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState } from 'react';

import stylesGrid from '~/styles/grid.module.scss';
import styles from '~/styles/share.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useValidator } from '~/hooks';
import { registerServices } from '~/apiServices'
import FormGroup from '~/components/FormGroup';
import routesConfig from '~/config/routes'
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles)

function Register() {
    const { t } = useTranslation();
    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        language: '',
        gender: '',
        img: '',
        username: '',
        password: '',
        re_password: ''
    });
    const [selected, setSelected] = useState(0);

    const navigate = useNavigate();

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('name', 'This field is required'),
            useValidator.isRequired('email', 'This field is required'),
            useValidator.isEmail('email', 'Email address is not valid'),
            useValidator.isRequired('language', 'This field is required'),
            useValidator.isRequired('gender', 'This field is required'),
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
            useValidator.minLength('password', 5, 'Password must have at least 5 characters'),
            useValidator.isRequired('re_password', 'This field is required'),
            useValidator.isPasswordMatch('re_password', 'password', 'Passwords do not match'),
        ]
    });

    const fetchApi = async (data) => {
        const res = await registerServices(data);

        if (res?.data) {
            alert('Register Success!!')
            navigate(routesConfig.login);
        } else {
            const { code, message } = res.response.data
            if (code === 40002) {
                setMessageError({ 'username': message })
            } else if (code === 40003) {
                setMessageError({ 'email': message })
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
        <div className={cx('wrapper')}>
            <div className={cx(stylesGrid.grid, 'register')}>
                <div className={cx(stylesGrid['grid__row-6'], 'registerLogo')}>
                    <Image className={cx('img')} src={images.logo} alt="Logo" />
                </div>
                <div className={cx(stylesGrid['grid__row-6'], 'registerContent')}>
                    <form className={cx('form')} id="form-register" onSubmit={handleSubmit}>
                        <h3 className={cx('heading')}>{t('register')}</h3>
                        <p className={cx('desc')}>{t('welcome')}</p>

                        <div className={cx('spacer')}></div>

                        <FormGroup
                            name="name"
                            text={t('fullname')}
                            placeholder={t('fullname')}
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.name}
                            valid={errors.name}
                        />

                        <FormGroup
                            name="email"
                            text={t('email')}
                            placeholder={t('exEmail')}
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.email}
                            valid={errors.email}
                            error={messageError.email}
                        />

                        <div className={`${styles.formGroup} ${errors.language ? styles.invalid : ''}`}>
                            <label htmlFor="language" className={styles.formLabel}>{t('language')}</label>
                            <select
                                className={styles.formControl}
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>{t('placeholderLanguage')}</option>
                                <option value="English">{t('langEnglish')}</option>
                                <option value="China">{t('langChinese')}</option>
                                <option value="Japan">{t('langJapanese')}</option>
                            </select>
                            {errors.language && <span className={styles.formMessage}>{errors.language}</span>}
                        </div>

                        <div className={`${styles.formGroup} ${errors.gender ? styles.invalid : ''}`}>
                            <label htmlFor="gender" className={styles.formLabel}>{t('gender')}</label>
                            <select
                                className={styles.formControl}
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>{t('placeholderGender')}</option>
                                <option value="Male">{t('male')}</option>
                                <option value="Female">{t('female')}</option>
                                <option value="Other">{t('other')}</option>
                            </select>
                            {errors.gender && <span className={styles.formMessage}>{errors.gender}</span>}
                        </div>

                        <FormGroup
                            name="username"
                            text={t('username')}
                            placeholder={t('exUsername')}
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.username}
                            valid={errors.username}
                            error={messageError.username}
                        />

                        <FormGroup
                            name="password"
                            type='password'
                            text={t('password')}
                            placeholder={t('password')}
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.password}
                            valid={errors.password}
                        />

                        <FormGroup
                            name="re_password"
                            type='password'
                            text={t('passwordConfirm')}
                            placeholder={t('passwordConfirm')}
                            classNameFormGroup={cx('formGroup')}
                            classNameLabel={cx('formLabel')}
                            classNameInput={cx('formControl')}
                            classNameError={cx('formMessage')}
                            classNameInvalid={cx('invalid')}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            value={formData.re_password}
                            valid={errors.re_password}
                        />
                        <div className={cx('link')}><Link className={cx('link-login')} to={routesConfig.login}>{t('hasAccount')}</Link></div>
                        <button className={cx('formSubmit')} type="submit">{t('register')}</button>
                    </form>
                    <ul className={cx('language-list')}>
                        <li className={cx('en', { active: selected === 0 })} onClick={() => setSelected(0)}>{t('langEnglish')}</li>
                        <li className={cx('jp', { active: selected === 1 })} onClick={() => setSelected(1)}>{t('langChinese')}</li>
                        <li className={cx('ch', { active: selected === 2 })} onClick={() => setSelected(2)}>{t('langJapanese')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Register;
