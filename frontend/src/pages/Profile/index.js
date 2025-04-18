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
    rejectFriendServices
} from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";
import Button from "~/components/Button";
import { ChatContext } from "~/context/ChatContext";
import { useLocation } from "react-router-dom";
import images from "~/assets/images";
import { CameraIcon, DownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState(null);
    const [postsUser, setPostsUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const [option, setOption] = useState("Post");
    const [currentPage, setCurrentPage] = useState(0);
    const [userPrimary, setUserPrimary] = useState(false);
    const [statusFriend, setStatusFriend] = useState('');
    const fileInputRef = useRef(null);
    const respondRef = useRef(null);
    const { toggleChat } = useContext(ChatContext);
    const location = useLocation();

    const token = localStorage.getItem("authToken");
    const idUserPrimary = JSON.parse(localStorage.getItem("currentUser"));
    const userId = location.pathname.split("/").pop();

    // Fetch user profile
    const fetchUser = useCallback(async (id) => {
        const res = await getUserByIdServices(id);
        if (res?.data) {
            setUser(res.data);
            const isPrimary = res.data.id === idUserPrimary.id;
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
    }, [idUserPrimary.id, token]);

    // Fetch posts
    const fetchPosts = useCallback(async (id, page) => {
        const res = await getPostByIdUserServices(id, page, 5, token);
        if (res?.data?.content?.length) {
            setPostsUser(prev => page === 0 ? res.data.content : [...prev, ...res.data.content]);
        }
    }, [token]);

    // Fetch friends
    const fetchFriends = useCallback(async (page) => {
        const res = await getFriendsServices(page, 5, token);
        if (res?.data?.content?.length) {
            setFriends(prev => page === 0 ? res.data.content : [...prev, ...res.data.content]);
        }
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        setUser(null);
        setCurrentPage(0);
        setPostsUser([]);
        setFriends([]);
        fetchUser(userId);
    }, [userId, fetchUser]);

    useScroll(() => {
        setCurrentPage(prev => prev + 1);
    });

    useEffect(() => {
        if (!userId) return;
        if (option === "Post") {
            fetchPosts(userId, currentPage);
        } else {
            fetchFriends(currentPage);
        }
    }, [currentPage, option, userId, fetchPosts, fetchFriends]);

    const handleAddFriend = async () => {
        if (statusFriend === 'Add Friends') {
            const res = await addFriendServices(user.id, token);
            if (res?.data?.receiver === user.name) {
                setStatusFriend("Sent");
            }
        } else if (statusFriend === 'Respond') {
            respondRef.current.style.display = 'flex';
        }
    };

    const handleOptionChange = (newOption) => {
        if (option !== newOption) {
            setOption(newOption);
            setCurrentPage(0);
            if (newOption === "Post") {
                setPostsUser([]);
            } else {
                setFriends([]);
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
                await updateInfoUserServices({ img: res.data.url }, token);
                fetchUser(userId);
            } else {
                alert("File Image Error");
            }
        }
    };

    const handleAccept = async () => {
        const res = await acceptFriendServices(userId, token);
        if (res?.data) {
            setStatusFriend('Friend');
            respondRef.current.style.display = 'none';
        }
    }

    const handleReject = async () => {
        const res = await rejectFriendServices(userId, token);
        if (res?.data) {
            setStatusFriend('Add Friend');
            respondRef.current.style.display = 'none';
        }
    }

    const friendList = useMemo(() => (
        friends.map((friend, index) => (
            <div key={index} className={cx("item")}>
                <div className={cx("box-left")}>
                    <Image src={friend.img || images.avatar} className={cx("avatar-friends")} />
                    <h3 className={cx("name-friends")}>{friend.name}</h3>
                </div>
                <div className={cx("box-right")}>
                    <Button className={cx("chat-friends")} normal>Chat</Button>
                    <DownIcon className={cx("btn-more")} />
                </div>
            </div>
        ))
    ), [friends]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("avatar")}>
                    <Image
                        src={user?.img || images.avatar}
                        className={cx("img")}
                        alt={user?.name}
                        onClick={handleImageClick}
                    />
                    <div className={cx("camera")} onClick={handleImageClick}>
                        <CameraIcon />
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <div className={cx("fullname")}>{user?.name}</div>
                <div className={cx("action")}>
                    {userPrimary ? (
                        <>
                            <Button onClick={() => handleOptionChange("Post")} primary={option === "Post"}>Post</Button>
                            <Button onClick={() => handleOptionChange("Friends")} primary={option === "Friends"}>Friends</Button>
                        </>
                    ) : (
                        <div className={cx('friend')}>
                            <div className={cx('friend-nav')}>
                                <Button onClick={handleAddFriend} primary>{statusFriend}</Button>
                                <Button onClick={toggleChat} normal>Chat</Button>
                            </div>
                            <div ref={respondRef} className={cx('friend-res')}>
                                <Button onClick={handleAccept} primary>Accept</Button>
                                <Button onClick={handleReject} normal>Reject</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cx("body")}>
                {option === "Post" ? (
                    postsUser.map(post => (
                        <Post key={post.id} data={post} profile show={post.show} />
                    ))
                ) : (
                    <div className={cx("list")}>{friendList}</div>
                )}
            </div>
        </div>
    );
}

export default Profile;
