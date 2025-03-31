import classNames from "classnames/bind";
import styles from './Policy.module.scss'
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles)

function Policy() {
    const [policy, setPolicy] = useState('Content');
    const [isSelected, setIsSelected] = useState(0);
    const { t } = useTranslation();
    const handleSelected = (index) => {

        let idElement = '';
        if (index === 0) {
            idElement = 'rules';
        } else {
            idElement = 'enforcement';
        }
        const targetElement = document.getElementById(idElement);
        if (targetElement) {
            targetElement.scrollIntoView({ block: 'start' });
        }
        setIsSelected(index);
    };

    const renderContentPolicy = () => {
        return (
            <Fragment>
                <p>{t('contentHeading1')}</p>
                <p>{t('contentHeading2')}</p>
                <p>{t('contentHeading3')}</p>
                <p>{t('contentHeading4')}</p>
                <p>{t('contentHeading5')}</p>
                <p>{t('contentHeading6')}</p>
                <div className={cx('rules')} id="rules">
                    <h2>{t('rules')}</h2>
                    <div>
                        <h3>{t('rule1')}</h3>
                        <p>{t('rule1Text')}</p>
                        <h3>{t('rule2')}</h3>
                        <p>{t('rule2Text')}</p>
                        <h3>{t('rule3')}</h3>
                        <p>{t('rule3Text')}</p>
                        <h3>{t('rule4')}</h3>
                        <p>{t('rule4Text')}</p>
                        <h3>{t('rule5')}</h3>
                        <p>{t('rule5Text')}</p>
                        <h3>{t('rule6')}</h3>
                        <p>{t('rule6Text')}</p>
                        <h3>{t('rule7')}</h3>
                        <p>{t('rule7Text')}</p>
                        <h3>{t('rule8')}</h3>
                        <p>{t('rule8Text')}</p>
                    </div>
                </div>
                <div className={cx('enforcement')} id="enforcement">
                    <h2>{t('enforce')}</h2>
                    <p>{t('enforceTitle')}</p>
                    <ul>
                        <li>{t('enforce1')}</li>
                        <li>{t('enforce2')}</li>
                        <li>{t('enforce3')}</li>
                        <li>{t('enforce4')}</li>
                        <li>{t('enforce5')}</li>
                        <li>{t('enforce6')}</li>
                        <li>{t('enforce7')}</li>
                    </ul>
                </div>
            </Fragment>
        );
    }

    const renderPrivacyPolicy = () => {
        return (
            <Fragment>
                <h3>{t('privacy1')}</h3>
                <p>{t('privacy1Text1')}</p>
                <p>{t('privacy1Text2')}</p>
                <p>{t('privacy1Text3')}</p>
                <p>{t('privacy1Text4')}</p>
                <h3>{t('privacy2')}</h3>
                <p>{t('privacy2Title')}</p>
                <ul>
                    <li>{t('privacy2Text1')}</li>
                    <li>{t('privacy2Text2')}</li>
                    <li>{t('privacy2Text3')}</li>
                    <li>{t('privacy2Text4')}</li>
                    <li>{t('privacy2Text5')}</li>
                </ul>
                <h3>{t('privacy3')}</h3>
                <p>{t('privacy3Text1')}</p>
                <p>{t('privacy3Text2')}</p>
                <p>{t('privacy3Text3')}</p>
                <h3>{t('privacy4')}</h3>
                <p>{t('privacy4Title')}</p>
                <ul>
                    <li>{t('privacy4Text1')}</li>
                    <li>{t('privacy4Text2')}</li>
                </ul>
                <h3>{t('privacy5')}</h3>
                <p>{t('privacy5Title')}</p>
                <ul>
                    <li>{t('privacy5Text1')}</li>
                    <li>{t('privacy5Text2')}</li>
                    <li>{t('privacy5Text3')}</li>
                    <li>{t('privacy5Text4')}</li>
                </ul>
                <h3>{t('privacy6')}</h3>
                <p>{t('privacy6Title1')}</p>
                <p>{t('privacy6Title2')}</p>
                <ul>
                    <li>{t('privacy6Text1')}</li>
                    <li>{t('privacy6Text2')}</li>
                    <li>{t('privacy6Text3')}</li>
                    <li>{t('privacy6Text4')}</li>
                    <li>{t('privacy6Text5')}</li>
                </ul>
                <p>{t('privacy6Title3')}</p>
                <ul>
                    <li>{t('privacy6Text5')}</li>
                    <li>{t('privacy6Text6')}</li>
                    <li>{t('privacy6Text7')}</li>
                </ul>
                <h3>{t('privacy7')}</h3>
                <p>{t('privacy7Text1')}</p>
                <p>{t('privacy7Text2')}</p>
                <p>{t('privacy7Text3')}</p>
                <p>{t('privacy7Text4')}</p>
                <p>{t('privacy7Text5')}</p>
                <p>{t('privacy7Text6')}</p>
                <p>{t('privacy7Text7')}</p>

            </Fragment>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('category')}>
                    <select
                        className={cx('policy')}
                        id="policy"
                        name="policy"
                        value={policy}
                        onChange={(e) => setPolicy(e.target.value)}
                    >
                        <option value='Content'>{t('policyContent')}</option>
                        <option value='Privacy'>{t('policyPrivacy')}</option>
                    </select>
                    {policy === 'Content' && <div className={cx('nav')}>
                        {[t('rules'), t('enforce')].map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelected(index)}
                                className={cx('item', { selected: isSelected === index })}
                            >
                                {item}
                            </li>
                        ))}
                    </div>}
                </div>
                <div className={cx('content')}>
                    <div className={cx('body')}>
                        {policy === 'Content' ? renderContentPolicy() : renderPrivacyPolicy()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Policy;