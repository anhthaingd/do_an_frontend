import React, { useState } from "react";
import Header from "../components/generalScreen/Header";
import Footer from "../components/generalScreen/Footer";
import { Tabs } from "antd";
import ManageUser from "../components/admin/ManageUser";
import ManageLocation from "../components/admin/ManageLocation";

const AdminPage = () => {
  const items = [
    {
      key: "1",
      label: "Quản lý người dùng",
      children: "a",
      content: <ManageUser type={0} />,
    },
    {
      key: "3",
      label: "Quản lý chủ sân",
      children: "a",
      content: <ManageUser type={1} />,
    },
    {
      key: "2",
      label: "Quản lý sân",
      children: "Content of Tab Pane 2",
      content: <ManageLocation />, // Component cho nội dung tab 2
    },
  ];
  return (
    <div>
      <Header />
      <div className=" min-h-[568px]">
        <Tabs defaultActiveKey="1" tabPosition={"left"}>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
