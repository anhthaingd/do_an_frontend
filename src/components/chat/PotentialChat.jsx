import React from "react";
import avatar from "../../images/avatar.jpg";
const PotentialChat = ({ user }) => {
  return (
    <div>
      <div className="relative w-16 ">
        <img src={avatar} alt="" className="w-10 rounded-full" />
        {user.username}
        <span className="user-online right-6"></span>
      </div>
    </div>
  );
};

export default PotentialChat;
