import React, { useContext } from "react";
import avatar from "../../images/avatar.jpg";
import { ChatContext } from "../../context/ChatContext";
const PotentialChat = ({ guest }) => {
  const { onlineUsers } = useContext(ChatContext);
  return (
    <div>
      <div className="relative w-16 ">
        <img src={avatar} alt="" className="w-10 rounded-full" />
        {guest?.username}
        <span
          className={
            onlineUsers?.some((user) => user?.userID === guest?.id)
              ? "user-online right-6"
              : ""
          }
        ></span>
      </div>
    </div>
  );
};

export default PotentialChat;
