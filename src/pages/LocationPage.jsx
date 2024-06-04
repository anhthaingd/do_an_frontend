import { Radio, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import LocationDetail from "./LocationDetail";
import ListMatch from "../components/ListMatch";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

const LocationPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const locationID = useParams().id;

  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  useEffect(() => {}, [activeTab]);
  return (
    <div className="h-3/4  min-h-[513px] flex" style={{}}>
      <div className=" flex flex-col p-2" style={{ width: "200px" }}>
        <NavLink
          end
          className={({ isActive }) =>
            `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 ${
              isActive ? "text-blue-500" : ""
            }`
          }
          to={"/location/" + locationID}
        >
          Thông tin sân
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-500 ${
              isActive ? "text-blue-500" : ""
            }`
          }
          to={"/location/" + locationID + "/booking"}
        >
          Sân đã đặt{" "}
        </NavLink>
      </div>
      <div className="w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default LocationPage;
