import classNames from "classnames/bind";
import styles from './ChatPopup.module.scss';
import Button from "~/components/Button";
import Image from "~/components/Image";
import images from "~/assets/images";
import { useContext } from "react";
import { ChatContext } from "~/context/ChatContext";
import { AddChatIcon, CloseIcon, DownIcon, SendIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function ChatPopup() {
    const { isOpenChat, toggleChat } = useContext(ChatContext);

    return (
        <div>
            {isOpenChat && (
                <div className={cx('wrapper')}>
                    <div className={cx('nav')}>
                        <div className={cx('nav-header')}>
                            <Image src={images.logo} className={cx('logo-chat')} />
                            <h3 className={cx('title-chat')}>Chats</h3>
                            <Button leftIcon={<AddChatIcon />} />
                        </div>
                        <div className={cx('nav-body')}></div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            <div>
                                <h4 className={cx('fullname-chat')}>vanloi2003</h4>
                            </div>
                            <div>
                                <Button leftIcon={<DownIcon />} />
                                <Button onClick={toggleChat} leftIcon={<CloseIcon />} />
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            <div className={cx('view-chat')}></div>
                            <div className={cx('box-chat')}>
                                <input type="text" placeholder="Message" />
                                <Button leftIcon={<SendIcon />} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPopup;