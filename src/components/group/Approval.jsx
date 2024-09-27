import React from "react";
import avatar from "../../images/avatar.jpg";
import { useNavigate } from "react-router-dom";
import { deleteMember, updateMember } from "../../apis/memberApi";
const Approval = ({ listMember, group, fetchCountMember }) => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userId");
  const handleOk = async (id) => {
    const res = await updateMember(id);
    fetchCountMember();
  };
  const handleRefuse = async (id) => {
    const data = {
      userID: id,
      groupID: group?.id,
    };
    console.log(data);
    const res = await deleteMember(data);
    fetchCountMember();
  };
  return (
    <div className="pb-2 min-h-[50px]">
      {listMember.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-3 border-2 border-red-300 rounded-md mb-2"
        >
          <div className="flex items-center">
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <p
              className="ml-3 cursor-pointer hover:text-blue-500"
              onClick={() => navigate(`/profile/${member?.user?.id}`)}
            >
              {member?.user?.username}
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white rounded-lg p-1"
              onClick={() => handleOk(member?.id)}
            >
              Chấp nhận
            </button>
            <button
              className="bg-red-500 text-white rounded-lg p-1 ml-2"
              onClick={() => handleRefuse(member?.user?.id)}
            >
              Từ chối
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Approval;
