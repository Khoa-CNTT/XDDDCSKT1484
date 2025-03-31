import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [isOpenChat, setIsOpenChat] = useState(false);

    const toggleChat = () => {
        setIsOpenChat((prev) => !prev);
    };

    return (
        <ChatContext.Provider value={{ isOpenChat, setIsOpenChat, toggleChat }}>
            {children}
        </ChatContext.Provider>
    );
};
