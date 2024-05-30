import React, { useEffect, useState } from "react";
import { getMemberByGroupID } from "../../apis/memberApi";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, isMyGroup }) => {
  const [listMember, setListMember] = useState([]);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await getMemberByGroupID(group.id);
      setListMember(response.data);
    } catch (error) {
      console.error("Fetch user error: ", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer"
      onClick={() => navigate(`/group/${group.id}`)}
    >
      <img
        className="w-full h-48 object-cover"
        src={group.image ? group.image : "football.jpg"}
        alt="Group"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{group.name}</h3>
        <p className="text-gray-600 mb-2">
          {listMember.length} thành viên • 3 bài viết/ngày
        </p>
        {/* <p className="text-gray-600 mb-4">Thai người bạn là thành viên</p> */}
        <button className="bg-blue-500 text-white font-semibold py-2 w-full px-4 rounded hover:bg-blue-700">
          {isMyGroup ? "Xem nhóm" : "Tham gia nhóm"}
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
