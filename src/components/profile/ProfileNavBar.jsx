// src/components/NavBar.js
import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";

const ProfileNavBar = ({ userId }) => {
  const id = useParams().id;
  return (
    <div className=" p-2 flex gap-5">
      <NavLink
        to={`/profile/${id}`}
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 border-b-blue-500 border-b" : ""
          }`
        }
      >
        Bài viết
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 border-b-blue-500 border-b" : ""
          }`
        }
        to={`/profile/${id}/about`}
        end={false}
      >
        Giới thiệu
      </NavLink>
      <NavLink
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 border-b-blue-500 border-b" : ""
          }`
        }
        to={`/profile/${id}/history`}
      >
        Lịch sử thi đấu
      </NavLink>
    </div>
  );
};

export default ProfileNavBar;
