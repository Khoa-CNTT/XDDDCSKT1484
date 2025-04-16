import classNames from "classnames/bind";
import styles from './Search.module.scss';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { searchPostsServices, searchUsersServices } from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();

    const { t } = useTranslation();

    const token = localStorage.getItem('authToken');

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(location.search);
        const q = urlParams.get('q');
        const language = urlParams.get('language');
        return {
            q,
            language,
        };

    };

    useEffect(() => {
        initializePosts();
        // eslint-disable-next-line
    }, [location.search])

    const initializePosts = async () => {
        const { language, q } = getParamsFromURL();

        setPosts([]);
        await fetchPosts({
            page: currentPage,
            size: 5,
            content: q,
            language
        });
    };

    const findUser = async (page, size, name) => {
        const res = await searchUsersServices(name, page, size, token);
        if (res?.data && res.data.content.length > 0) {
            setUsers(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
        }
    }

    const fetchPosts = async ({ page, size, content, language }) => {

        const res = await searchPostsServices(page, size, content, language, token);
        if (res?.data) {
            if (res.data?.content.length > 0) {
                setPosts(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
            } else {
                alert(t('notFoundPost'));
            }
        } else if (res.response?.data?.code === 40405) {
            alert(res.response.data.message);
        }
    };

    useScroll(() => {
        const { language, q } = getParamsFromURL();
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchPosts({ page: nextPage, content: q, language, size: 5 });
    });

    return (
        <div className={cx('wrapper')}>
            {posts.map((post) => (
                <Post key={post.id} data={post} show={post.show} />
            ))}
        </div>
    );
}

export default Search;