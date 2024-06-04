import React, { useContext, useEffect, useState } from "react";
import { getRoomByUserID } from "../../apis/roomApi";
import { getUserById } from "../../apis/userApi";
import PotentialChat from "./PotentialChat";
import ChatCard from "./ChatCard";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ rooms, fetchUser }) => {
  const usersList = rooms.map((room) => getUserById(room.receiverID));
  useEffect(() => {}, []);
  return (
    <div>
      <div className="flex gap-2">
        {rooms?.map((item, index) => {
          return (
            <div key={index} className="">
              <PotentialChat guest={item.receiver} />
            </div>
          );
        })}
      </div>
      <div>
        {rooms?.map((item, index) => {
          return (
            <div key={index} className="">
              <ChatCard
                guest={item.receiver}
                room={item}
                fetchUser={fetchUser}
                
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserChat;
