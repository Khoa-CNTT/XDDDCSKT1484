import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import stylesGrid from '~/styles/grid.module.scss'
import styles from '~/styles/share.module.scss'
import images from "~/assets/images";
import Image from "~/components/Image";
import { useValidator } from '~/hooks';
import FormGroup from '~/components/FormGroup';
import { loginServices, checkActiveServices, infoUserCurrentServices, logoutServices } from '~/apiServices'
import routesConfig from '~/config/routes'
import { ChatContext } from '~/context/ChatContext';
import { useTranslation } from 'react-i18next';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles)

function Login() {
    const { t, i18n } = useTranslation();
    const { setIsOpenChat } = useContext(ChatContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [selected, setSelected] = useState(0);

    const handleLogout = async () => {
        setIsOpenChat(false);
        const token = localStorage.getItem('authToken');
        if (token) {
            await logoutServices(token);
            setUser(null);
        }
        localStorage.clear()
    }

    useEffect(() => {
        handleLogout();
        // eslint-disable-next-line
    }, [])

    const { errors, validateField, clearError, validateAll } = useValidator({
        rules: [
            useValidator.isRequired('username', 'This field is required'),
            useValidator.isRequired('password', 'This field is required'),
        ],
    });

    const fetchApiLogin = async (data) => {
        const res = await loginServices(data);
        if (!res.data) {
            const { code, message } = res.response.data;
            setMessageError((prev) => ({
                ...prev,
                [code === 40401 ? 'username' : 'password']: message,
            }));
            return;
        }

        const token = res.data.token;
        localStorage.setItem('authToken', token);

        if (token) {
            const activeRes = await checkActiveServices(token);
            if (activeRes?.data.authorized) {
                const userInfoRes = await infoUserCurrentServices(token);
                const userResponse = userInfoRes?.data
                if (userResponse) {
                    localStorage.setItem('currentUser', JSON.stringify(userResponse))
                    navigate(routesConfig.home);
                }
            } else {
                navigate(routesConfig.activeAccount);
            }
        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        clearError(name);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateAll(formData)) {
            await fetchApiLogin(formData);
        } else {
            console.log('Có lỗi xảy ra:', errors);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx(stylesGrid.grid, 'login')}>
                <div className={cx(stylesGrid['grid__row-6'], 'loginLogo')}>
                    <Image className={cx('img')} src={images.logo} alt="Logo" />
                </div>
                <div className={cx(stylesGrid['grid__row-6'], 'loginContent')}>
                    <form className={cx('form')} id="form-login" onSubmit={handleSubmit}>
                        <h3 className={cx('heading')}>{t('login')}</h3>
                        <p className={cx('desc')}>{t('welcome')}</p>

                        <div className={cx('spacer')}></div>

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
                            text={t('password')}
                            type="password"
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
                            error={messageError.password}
                        />
                        <div className={cx('link')}>
                            <Link className={cx('link-forgot')} to={routesConfig.forgotPassword} >{t('forgotPassword')}</Link>
                            <Link className={cx('link-register')} to={routesConfig.register} >{t('register')}</Link>
                        </div>
                        <button className={cx('formSubmit')} type="submit">{t('login')}</button>
                    </form>

                    <ul className={cx('language-list')}>
                        <li className={cx('en', { active: selected === 0 })} onClick={() => {
                            setSelected(0);
                            i18n.changeLanguage('en')
                        }}>{t('langEnglish')}</li>
                        <li className={cx('jp', { active: selected === 1 })} onClick={() => {
                            setSelected(1);
                            i18n.changeLanguage('jp')
                        }}>{t('langJapanese')}</li>
                        <li className={cx('cn', { active: selected === 2 })} onClick={() => {
                            setSelected(2);
                            i18n.changeLanguage('cn')
                        }}>{t('langChinese')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Login;
