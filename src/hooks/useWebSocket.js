import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const useWebSocket = () => {
  const [notification, setNotification] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }

    const socketUrl = `http://localhost:8080/ws?token=${encodeURIComponent(token)}`;
    const socket = new SockJS(socketUrl);
    const stompClient = Stomp.over(() => socket);

    stompClient.debug = () => { };
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {

      stompClient.subscribe("/user/queue/notifications", (message) => {
        console.log(message.body);

        const notify = JSON.parse(message.body)

        setNotification((prev) => [...prev, notify.message]);
      });
    }, (error) => {
      console.error("WebSocket connection error:", error);
    });

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);

  return { notification };
};

export default useWebSocket;
