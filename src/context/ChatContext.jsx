import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
const { io } = require("socket.io-client");
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { loginUserInfo } = useContext(AuthContext);
  const [guest, setGuest] = useState();
  const [messages, setMessages] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // [1, 2, 3, 4, 5
  const loginUserID = parseInt(localStorage.getItem("userId"));
  const [newMessage, setNewMessage] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:2000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [loginUserID]);
  // user online
  useEffect(() => {
    if (socket === null && loginUserID === null) return;

    if (loginUserID !== null) {
      socket?.emit("addNewUser", loginUserID);
    }
    socket?.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket?.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendMessage", {
      newMessage,
      senderID: loginUserID,
      receiverID: guest?.id,
    });
  }, [newMessage]);
  // receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      console.log("guest", guest?.id);
      console.log("sender", res.newMessage.senderID);
      if (guest?.id !== res.newMessage.senderID) return;
      // console.log(res.newMessage.senderID);
      setMessages((prev) => [...prev, res.newMessage]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        guest,
        setGuest,
        isChange,
        setIsChange,
        onlineUsers,
        newMessage,
        setNewMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
