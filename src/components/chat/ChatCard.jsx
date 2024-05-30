import React, { useContext, useEffect, useState } from "react";
import avatar from "../../images/avatar.jpg";
import { getMessageInboxHash } from "../../apis/chatApi";
import { ChatContext } from "../../context/ChatContext";
import { updateRoom } from "../../apis/roomApi";
const ChatCard = ({ guest, room, fetchUser }) => {
  const loginUserID = localStorage.getItem("userId");
  const inboxHash1 = `${loginUserID}-${guest.id}`;
  const inboxHash2 = `${guest.id}-${loginUserID}`;
  const { setGuest, setMessages, setIsChange, isChange, onlineUsers } =
    useContext(ChatContext);
  const fetchMessage = async () => {
    try {
      let response = await getMessageInboxHash({
        inboxHash: inboxHash2,
      });
      if (!response.data || response.data.length === 0) {
        // If no data with the first inbox hash, try with the second
        response = await getMessageInboxHash({
          senderID: guest.id,
          inboxHash: inboxHash1,
        });
      }
      setMessages(response.data);
      setGuest(guest);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickChatCard = async () => {
    fetchMessage();
    const response = await updateRoom(room?.id);
    fetchUser();
  };
  useEffect(() => {}, []);
  return (
    <div
      className="user-card cursor-pointer hover:bg-gray-300 rounded"
      onClick={handleClickChatCard}
    >
      <div className="flex pt-5 justify-between">
        <div className="flex">
          <img src={avatar} alt="" className="w-12 h-12 rounded-full mr-1" />
          <div>
            <div className="font-semibold">{guest.username}</div>
            <div
              className={` text-sm ${
                room?.unSeenNumbers > 0
                  ? "text-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              {room?.sentByOwner === false ? (
                <p>{room?.lastMsg}</p>
              ) : (
                <p>Bạn: {room?.lastMsg}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end pb-1">
          <div>12/12/2024</div>
          {room?.unSeenNumbers > 0 ? (
            <span className="this-user-notifications text-white">
              {room?.unSeenNumbers}
            </span>
          ) : (
            ""
          )}
          <span
            className={
              onlineUsers?.some((user) => user?.userID === guest?.id)
                ? "user-online"
                : ""
            }
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
