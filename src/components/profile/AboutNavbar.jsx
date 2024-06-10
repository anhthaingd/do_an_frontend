// src/components/Navbar.js
import React from "react";
import { NavLink, useParams } from "react-router-dom";

const AboutNavbar = ({ userInfo }) => {
  const id = useParams().id;
  return (
    <div className="flex flex-col bg-gray-100 rounded  p-4">
      <p className="text-xl font-semibold">Giới thiệu</p>
      <NavLink
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 " : ""
          }`
        }
        to={`/profile/${id}/about/overview`}
      >
        Tổng quan
      </NavLink>
      <NavLink
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 " : ""
          }`
        }
        to={`/profile/${id}/about/job`}
      >
        Công việc và học vấn
      </NavLink>
      <NavLink
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 " : ""
          }`
        }
        to={`/profile/${id}/about/living`}
      >
        Nơi từng sống
      </NavLink>
      <NavLink
        end
        className={({ isActive }) =>
          `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 rounded ${
            isActive ? "text-blue-500 " : ""
          }`
        }
        to={`/profile/${id}/about/contact`}
      >
        Liên hệ và cơ bản
      </NavLink>
    </div>
  );
};

export default AboutNavbar;
