import React from "react";
import avatar from "../../images/avatar.jpg";
const ListMember = ({ listMember, group }) => {
  const owner = listMember.find((member) => member.userID === group.ownerID);
  const nonOwners = listMember.filter(
    (member) => member.userID !== group.ownerID
  );
  console.log(nonOwners);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded w-3/4">
        <div className="p-2">
          <span className="text-lg font-semibold ">Thành viên・</span>
          <span className="text-gray-500 font-medium text-lg">
            {listMember.length}
          </span>
        </div>
        <div className="p-3 border-b-gray-300 border-b-2 mx-2">
          <input
            type="text"
            placeholder="Tìm kiếm thành viên"
            className="w-full p-2  rounded bg-gray-500 text-white focus:outline-none"
          />
        </div>
        <div className="p-2">
          <p className="text-base font-medium">Quản trị viên</p>
          <div className="pt-4 flex items-center pl-2">
            <img src={avatar} className="w-12 rounded-full" alt="" />
            <p className="ml-3">{owner.user.username}</p>
          </div>
        </div>
        <div className="p-2">
          <p className="text-base font-medium">Thành viên khác</p>
          <div className="pt-4  items-center pl-2">
            {nonOwners.map((member, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 flex items-center pb-2"
              >
                <img src={avatar} className="w-12 rounded-full" alt="" />
                <p className="ml-3">{member.user.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMember;
