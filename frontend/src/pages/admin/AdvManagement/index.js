import classNames from 'classnames/bind';
import styles from './AdsManagement.module.scss';
import { useEffect, useState } from 'react';
import { SearchIcon, LeftIcon, RightIcon } from '~/components/Icons';
import AddForm from './AddForm';
import AdsTable from './AdsTable';
import EditModal from './EditModal';

const cx = classNames.bind(styles);

function AdsManagement() {
    const [adsList, setAdsList] = useState([]);
    const [editingAd, setEditingAd] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageCurrent, setPageCurrent] = useState(0);
    const [totalsPage, setTotalsPage] = useState(1);

    useEffect(() => {
        fetchMockAds();
    }, []);

    const fetchMockAds = () => {
        const mockData = [
            {
                id: 1,
                name: 'Basic Package',
                price: 100,
                max_impressions: 1000,
                status: 'Active',
            },
            {
                id: 2,
                name: 'Pro Package',
                price: 250,
                max_impressions: 5000,
                status: 'Inactive',
            },
        ];
        setAdsList(mockData);
        setTotalsPage(1);
    };

    const handleAddAd = (newAd) => {
        setAdsList((prev) => [
            { ...newAd, id: Date.now(), status: 'Active' },
            ...prev,
        ]);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            setAdsList((prev) => prev.filter((ad) => ad.id !== id));
        }
    };

    const handleSaveEdit = (updatedAd) => {
        setAdsList((prev) =>
            prev.map((ad) => (ad.id === updatedAd.id ? updatedAd : ad)),
        );
        setEditingAd(null);
    };

    const filteredAds = adsList.filter((ad) =>
        ad.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleReducePage = () => {
        setPageCurrent(prev => Math.max(prev - 1, 0));
    };

    const handleIncreasePage = () => {
        setPageCurrent(prev => Math.max(prev + 1, totalsPage - 1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('ads')}>
                <div className={cx('ads-header')}>
                    <div className={cx('ads-heading')}>Management Ads</div>
                    <div className={cx('ads-search')}>
                        <SearchIcon className={cx('search-icon')} />
                        <input
                            className={cx('search-input')}
                            type="text"
                            placeholder="Search package name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <AddForm onAdd={handleAddAd} />

                <AdsTable
                    adsList={filteredAds}
                    onEdit={setEditingAd}
                    onDelete={handleDelete}
                />

                <div className={cx('ads-footer')}>
                                    <div className={cx('page-current')}>
                                        {`${pageCurrent + 1} of ${totalsPage} Page`}
                                    </div>
                
                                    <div className={cx('pagination')}>
                                        <LeftIcon onClick={handleReducePage} className={cx('prev-btn', { 'disable': pageCurrent === 0 })} />
                                        <RightIcon onClick={handleIncreasePage} className={cx('next-btn', { 'disable': (pageCurrent + 1) === totalsPage })} />
                                    </div>
                                </div>

                {editingAd && (
                    <EditModal
                        ad={editingAd}
                        onSave={handleSaveEdit}
                        onCancel={() => setEditingAd(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default AdsManagement;
