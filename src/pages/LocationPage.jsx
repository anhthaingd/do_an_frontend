import { Radio, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import LocationDetail from "./LocationDetail";
import ListMatch from "../components/ListMatch";

const LocationPage = () => {
  const items = [
    {
      key: "1",
      label: "Thông tin sân",
      children: "a",
      content: <LocationDetail />,
    },
    {
      key: "2",
      label: "Sân đã được đặt",
      children: "Content of Tab Pane 2",
      content: <ListMatch />, // Component cho nội dung tab 2
    },
  ];
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <div className=" ">
      <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
        {items.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.key}>
            {item.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default LocationPage;
