import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ListGroup from "../components/group/ListGroup";
import MyGroup from "../components/group/MyGroup";
import { getAllGroup } from "../apis/groupApi";
import { getMemberByUserID } from "../apis/memberApi";

const AllGroup = () => {
  const [listGroup, setListGroup] = useState([]);
  const [myGroup, setMyGroup] = useState([]);
  const userID = localStorage.getItem("userId");
  const fetchGroup = async () => {
    try {
      const response = await getAllGroup();
      setListGroup(response.data);
    } catch (error) {
      console.error("Fetch group error: ", error);
    }
  };
  const fetchMyGroup = async () => {
    try {
      const response = await getMemberByUserID(userID);
      setMyGroup(response.data);
    } catch (error) {
      console.error("Fetch group error: ", error);
    }
  };
  const notMyGroup = listGroup.filter(
    (group) => !myGroup.some((myGrp) => myGrp.groupID === group.id)
  );
  const groupOfMe = listGroup.filter((group) =>
    myGroup.some((myGrp) => myGrp.groupID === group.id)
  );
  useEffect(() => {
    fetchGroup();
    fetchMyGroup();
  }, []);
  const items = [
    {
      key: "1",
      label: "Khám phá",
      children: "a",
      content: <ListGroup groups={notMyGroup} />,
    },
    {
      key: "2",
      label: "Nhóm của tôi",
      children: "a",
      content: <MyGroup groups={groupOfMe} />,
    },
  ];
  return (
    <div>
      <div className="min-h-[513px] ">
        <Tabs defaultActiveKey="1" tabPosition={"left"}>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AllGroup;
