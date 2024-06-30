import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../apis/userApi";
import { getMemberByUserID } from "../../../apis/memberApi";
import GroupCard from "../../cards/GroupCard";

const Contact = () => {
  const userID = useParams().id;
  const [base, setBase] = useState({});
  const [myGroup, setMyGroup] = useState([]);
  const fetchUser = async () => {
    const response = await getUserById(userID);
    setBase(response.data);
  };
  const fetchMyGroup = async () => {
    try {
      const response = await getMemberByUserID(userID);
      setMyGroup(response.data);
    } catch (error) {
      console.error("Fetch group error: ", error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchMyGroup();
  }, []);
  return (
    <div>
      <p className="text-lg font-semibold">Thông tin liên hệ</p>
      <div className="flex items-center pt-4">
        <PhoneFilled
          style={{ fontSize: "30px" }}
          className="text-gray-500 mr-2"
        />
        <div>
          <p className="text-sm">{base?.phone ? base?.phone : "Không có"}</p>
          <p className="text-sm">Di động</p>
        </div>
      </div>
      <div className="flex items-center pt-5">
        <MailOutlined
          style={{ fontSize: "30px" }}
          className="text-gray-500 mr-2"
        />
        <div>
          <p className="text-sm">{base?.email ? base?.email : "Không có"}</p>
          <p className="text-sm">Email</p>
        </div>
      </div>
      <p className="text-lg font-semibold pt-5 pb-5">Nhóm đã tham gia</p>
      <div className="grid grid-cols-2 gap-4 pt-2">
        {myGroup.map((item, index) => {
          return (
            <div
              key={index}
              className="border-2 border-gray-400 rounded-md"
              style={{ zIndex: 20 }}
            >
              <GroupCard group={item.group} isMyGroup={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
