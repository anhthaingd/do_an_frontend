// src/components/ProfileHeader.js
import React, { useEffect, useState } from "react";
import avatar from "../../images/avatar.jpg";
import { useParams } from "react-router-dom";
import { getUserById } from "../../apis/userApi";
const ProfileHeader = () => {
  const userID = useParams().id;
  const loginUserID = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const response = await getUserById(userID);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className=" p-4">
      <div className="flex justify-between border-b border-b-gray-400 pb-5">
        {/* <div className="w-20 h-20 bg-gray-400 rounded-full"></div> */}
        <div className="flex items-center">
          <img src={avatar} alt="" className="w-20 rounded-full" />
          <div className="ml-4">
            <h1 className="text-2xl text-black">{user?.username}</h1>
          </div>
        </div>
        <button className=" text-white rounded flex gap-2">
          {loginUserID == userID ? (
            ""
          ) : (
            <p className="bg-blue-500 p-2 rounded text-white"> Nhắn tin</p>
          )}
          <p className="bg-gray-300 p-2 rounded text-black">
            {" "}
            Chỉnh sửa trang cá nhân
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
