import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMatch } from "../../apis/matchApi";

const Notification = ({
  isOpenNoti,
  onCloseNoti,
  dropdownRefNoti,
  listMatch,
  fetchNotification,
}) => {
  console.log(listMatch);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userId");
  const [groups, setGroups] = useState([]);
  const handleOk = async (match) => {
    await updateMatch(match?.id, { status: 4 });
    fetchNotification();
  };
  const handleRefuse = async (match) => {
    await updateMatch(match?.id, { opponentID: null, status: 1 });
    fetchNotification();
  };
  return (
    <div
      ref={dropdownRefNoti}
      className={`absolute top-12 right-0 mt-5 z-30 w-80 bg-gray-700 text-white rounded-lg shadow-lg transition-all duration-300 ${
        isOpenNoti ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="pl-4 pr-4 pt-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">Thông báo</h2>
        <button
          onClick={onCloseNoti}
          className="text-gray-400 hover:text-white"
        >
          ✖
        </button>
      </div>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
        <div className="mt-4">
          {listMatch?.map((match, index) => (
            <div key={index} className="py-2 border-b border-gray-700">
              <div>
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={() => navigate(`/profile/${match?.opponentID}`)}
                >
                  {match?.opponent?.username}
                </span>
                <span> muốn thách đấu với bạn</span>
              </div>
              <div className="">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleOk(match)}
                >
                  Đồng ý
                </button>
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleRefuse(match)}
                >
                  Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
