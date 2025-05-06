import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { searchPostsServices } from '~/apiServices';
import Post from '~/components/Post';
import styles from './Home.module.scss';
import { useScroll } from '~/hooks';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const isInitialized = useRef(false); 
    const { t } = useTranslation();

    useEffect(() => {
        initializePosts();
        // eslint-disable-next-line
    }, []);

    const fetchPosts = async ({ page, size, token }) => {
        const res = await searchPostsServices(page, size, '', '', token);
        if (res?.data) {
            if (res.data?.content.length > 0) {
                setPosts((prev) => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
            } else {
                alert(t('notFoundPost'));
            }
        } else if (res.response?.data?.code === 40405) {
            alert(res.response.data.message);
        }
    };

    const initializePosts = async () => {
        const token = localStorage.getItem('authToken');
        setPosts([]);
        await fetchPosts({
            page: 0,
            size: 5,
            token,
        });
        isInitialized.current = true; 
    };

    useScroll(() => {
        if (!isInitialized.current) return; 

        const token = localStorage.getItem('authToken');
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchPosts({ page: nextPage, size: 5, token });
    });

    return (
        <div className={cx('wrapper')}>
            {posts.map((post) => (
                <Post key={post.id} data={post} show={post.show} />
            ))}
        </div>
    );
}

export default Home;
