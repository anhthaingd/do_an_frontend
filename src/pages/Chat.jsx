import React, { useContext, useEffect, useState } from "react";
import ChatBox from "../components/chat/ChatBox";
import UserChat from "../components/chat/UserChat";
import "../Css/Chat.css";
import { ChatContext } from "../context/ChatContext";
import avatar from "../images/avatar.jpg";
import send from "../images/send.png";
import Header from "../components/generalScreen/Header";
import SubHeader from "../components/generalScreen/SubHeader";
import { getMessageInboxHash, sendMessage } from "../apis/chatApi";
import { getRoomByUserID } from "../apis/roomApi";
import { Outlet } from "react-router-dom";
const Chat = () => {
  const { guest, isChange, setMessages, setNewMessage, rooms, setRooms } =
    useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const loginUserID = parseInt(localStorage.getItem("userId"), 10);
  const inboxHash1 = `${loginUserID}-${guest?.id}`;
  const inboxHash2 = `${guest?.id}-${loginUserID}`;
  const userID = localStorage.getItem("userId");

  const fetchMessage = async () => {
    try {
      let response = await getMessageInboxHash({
        inboxHash: inboxHash2,
      });
      if (!response.data || response.data.length === 0) {
        // If no data with the first inbox hash, try with the second
        response = await getMessageInboxHash({
          senderID: guest?.id,
          inboxHash: inboxHash1,
        });
      }
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      try {
        const response = await sendMessage({
          senderID: loginUserID,
          receiverID: guest.id,
          message: inputValue,
        });
        setNewMessage(response.data);
        // setMessages((prev) => [...prev, response.data]);
      } catch (error) {}
      fetchMessage();
      // fetchUser();
      setInputValue("");
    }
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const fetchUser = async () => {
    try {
      const response = await getRoomByUserID(loginUserID);
      console.log(response.data);
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await sendMessage({
        senderID: loginUserID,
        receiverID: guest.id,
        message: inputValue,
      });
      setNewMessage(response.data);
      // setMessages((prev) => [...prev, response.data]);
      fetchMessage();
      // fetchUser();
      setInputValue("");
    } catch (error) {}
    setInputValue("");
  };
  useEffect(() => {
    // fetchUser();
  }, []);
  return (
    <div className=" ">
      <Header />
      <SubHeader />
      <div className="flex h-full">
        <div
          className="w-1/3 p-5 border border-r-gray-400"
          style={{ maxHeight: "500px" }}
        >
          <UserChat rooms={rooms} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
