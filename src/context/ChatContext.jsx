import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { getRoomByUserID } from "../apis/roomApi";
import { getMessageInboxHash } from "../apis/chatApi";
const { io } = require("socket.io-client");
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { loginUserInfo } = useContext(AuthContext);
  const [guest, setGuest] = useState();
  const [messages, setMessages] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const loginUserID = parseInt(localStorage.getItem("userId"));
  const [newMessage, setNewMessage] = useState(null);
  const [messagesNotSeen, setMessagesNotSeen] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const fetchMessageNotSeen = async (inboxHash1, inboxHash2) => {
    try {
      let response = await getMessageInboxHash({ inboxHash: inboxHash2 });
      if (!response.data || response.data.length === 0) {
        response = await getMessageInboxHash({ inboxHash: inboxHash1 });
      }
      setMessagesNotSeen(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await getRoomByUserID(loginUserID);
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [loginUserID]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const newSocket = io("http://localhost:2000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [loginUserID]);

  // User online
  useEffect(() => {
    if (!socket || !loginUserID) return;

    socket.emit("addNewUser", loginUserID);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, loginUserID]);

  // Send message
  useEffect(() => {
    if (!socket || !newMessage) return;

    socket.emit("sendMessage", {
      newMessage,
      senderID: loginUserID,
      receiverID: currentChat?.room?.receiverID,
    });
  }, [socket, newMessage, loginUserID]);

  // Receive message
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", async (res) => {
      if (guest?.id !== res.senderID) {
        let inboxHash1 = `${res.receiverID}-${res.senderID}`;
        let inboxHash2 = `${res.senderID}-${res.receiverID}`;
        await fetchMessageNotSeen(inboxHash1, inboxHash2);
        setMessagesNotSeen((prev) => [...prev, res.newMessage]);
      } else {
        setMessages((prev) => [...prev, res.newMessage]);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, guest, messagesNotSeen, messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("sendPrivateChat", async (res) => {
      setCurrentChat(res);
      const { room, messages } = res;
      setRooms((prev) => {
        const newRooms = [...prev];
        const index = newRooms.findIndex((item) => item.id === room.id);
        if (index !== -1) {
          newRooms[index] = room;
        } else {
          newRooms.push(room);
        }
        return newRooms.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      });
    });

    return () => {
      socket.off("sendPrivateChat");
    };
  }, [socket]);
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
        rooms,
        currentChat,
        setCurrentChat,
        setRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
