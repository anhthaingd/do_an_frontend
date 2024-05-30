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
const Chat = () => {
  const { guest, isChange, setMessages } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const loginUserID = parseInt(localStorage.getItem("userId"), 10);
  const inboxHash1 = `${loginUserID}-${guest?.id}`;
  const inboxHash2 = `${guest?.id}-${loginUserID}`;
  const userID = localStorage.getItem("userId");
  const [rooms, setRooms] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await getRoomByUserID(userID);
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
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
          receiverID: guest.id,
          message: inputValue,
        });
      } catch (error) {}
      fetchMessage();
      fetchUser();
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
        receiverID: guest.id,
        message: inputValue,
      });
      fetchMessage();
      fetchUser();
      setInputValue("");
    } catch (error) {}
    setInputValue("");
  };
  useEffect(() => {
    fetchUser();
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
          <UserChat rooms={rooms} fetchUser={fetchUser} />
        </div>
        <div className="w-2/3 p-5  pt-2 ">
          <div className="flex items-center pb-2 ">
            <img src={avatar} alt="" className="w-10 rounded-full mr-1" />
            <p className="text-xl font-semibold ">{guest?.username}</p>
          </div>
          <div className="h-full overflow-y-auto" style={{ height: "430px" }}>
            <ChatBox />
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
      </div>
    </div>
  );
};

export default Chat;
