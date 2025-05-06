import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Image from "~/components/Image";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
    getUserByIdServices,
    getPostByIdUserServices,
    addFriendServices,
    getStatusFriendServices,
    getFriendsServices,
    uploadImageServices,
    updateInfoUserServices,
    acceptFriendServices,
    rejectFriendServices,
    getRequestFriendsServices
} from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";
import Button from "~/components/Button";
import { useLocation } from "react-router-dom";
import images from "~/assets/images";
import { CameraIcon } from "~/components/Icons";
import { UserContext } from "~/context/UserContext";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Profile() {
    const [userCurrent, setUserCurrent] = useState(null);
    const [postsUser, setPostsUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [option, setOption] = useState("Post");
    const [totalsPage, setTotalsPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(0);
    const [userPrimary, setUserPrimary] = useState(false);
    const [statusFriend, setStatusFriend] = useState('');
    const [showRespond, setShowRespond] = useState(false);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);
    const { t } = useTranslation();
    const token = localStorage.getItem("authToken");
    const userId = location.pathname.split("/").pop();

    // Fetch user profile
    const fetchUser = useCallback(async (id) => {
        const res = await getUserByIdServices(id);
        if (res?.data) {
            setUserCurrent(res.data);
            const isPrimary = res.data.id === user.id;
            setUserPrimary(isPrimary);

            if (!isPrimary && token) {
                const resFriend = await getStatusFriendServices(res.data.id, token);

                if (resFriend?.data) {
                    switch (resFriend.data.status) {
                        case 'pendingSend':
                            setStatusFriend('Sent');
                            break;
                        case 'pendingReceived':
                            setStatusFriend('Respond');
                            break;
                        case 'friends':
                            setStatusFriend('Friend');
                            break;
                        default:
                            break;
                    }
                } else {
                    setStatusFriend('Add Friend')
                }
            }
        }
    }, [user.id, token]);

    // Fetch posts
    const fetchPosts = useCallback(async (id, page) => {
        const res = await getPostByIdUserServices(id, page, 5, token);
        if (res?.data?.content.length > 0) {
            setPostsUser(prev => page === 0 ? res.data.content : [...prev, ...res.data.content]);
        }
    }, [token]);

    // Fetch friends
    const fetchFriends = useCallback(async (page) => {
        const res = await getFriendsServices(page, 5, token);
        if (res?.data?.content.length > 0) {
            setFriends(prev => page === 0 ? res.data.content : [...prev, ...res.data.content]);
        }
    }, [token]);

    // Fetch Request Add Friends
    const fetchRequests = useCallback(async (page) => {
        const res = await getRequestFriendsServices(page, 5, token);

        if (res?.data?.content.length > 0) {
            setRequests(prev => page === 0 ? res.data.content : [...prev, ...res.data.content]);
            setTotalsPage(res.data.totalPages);
        }
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        setUserCurrent(null);
        setCurrentPage(0);
        setPostsUser([]);
        setFriends([]);
        fetchUser(userId);
    }, [userId, fetchUser]);

    useScroll(() => {
        if (statusFriend !== 'Request') {
            setCurrentPage(prev => prev + 1);
        }
    });

    useEffect(() => {
        setCurrentPage(0);
        if (option === "Post") {
            setPostsUser([]);
        } else if (option === "Friends") {
            setFriends([]);
        } else {
            setRequests([]);
        }
    }, [option, userId]);

    useEffect(() => {
        if (option === "Post") {
            fetchPosts(userId, currentPage);
        } else if (option === "Friends") {
            fetchFriends(currentPage);
        } else {
            fetchRequests(currentPage);
        }

    }, [option, userId, currentPage, fetchPosts, fetchFriends, fetchRequests]);


    const handleAddFriend = async () => {
        if (statusFriend === 'Add Friend') {
            const res = await addFriendServices(userCurrent.id, token);
            if (res?.data?.receiver === userCurrent.name) {
                setStatusFriend("Sent");
            }
        } else if (statusFriend === 'Respond') {
            setShowRespond(true)
        }
    };

    const handleOptionChange = (newOption) => {
        if (option !== newOption) {
            setOption(newOption);
            setCurrentPage(0);
            if (newOption === "Post") {
                setPostsUser([]);
            } else if (newOption === "Friends") {
                setFriends([]);
            } else {
                setRequests([]);
            }
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const res = await uploadImageServices(file);
            if (res?.data) {
                const infoUserUpdate = { ...user, img: res.data.url };
                await updateInfoUserServices({ img: res.data.url }, token);
                setUser(infoUserUpdate);
                fetchUser(userId);
            } else {
                alert("File Image Error");
            }
        }
    };

    const handleAccept = async (id) => {
        const res = await acceptFriendServices(id, token);
        if (res?.data) {
            if (!userPrimary) {
                setStatusFriend('Friend');
                setShowRespond(false);
            } else {
                setRequests([])
                setCurrentPage(0)
                fetchRequests(0)
            }
        }
    }

    const handleReject = async (id) => {
        const res = await rejectFriendServices(id, token);
        if (res?.data) {
            if (!userPrimary) {
                setStatusFriend('Add Friend');
                setShowRespond(false);
            } else {
                setCurrentPage(0)
                fetchRequests(currentPage)
            }
        }
    }

    const handleSeeAllRequest = () => {
        setCurrentPage(prev => prev + 1);
    }

    const friendList = useMemo(() => {
        if (friends.length > 0) {
            return friends.map((friend, index) => (
                <div key={index} className={cx("item")}>
                    <div className={cx("box-left")}>
                        <Image src={friend.img || images.avatar} className={cx("avatar-friends")} />
                        <h3 className={cx("name-friends")}>{friend.name}</h3>
                    </div>
                    <div className={cx("box-right")}>
                        <Button className={cx("chat-friends")} normal>UnFriend</Button>
                    </div>
                </div>
            ));
        } else {
            return <div className={cx('title-no')}>{t('noFriends')}</div>;
        }
        // eslint-disable-next-line
    }, [friends]);


    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("avatar")}>
                    <Image
                        src={userCurrent?.img || images.avatar}
                        className={cx("img")}
                        alt={userCurrent?.name}
                    />
                    {userPrimary && (
                        <div className={cx("camera")} onClick={handleImageClick}>
                            <CameraIcon />
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <div className={cx("fullname")}>{userCurrent?.name}</div>
                <div className={cx("action")}>
                    {userPrimary ? (
                        <div className={cx('friend-nav')}>
                            <Button onClick={() => handleOptionChange("Post")} primary={option === "Post"}>{t('postBtn')}</Button>
                            <Button onClick={() => handleOptionChange("Friends")} primary={option === "Friends"}>{t('friends')}</Button>
                            <Button onClick={() => handleOptionChange("Request")} primary={option === "Request"}>{t('request')}</Button>
                        </div>
                    ) : (
                        <div className={cx('friend')}>
                            <div className={cx('friend-nav')}>
                                <Button onClick={handleAddFriend} primary>{
                                    statusFriend === 'Send'
                                        ? t.statusSent
                                        : statusFriend === 'Accept invitation'
                                            ? t.statusAccept
                                            : statusFriend === 'Friend' ? t.statusFriend : t.addFriend
                                }</Button>
                            </div>
                            {showRespond && (
                                <div className={cx('friend-res')}>
                                    <Button onClick={() => handleAccept(userId)} primary>{t('accept')}</Button>
                                    <Button onClick={() => handleReject(userId)} normal>{t('reject')}</Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className={cx("body")}>
                {option === "Post" ? (
                    postsUser.map(post => (
                        <Post key={post.id} data={post} profile show={post.show} />
                    ))
                ) : option === "Request" ? (
                    <>
                        <div className={cx('list-request')}>
                            {
                                requests.map((request, index) => (
                                    <div key={index} className={cx('user-request')}>
                                        <img className={cx('img-user')} alt={request.name} src={request.img || images.avatar} />
                                        <h3 className={cx('name-user')}>{request.name}</h3>
                                        <div className={cx('action-user')}>
                                            <Button className={cx('action-accept')} primary onClick={() => handleAccept(request.userSend_id)}>{t('accept')}</Button>
                                            <Button className={cx('action-reject')} normal onClick={() => handleReject(request.userSend_id)}>{t('reject')}</Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {totalsPage !== (currentPage + 1) ?
                            <Button normal className={cx('see-btn')} onClick={handleSeeAllRequest}>{t('btnSeeAll')}</Button>
                            :
                            <div className={cx('title-no')}>{t('noRequests')}</div>
                        }
                    </>
                ) : (
                    <div className={cx("list")}>{friendList}</div>
                )}
            </div>
        </div>
    );
}

export default Profile;
