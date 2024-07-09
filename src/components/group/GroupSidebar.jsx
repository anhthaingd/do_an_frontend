import React, { useEffect, useState } from "react";
import { getMemberByUserID } from "../../apis/memberApi";
import { useNavigate } from "react-router-dom";

const GroupSidebar = ({ isOpen, onClose, dropdownRef }) => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userId");
  const [groups, setGroups] = useState([]); // [1]
  const fetchGroups = async () => {
    try {
      const response = await getMemberByUserID(userID);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div
      ref={dropdownRef}
      className={`absolute top-12 right-0 mt-5 z-30 w-80 bg-gray-700 text-white rounded-lg shadow-lg transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">Nhóm của tôi</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✖
        </button>
      </div>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
        {/* <input
          type="text"
          placeholder="Tìm kiếm nhóm"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        /> */}
        <div className="flex justify-end mb-2">
          <p
            className="text-blue-300 cursor-pointer hover:text-red-100"
            onClick={() => navigate("/groups")}
          >
            Tất cả nhóm
          </p>
        </div>
        <div className="mt-4">
          {groups?.map((group, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-700"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  navigate(`/group/${group.group.id}`);
                  onClose();
                }}
              >
                <img
                  src={group.group.image}
                  alt="a"
                  className="w-12 h-12 ml-1 mr-3 rounded-full"
                />
                <div className="font-bold">{group.group.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupSidebar;
