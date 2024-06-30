// src/components/ProfileHeader.js
import React, { useEffect, useRef, useState } from "react";
import avatar from "../../images/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../apis/userApi";
import ChatModal from "../../components/modal/ChatModal";
import { io } from "socket.io-client";
const ProfileHeader = () => {
  const userID = useParams().id;
  const loginUserID = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);

  const buttonRef = useRef(null);
  const handleSend = (message) => {
    setSentMessages([...sentMessages, message]);
    setModalOpen(false);
  };

  const navigate = useNavigate();
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
        <div>
          <button className=" text-white rounded flex gap-2">
            {loginUserID == userID ? (
              ""
            ) : (
              <div>
                <p
                  ref={buttonRef}
                  className="bg-blue-500 p-2 rounded text-white cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  Nhắn tin
                </p>
                <ChatModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  onSend={handleSend}
                  buttonRef={buttonRef}
                />
              </div>
            )}
            {loginUserID == userID ? (
              <p
                className="bg-gray-300 p-2 rounded text-black"
                onClick={() => navigate(`/profile/${userID}/about/overview`)}
              >
                {" "}
                Chỉnh sửa trang cá nhân
              </p>
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
