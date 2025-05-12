import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback, useContext, Fragment } from 'react';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { editPostServices, getPackageAdsServices, getPostContentServices, submitVNPayServices, uploadImageServices, uploadPostContentServices, uploadPostPollServices } from '~/apiServices';
import { useTranslation } from 'react-i18next';
import { BoldIcon, ClearSearchIcon, CloseIcon, ContentIcon, ImageIcon, ItalicIcon, PlusIcon, PollIcon, TrashIcon, UnderlineIcon, WalletIcon } from '~/components/Icons';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function Upload() {
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [packageAds, setPackageAds] = useState([]);
    const [isSelected, setIsSelected] = useState(0);
    const [typePost, setTypePost] = useState('Content');
    const [showImg, setShowImg] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [textFormat, setTextFormat] = useState({ bold: false, italic: false, underline: false });
    const [languagePost, setLanguagePost] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(UserContext);
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const idPost = params.get('id');

    const [contentForm, setContentForm] = useState({
        title: '',
        content: '',
        img_url: '',
    });

    const [pollForm, setPollForm] = useState({
        question: '',
        typePoll: '',
        createOptionDtoList: [{ option_text: '' }, { option_text: '' }],
    });

    const fileInputRef = useRef();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const fetchPostEdit = async (id, token) => {
        const res = await getPostContentServices(id, token);
        if (res?.data) {
            setContentForm({
                title: res.data.title,
                content: res.data.content,
            })
        }
    }

    useEffect(() => {
        if (idPost) {
            fetchPostEdit(idPost, localStorage.getItem('authToken'));
        }
    }, [idPost]);

    useEffect(() => {
        document.title = contentForm?.title || 'ForumLanguages';
    }, [contentForm]);

    useEffect(() => {
        if (!idPost) {
            if (typePost === 'Content') {
                setIsButtonDisabled(!(contentForm.title && contentForm.content && languagePost));
            } else {
                const hasValidOption = Array.isArray(pollForm.createOptionDtoList)
                    && pollForm.createOptionDtoList.length > 0
                    && pollForm.createOptionDtoList.some(option => option.option_text.trim() !== '');
                setIsButtonDisabled(!(pollForm.question && languagePost && pollForm.typePoll && hasValidOption));
            }
        } else {
            setIsButtonDisabled(!(contentForm.title && contentForm.content));
        }
    }, [contentForm, pollForm, languagePost, typePost, idPost]);


    const fetchAdsPackage = async (token) => {
        const res = await getPackageAdsServices(0, 50, token);
        if (res?.data && res.data.content.length > 0) {
            setPackageAds(res.data.content);
        }
    }

    const resetForm = () => {
        setContentForm({ title: '', content: '', img_url: '' });
        setPollForm({
            question: '',
            typePoll: '',
            createOptionDtoList: [{ option_text: '' }, { option_text: '' }],
        });
        setLanguagePost('');
        setIsSelected(0);
        setTypePost('Content');
    };

    const handleInputChange = (field, formType = 'content') => (e) => {
        const value = e.target.value;
        if (formType === 'content') {
            setContentForm(prev => ({ ...prev, [field]: value }));
        } else {
            setPollForm(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleTypePoll = (e) => {
        setPollForm(prev => ({ ...prev, typePoll: e.target.id }))

    }

    const handleToggleFormat = useCallback((format) => {
        setTextFormat((prev) => ({ ...prev, [format]: !prev[format] }));
    }, []);

    const handleImageUpload = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        e.preventDefault();
        const imgFile = e.target.files[0];
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setContentForm((prev) => ({ ...prev, img_url: reader.result }));
                setShowImg(true);
            };
            reader.readAsDataURL(imgFile);
        }
    };

    const removeOption = (index) => {
        setPollForm(prev => ({
            ...prev,
            createOptionDtoList: prev.createOptionDtoList.filter((_, i) => i !== index)
        }));
    };

    const handleOptionChange = (index) => (e) => {
        const value = e.target.value;
        setPollForm(prev => ({
            ...prev,
            createOptionDtoList: prev.createOptionDtoList.map((option, i) =>
                i === index ? { ...option, option_text: value } : option
            )
        }));
    };

    const addOption = (e) => {
        e.preventDefault();
        setPollForm((prev) => ({
            ...prev,
            createOptionDtoList: [...prev.createOptionDtoList, { option_text: '' }]
        }));
    };

    const handleToggleModal = () => {
        setShowModal(prev => !prev);
    }

    const handleSelectAds = e => {
        e.preventDefault();
        setSelectedPackageId(e.target.elements.ads.value);
        setShowModal(prev => !prev);
    }

    const handleAdsPackage = e => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        fetchAdsPackage(token);
        setShowModal(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken')
        if (!idPost) {
            if (typePost === 'Content') {
                let imgLink = '';
                if (fileInputRef.current.files[0]) {
                    imgLink = await uploadImageServices(fileInputRef.current.files[0]);
                }
                const data = { ...contentForm, img_url: imgLink?.data?.url, language: languagePost };
                const res = await uploadPostContentServices(data, token);
                if (res?.data) {
                    if (res.data?.show) {
                        if (selectedPackageId) {
                            const resVNPay = await submitVNPayServices('en', typePost.toUpperCase(), res.data.id, selectedPackageId, token);
                            if (resVNPay?.data?.success) {
                                window.location.href = resVNPay.data.url;
                            }
                        } else {
                            alert(t('uploadSuccess'))
                            navigate(`/post/${res.data.id}`)
                        }
                    } else {
                        navigate(`/user/${user.id}`);
                    }
                    resetForm();
                } else {
                    console.log(res);
                }

            } else {
                const data = { ...pollForm, language: languagePost };
                const res = await uploadPostPollServices(data, token);
                if (res?.data) {
                    if (res.data?.show) {
                        if (selectedPackageId) {
                            const resVNPay = await submitVNPayServices('en', typePost.toUpperCase(), res.data.id, selectedPackageId, token);
                            if (resVNPay?.data?.success) {
                                window.location.href = resVNPay.data.url;
                            }
                        } else {
                            alert(t('uploadSuccess'))
                            navigate(`/post/${res.data.id}`)
                        }
                    } else {
                        navigate(`/user/${user.id}`);
                    }
                    resetForm();
                } else {
                    console.log(res);
                }
            }
        } else {
            const data = { content: contentForm.content, title: contentForm.title };
            const res = await editPostServices(idPost, data, token);
            if (res?.data) {
                if (res.data.show) {
                    alert(t('editPostUpload'));
                    navigate(`/post/${res.data.id}`);
                } else {
                    alert(t('editPostUnUpload'));
                    navigate(`/user/${user.id}`);
                }
            }
        }
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3 className={cx('header-heading')}>{idPost ? 'Edit Post' : t('createPost')}</h3>
                </div>
                {
                    !idPost &&
                    <div className={cx('type')}>
                        <Button
                            primary={isSelected === 0}
                            leftIcon={<ContentIcon />}
                            normal
                            onClick={() => {
                                setIsSelected(0);
                                setTypePost('Content')
                            }
                            }>{t('content')}</Button>
                        <Button
                            primary={isSelected === 1}
                            leftIcon={<PollIcon />}
                            normal
                            onClick={() => {
                                setIsSelected(1);
                                setTypePost('Poll')
                            }
                            }>{t('poll')}</Button>
                    </div>
                }
                <form className={cx('form')} onSubmit={handleSubmit}>
                    {!idPost &&
                        <div className={cx('kind')}>
                            <div className={cx('kind-lang')}>
                                <span className={cx('kind-title')}>{t('language')}:</span>
                                <select
                                    value={languagePost}
                                    onChange={(e) => setLanguagePost(e.target.value)}
                                    className={cx('kind-select')}
                                >
                                    <option value='' disabled>{t('language')}</option>
                                    <option value='English'>{t('langEnglish')}</option>
                                    <option value='China'>{t('langChinese')}</option>
                                    <option value='Japan'>{t('langJapanese')}</option>
                                </select>
                            </div>
                            <Button onClick={handleAdsPackage} className={cx('btn-ads')} primary>{t('advertisement')}</Button>
                        </div>
                    }
                    <div className={cx('body')}>
                        {typePost === 'Content' ?
                            (
                                <>
                                    <div className={cx('title')}>
                                        <input
                                            type='text'
                                            value={contentForm.title}
                                            onChange={handleInputChange('title')}
                                            className={cx('title-input')}
                                            placeholder={t('postTitlePlaceholder')}
                                        />
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('content-header')}>
                                            <Button iconNav leftIcon={<BoldIcon />} onClick={() => handleToggleFormat('bold')} />
                                            <Button iconNav leftIcon={<ItalicIcon />} onClick={() => handleToggleFormat('italic')} />
                                            <Button iconNav leftIcon={<UnderlineIcon />} onClick={() => handleToggleFormat('underline')} />
                                            <Button type='button' iconNav leftIcon={<ImageIcon />} onClick={handleImageUpload}>
                                                <input type='file' accept='image/*' hidden ref={fileInputRef} onChange={handleFileChange} />
                                            </Button>
                                            <Button iconNav leftIcon={<TrashIcon />} onClick={() => setContentForm((prev) => ({ ...prev, content: '' }))} />
                                        </div>
                                        <textarea
                                            className={cx('content-text', { bold: textFormat.bold, italic: textFormat.italic, underline: textFormat.underline })}
                                            value={contentForm.content}
                                            onChange={handleInputChange('content')}
                                            placeholder={t('content')}
                                        />
                                    </div>
                                    {showImg && contentForm.img_url && (
                                        <div className={cx('file')}>
                                            <Image className={cx('file-img')} src={contentForm.img_url} alt='Uploaded' />
                                        </div>
                                    )}
                                    <div className={cx('upload')}>
                                        <Button type='submit' round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                                            {idPost ? 'Save' : t('postBtn')}
                                        </Button>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className={cx('typePoll')}>
                                        <span className={cx('type-title')}>{t('typePoll')}</span>
                                        <label htmlFor='Single'>
                                            <input value={pollForm.typePoll} onChange={handleTypePoll} type='radio' id='Single' name='answer' />
                                            {t('singleAnswer')}
                                        </label>
                                        <label htmlFor='Multiple'>
                                            <input value={pollForm.typePoll} onChange={handleTypePoll} type='radio' id='Multiple' name='answer' />
                                            {t('multipleAnswer')}
                                        </label>
                                    </div>
                                    <div className={cx('question')}>
                                        <textarea
                                            value={pollForm.question}
                                            onChange={handleInputChange('question', 'poll')}
                                            className={cx('question-text')}
                                            placeholder={t('question')}
                                        />
                                    </div>
                                    <div className={cx('options')}>
                                        {pollForm.createOptionDtoList.map((option, index) => (
                                            <div key={index} className={cx('option-item')}>
                                                <input
                                                    value={pollForm.createOptionDtoList[index].option_text}
                                                    onChange={handleOptionChange(index)}
                                                    key={index}
                                                    type='text'
                                                    placeholder={`${t('option')} ${(index + 1)}`}
                                                />
                                                {pollForm.createOptionDtoList.length > 2 && (
                                                    <Button className={cx('remove-btn')} onClick={() => removeOption(index)} leftIcon={<ClearSearchIcon width='3.2rem' height='3.2rem' />} />
                                                )}
                                            </div>
                                        ))}
                                        <Button className={cx('option-btn')} leftIcon={<PlusIcon />} normal onClick={addOption}>{t('addOption')}</Button>
                                    </div>
                                    <div className={cx('upload')}>
                                        <Button type='submit' round normal={!isButtonDisabled} disabled={isButtonDisabled} className={cx('upload-btn')}>
                                            {t('postBtn')}
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>
            {showModal && packageAds.length > 0 && (
                <div className={cx('modal')}>
                    <div className={cx('container')}>
                        <div className={cx('modal-header')}>
                            <h3 className={cx('modal-heading')}>{t('selectAds')}</h3>
                            <Button onClick={handleToggleModal} iconCircle className={cx('modal-close')} leftIcon={<CloseIcon />} />
                        </div>
                        <div className={cx('ads-list')}>
                            <form onSubmit={handleSelectAds}>
                                {packageAds.map(item => (
                                    <label key={item.id} className={cx('ads-option')}>
                                        <input
                                            type="radio"
                                            name="ads"
                                            className={cx('ads-input')}
                                            value={item.id}
                                        />
                                        <div className={cx('ads-info')}>
                                            <span className={cx('name-ads')}>{item.name}</span>
                                            <span className={cx('des-ads')}>{item.description}</span>
                                            <span className={cx('price-ads')}>{item.price}</span>
                                        </div>
                                        <WalletIcon />
                                    </label>
                                ))}
                                <Button className={cx('btn-select')} primary>{t('select')}</Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Upload;
