import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { inspectTokenServices, searchPostsServices } from '~/apiServices';
import Post from '~/components/Post';
import styles from './Home.module.scss';
import { useScroll } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);
function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { user } = useContext(UserContext);
    const isInitialized = useRef(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (user) {
            initializePosts(user.language);
        } else {
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                initializePosts(currentUser.language);
            } else {
                initializePosts('');
            }
        }
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        inspectToken();
    }, [])

    const inspectToken = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const res = await inspectTokenServices(token);
            if (!res?.data.result) {
                localStorage.clear();
            }
        }
    }

    const fetchPosts = async ({ page, size, language, token }) => {
        const res = await searchPostsServices(page, size, '', language, token);
        if (res?.data) {
            if (res.data?.content.length > 0) {
                setPosts((prev) => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
            } else {
                alert(t('notFoundPost'));
            }
        } else if (res.response?.data?.code) {
            alert(res.response.data.message);
        }
    };

    const initializePosts = async (language) => {
        const token = localStorage.getItem('authToken');
        setPosts([]);
        await fetchPosts({
            page: 0,
            size: 5,
            token,
            language,
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
            {posts.map((post, index) => (
                <Post key={index} data={post} show={post.show} />
            ))}
        </div>
    );
}

export default Home;
