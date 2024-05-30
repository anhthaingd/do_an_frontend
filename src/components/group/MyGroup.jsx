import React from "react";
import GroupCard from "../cards/GroupCard";

const MyGroup = ({ groups }) => {
  return (
    <div className="grid grid-cols-4 gap-4 pt-2 pb-4">
      {groups.map((item, index) => {
        return (
          <div
            key={index}
            className="border-2 border-gray-400 rounded-md"
            style={{ zIndex: 20 }}
          >
            <GroupCard group={item} isMyGroup={true} />
          </div>
        );
      })}
    </div>
  );
};

export default MyGroup;
