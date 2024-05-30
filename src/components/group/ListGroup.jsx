import React, { useEffect, useState } from "react";
import GroupCard from "../cards/GroupCard";
import { getAllGroup } from "../../apis/groupApi";

const ListGroup = ({ groups }) => {
  useEffect(() => {}, []);
  return (
    <div className="grid grid-cols-4 gap-4 pt-2 pb-4">
      {groups.map((item, index) => {
        return (
          <div
            key={index}
            className="border-2 border-gray-400 rounded-md"
            style={{ zIndex: 20 }}
          >
            <GroupCard group={item} isMyGroup={false} />
          </div>
        );
      })}
    </div>
  );
};

export default ListGroup;
