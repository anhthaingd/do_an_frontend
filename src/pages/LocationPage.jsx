import { Radio, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import LocationDetail from "./LocationDetail";
import ListMatch from "../components/ListMatch";

const LocationPage = () => {
  const [activeTab, setActiveTab] = useState("1");
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
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <div className="h-3/4  min-h-[513px]" style={{  }}>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        tabPosition={tabPosition}
        onChange={handleTabChange}
        className="h-3/4"
      >
        {items.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.key} className="bgOfGroup">
            {item.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default LocationPage;
