import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Image from "~/components/Image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    getUserByIdServices,
    getPostByIdUserServices,
    addFriendServices,
    getStatusFriendServices,
    getFriendsServices
} from "~/apiServices";
import Post from "~/components/Post";
import { useScroll } from "~/hooks";
import Button from "~/components/Button";
import { ChatContext } from "~/context/ChatContext";
import { useLocation } from "react-router-dom";
import images from "~/assets/images";
import { DownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState(null);
    const [postsUser, setPostsUser] = useState([]);
    const [option, setOption] = useState("Post");
    const [userPrimary, setUserPrimary] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [friends, setFriends] = useState([]);
    const [statusFriend, setStatusFriend] = useState('');

    const { toggleChat } = useContext(ChatContext);
    const location = useLocation();
    const token = localStorage.getItem("authToken");
    const idUserPrimary = JSON.parse(localStorage.getItem("currentUser"));
    const userId = location.pathname.split("/").pop();

    const fetchPosts = useCallback(async (id, page) => {
        const res = await getPostByIdUserServices(id, page, 5, token);
        if (res?.data?.content.length > 0) {
            setPostsUser(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
        }
    }, [token]);

    const handleAddFriend = async () => {
        const res = await addFriendServices(user.id, token);
        if (res?.data?.receiver === user.name) {
            setStatusFriend('Sent');
        }
    };

    const handleOptionChange = (newOption) => {
        if (option !== newOption) {
            setOption(newOption);
            setCurrentPage(0);
        }
    };

    const fetchUser = useCallback(async (id) => {
        const res = await getUserByIdServices(id);
        if (res?.data) {
            setUser(res.data);
            setUserPrimary(res.data?.id === idUserPrimary.id);
            fetchPosts(res.data?.id, 0);
            if (token && res.data.id !== idUserPrimary.id) {
                const resFriend = await getStatusFriendServices(res.data.id, token);
                setStatusFriend(resFriend?.data?.status === "friends" ? "Friend" : "Add Friend");
            }
        }
    }, [idUserPrimary.id, token, fetchPosts]);

    const fetchFriend = useCallback(async (page) => {
        const res = await getFriendsServices(page, 5, token);
        if (res?.data?.content.length > 0) {
            setFriends(prev => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
        }
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        setUser(null);
        setPostsUser([]);
        setFriends([]);
        setCurrentPage(0);
        fetchUser(userId);
    }, [userId, fetchUser]);

    useScroll(() => {
        setCurrentPage(prev => prev + 1);
    });

    useEffect(() => {
        if (option === "Post") {
            fetchPosts(userId, currentPage);
        } else if (option === "Friends") {
            fetchFriend(currentPage);
        }
    }, [currentPage, option, userId, fetchPosts, fetchFriend]);

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
                <Image src={user?.img || images.avatar} className={cx("avatar")} alt="" />
                <div className={cx("fullname")}>{user?.name}</div>
                {userPrimary ? (
                    <div className={cx("action")}>
                        <Button onClick={() => handleOptionChange("Post")} primary={option === "Post"}>Post</Button>
                        <Button onClick={() => handleOptionChange("Friends")} primary={option === "Friends"}>Friends</Button>
                    </div>
                ) : (
                    <div className={cx("action")}>
                        <Button onClick={handleAddFriend} primary>{statusFriend}</Button>
                        <Button onClick={toggleChat} normal>Chat</Button>
                    </div>
                )}
            </div>
            <div className={cx("body")}>
                {option === "Post" ? (
                    postsUser.map((post) => (
                        <Post show={post.show} profile key={post.id} data={post} />
                    ))
                ) : (
                    <div className={cx("list")}>{friendList}</div>
                )}
            </div>
        </div>
    );
}

export default Profile;
