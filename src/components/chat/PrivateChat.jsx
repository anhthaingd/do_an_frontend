import React, { useContext, useEffect, useState } from "react";
import { getMessageInboxHash, sendMessage } from "../../apis/chatApi";
import { ChatContext } from "../../context/ChatContext";
import ChatBox from "./ChatBox";
import avatar from "../../images/avatar.jpg";
import send from "../../images/send.png";
import { useParams } from "react-router-dom";
import { getRoomByID } from "../../apis/roomApi";
const PrivateChat = () => {
  const roomID = useParams().id;
  const {
    guest,
    isChange,
    setMessages,
    setNewMessage,
    rooms,
    setCurrentChat,
    currentChat,
    setRooms,
  } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const loginUserID = parseInt(localStorage.getItem("userId"), 10);
  const inboxHash1 = `${loginUserID}-${guest?.id}`;
  const inboxHash2 = `${guest?.id}-${loginUserID}`;
  const userID = localStorage.getItem("userId");

  const fetchCurrentInbox = async () => {
    const response = await getRoomByID(roomID);
    setCurrentChat(response.data);
    const { room } = response.data;
    setRooms((prev) => {
      const newRooms = [...prev];
      const index = newRooms.findIndex((item) => item.id === room.id);
      if (index !== -1) {
        newRooms[index] = room;
      } else {
        newRooms.push(room);
      }
      // return newRooms.sort(
      //   (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      // );
      return newRooms;
    });
  };

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
          receiverID: currentChat?.room?.receiverID,
          message: inputValue,
        });
        setNewMessage(response.data);
        // setMessages((prev) => [...prev, response.data]);
      } catch (error) {}
      //   fetchMessage();
      // fetchUser();
      setInputValue("");
    }
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await sendMessage({
        senderID: loginUserID,
        receiverID: currentChat?.room?.receiverID,
        message: inputValue,
      });
      setNewMessage(response.data);
      // setMessages((prev) => [...prev, response.data]);
      //   fetchMessage();
      // fetchUser();
      setInputValue("");
    } catch (error) {}
    setInputValue("");
  };
  useEffect(() => {
    fetchCurrentInbox();
  }, [roomID]);
  return (
    <div className="w-2/3 p-5  pt-2 ">
      <div className="flex items-center pb-2 ">
        <img src={avatar} alt="" className="w-10 rounded-full mr-1" />
        <p className="text-xl font-semibold ">
          {currentChat?.room?.receiver?.username}
        </p>
      </div>
      <div className="h-full overflow-y-auto" style={{ height: "430px" }}>
        <ChatBox messages={currentChat?.messages} />
      </div>
      <div>
        <div className="w-full flex justify-center items-center content-center bg-gray-900 p-2">
          <input
            type="text"
            value={inputValue}
            placeholder="Nhập tin nhắn"
            style={{ outline: "none" }}
            className=" bg-gray-500 w-3/4 p-2 rounded-full text-white"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          {inputValue !== "" ? (
            <img
              src={send}
              alt=""
              className="w-6 h-6 ml-5 cursor-pointer"
              onClick={handleSubmit}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
