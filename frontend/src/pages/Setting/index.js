import classNames from "classnames/bind";
import styles from './Setting.module.scss';
import { useTranslation } from "react-i18next";
import { useState } from "react";

import Account from "./Account";
import Privacy from "./Privacy";
import Preference from "./Preference";
import Notification from "./Notification";
import Advance from "./Advance";

const cx = classNames.bind(styles);

function Setting() {
    const { t } = useTranslation();
    const [typeSetting, setTypeSetting] = useState('Account');

    const handleSelectType = (type) => {
        setTypeSetting(type);
    };

    const renderTypeSetting = () => {
        switch (typeSetting) {
            case 'Account':
                return <Account />;
            case 'Privacy':
                return <Privacy />;
            case 'Preferences':
                return <Preference />;
            case 'Notifications':
                return <Notification />;
            case 'Advance':
                return <Advance />;
            default:
                return null;
        }
    };

    const settingTabs = [
        { key: 'Account', label: t('account') },
        { key: 'Privacy', label: t('privacy') },
        { key: 'Preferences', label: t('preferences') },
        { key: 'Notifications', label: t('notifications') },
        { key: 'Advance', label: t('advance') },
    ];

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>{t('setting')}</h1>

            <ul className={cx('category')}>
                {settingTabs.map((tab) => (
                    <li
                        key={tab.key}
                        onClick={() => handleSelectType(tab.key)}
                        className={cx('item', { isActive: typeSetting === tab.key })}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>

            {renderTypeSetting()}
        </div>
    );
}

export default Setting;
