import React, { useEffect, useState } from "react";
import {
  getInformation,
  updateInformation,
} from "../../../apis/informationApi";
import { getUserById } from "../../../apis/userApi";
import { useParams } from "react-router-dom";
import {
  EditOutlined,
  HomeOutlined,
  PlusCircleTwoTone,
  ShoppingOutlined,
} from "@ant-design/icons";

const Job = () => {
  const { id: userID } = useParams();
  const loginUserID = localStorage.getItem("userId");
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [base, setBase] = useState({});
  const [workPlace, setWorkPlace] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [university, setUniversity] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const isCurrentUser = userID === loginUserID;

  const fetchUser = async () => {
    const response = await getInformation(userID);
    setUserInfo(response.data);
  };

  const baseInfo = async () => {
    const response = await getUserById(userID);
    setBase(response.data);
  };

  const updateUserInfo = async (field, newValue) => {
    const updatedUserInfo = { ...userInfo, [field]: newValue };
    setUserInfo(updatedUserInfo);
    await updateInformation(loginUserID, updatedUserInfo);
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
    baseInfo();
  }, []);
  return (
    <div>
      <div>
        <p className="text-lg font-semibold">Công việc</p>
        {userInfo?.workplace ? (
          <div className="flex justify-between items-center pl-4 pt-5">
            <div className="flex items-center text-gray-500">
              <div>
                <ShoppingOutlined style={{ fontSize: "20px" }} />
              </div>
              <p className="ml-2">Làm việc tại {userInfo?.workplace}</p>
            </div>
            {isCurrentUser && (
              <div
                className="cursor-pointer"
                onClick={() => setShowInput(!showInput)}
              >
                <EditOutlined style={{ fontSize: "20px" }} />
              </div>
            )}
          </div>
        ) : isCurrentUser ? (
          <div
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pl-4 pt-2"
            onClick={() => setShowInput(!showInput)}
          >
            <PlusCircleTwoTone />
            <h2 className="ml-2 text-blue-500 ">Thêm nơi làm việc</h2>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 pl-4 pt-2">
            <ShoppingOutlined style={{ fontSize: "20px" }} />
            <p className="ml-2">Không có nơi làm việc để hiển thị</p>
          </div>
        )}
        {showInput && isCurrentUser && (
          <div className="mt-4">
            <input
              type="text"
              value={workPlace}
              placeholder="Nhập địa điểm"
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setWorkPlace(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowInput(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  updateUserInfo("workplace", workPlace);
                  setShowInput(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold pt-5">Trung học </p>
        {userInfo?.highSchool ? (
          <div className="flex justify-between items-center pt-5 pl-4">
            <div className="flex items-center text-gray-500">
              <div>
                <HomeOutlined style={{ fontSize: "20px" }} />
              </div>
              <p className="ml-2">Học tại {userInfo?.highSchool}</p>
            </div>
            {isCurrentUser && (
              <div
                className="cursor-pointer"
                onClick={() => setShowInput1(!showInput1)}
              >
                <EditOutlined style={{ fontSize: "20px" }} />
              </div>
            )}
          </div>
        ) : isCurrentUser ? (
          <div
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5 pl-4"
            onClick={() => setShowInput1(!showInput1)}
          >
            <PlusCircleTwoTone />
            <h2 className="ml-2 text-blue-500 ">Thêm trường trung học</h2>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 pt-5 pl-4">
            <div>
              <HomeOutlined style={{ fontSize: "20px" }} />
            </div>
            <p className="ml-2">Không có trường trung học để hiển thị</p>
          </div>
        )}
        {showInput1 && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Trường học"
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setHighSchool(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowInput1(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  updateUserInfo("highSchool", highSchool);
                  setShowInput1(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold pt-5">Đại học</p>
        {userInfo?.university ? (
          <div className="flex justify-between items-center pt-5 pl-4">
            <div className="flex items-center text-gray-500">
              <div>
                <HomeOutlined style={{ fontSize: "20px" }} />
              </div>
              <p className="ml-2">Học tại {userInfo?.university}</p>
            </div>
            {isCurrentUser && (
              <div
                className="cursor-pointer"
                onClick={() => setShowInput2(!showInput2)}
              >
                <EditOutlined style={{ fontSize: "20px" }} />
              </div>
            )}
          </div>
        ) : isCurrentUser ? (
          <div
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5 pl-4"
            onClick={() => setShowInput2(!showInput2)}
          >
            <PlusCircleTwoTone />
            <h2 className="ml-2 text-blue-500 ">
              Thêm trường cao đẳng/đại học
            </h2>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 pt-5 pl-4">
            <div>
              <HomeOutlined style={{ fontSize: "20px" }} />
            </div>
            <p className="ml-2">Không có trường cao đẳng/đại học để hiển thị</p>
          </div>
        )}
        {showInput2 && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Trường học"
              className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setUniversity(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowInput2(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  updateUserInfo("university", university);
                  setShowInput2(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;
