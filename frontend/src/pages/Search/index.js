import classNames from "classnames/bind";
import styles from './Search.module.scss';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { searchPostsServices, searchUsersServices } from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";
import User from "~/components/User";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Search() {
    const [typeSearch, setTypeSearch] = useState('All');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalPost, setTotalPost] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    // eslint-disable-next-line
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();

    // const { t } = useTranslation();

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
        initializePosts(0);
        setTypeSearch('All');
        // eslint-disable-next-line
    }, [location.search]);

    const initializePosts = async (page) => {
        const { language, q } = getParamsFromURL();

        setPosts([]);
        setUsers([]);
        setCurrentPage(page);
        await fetchPosts({
            page,
            size: 5,
            content: q,
            language
        });
        await findUser(page, 5, q);
    };

    const findUser = async (page, size, name) => {
        const res = await searchUsersServices(name, page, size, token);
        if (res?.data && res.data.content.length > 0) {
            setUsers(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
            setTotalUser(res.data.totalElements);
        }
    }

    const fetchPosts = async ({ page, size, content, language }) => {

        const res = await searchPostsServices(page, size, content, language, token);
        if (res?.data) {
            if (res.data?.content.length > 0) {
                setPosts(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
                setTotalPost(res.data.totalElements);
            }
        } else if (res.response?.data?.code === 40405) {
            alert(res.response.data.message);
        }
    };

    const handleSeePost = () => {
        setTypeSearch('Post')
    }

    const handleSeeUser = () => {
        setTypeSearch('User')
    }

    useScroll(() => {
        if (typeSearch !== 'All') {
            const { language, q } = getParamsFromURL();
            setCurrentPage(prevPage => {
                const nextPage = prevPage + 1;
                if (typeSearch === 'Post') {
                    fetchPosts({ page: nextPage, content: q, language, size: 5 });
                } else {
                    findUser(nextPage, 5, q);
                }
                return nextPage;
            });
        }
    });

    return (
        <div className={cx('wrapper')}>
            {typeSearch !== 'Post' &&
                (
                    <div className={cx('users')}>
                        {users.length > 0 && <h3 className={cx('users-title')}>Everybody</h3>}
                        {users.map(user => (
                            <User key={user.id} data={user} />
                        ))}
                        {totalUser > 5 && typeSearch === 'All' &&
                            (
                                <div className={cx('see-all')}>
                                    <Button className={cx('see-btn')} normal onClick={handleSeeUser}>See All</Button>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {typeSearch !== 'User' &&
                (
                    <div className={cx('posts')}>
                        {posts.length > 0 && <h3 className={cx('posts-title')}>Posts</h3>}
                        {posts.map(post => (
                            <Post key={post.id} data={post} show={post.show} />
                        ))}
                        {totalPost > 5 && typeSearch === 'All' &&
                            (
                                <div className={cx('see-all')}>
                                    <Button className={cx('see-btn')} normal onClick={handleSeePost}>See All</Button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Search;