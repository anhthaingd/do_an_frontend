// src/components/LivingPlace.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInformation,
  updateInformation,
} from "../../../apis/informationApi";
import {
  EditOutlined,
  GlobalOutlined,
  HomeOutlined,
  PhoneFilled,
  PlusCircleTwoTone,
  ShoppingOutlined,
} from "@ant-design/icons";
import { getUserById } from "../../../apis/userApi";
import {
  getGeocodingByInput,
  getGeocodingByPlaceId,
} from "../../../apis/mapApi";
const LivingPlace = () => {
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
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const isCurrentUser = userID === loginUserID;
  const [predictions, setPredictions] = useState([]);
  const [predictions1, setPredictions1] = useState([]);
  const fetchUser = async () => {
    const response = await getInformation(userID);
    setUserInfo(response.data);
  };

  const baseInfo = async () => {
    const response = await getUserById(userID);
    setBase(response.data);
  };
  const handleSaveAddress = async () => {
    const updatedInfo = {
      address,
      province,
      district,
      ward,
    };

    try {
      await updateUserInfo(updatedInfo);
      setShowInput3(false);
    } catch (error) {
      console.error("Failed to update user information:", error);
      alert("Failed to update user information. Please try again later.");
    }
  };
  const handleInput = async (e) => {
    setAddress(e.target.value);
    try {
      const response = await getGeocodingByInput({ input: e.target.value });
      if (response.status === "OK") {
        setPredictions(response.predictions);
      }
      // console.log(response);
    } catch (error) {}
  };
  const handleInputHomeTown = async (e) => {
    setHomeTown(e.target.value);
    try {
      const response = await getGeocodingByInput({ input: e.target.value });
      if (response.status === "OK") {
        setPredictions1(response.predictions);
      }
      // console.log(response);
    } catch (error) {}
  };
  const handleClickHomeTown = async (place) => {
    setHomeTown(place.description);
    setPredictions1([]);
  };
  const handleClickPlace = async (place) => {
    setAddress(place.description);
    const response = await getGeocodingByPlaceId({ placeId: place.place_id });
    if (response.status === "OK") {
      setProvince(response.result.compound.province);
      setDistrict(response.result.compound.district);
      setWard(response.result.compound.commune);
      // setLat(response.result.geometry.location.lat);
      // setLng(response.result.geometry.location.lng);
      // setViewport((prev) => {
      //   return {
      //     ...prev,
      //     latitude: response.result.geometry.location.lat,
      //     longitude: response.result.geometry.location.lng,
      //     zoom: 16,
      //   };
      // });
    }
    setPredictions([]);
  };

  const updateUserInfo = async (updatedInfo) => {
    const updatedUserInfo = { ...userInfo, ...updatedInfo };
    setUserInfo(updatedUserInfo);
    try {
      await updateInformation(loginUserID, updatedUserInfo);
      fetchUser();
    } catch (error) {
      console.error("Failed to update user information:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
    baseInfo();
  }, []);
  return (
    <div>
      <p className="text-lg font-semibold">Nơi từng sống</p>
      {userInfo?.address ? (
        <div className="flex justify-between items-center pt-5 pl-4">
          <div className="flex items-center text-gray-500">
            <GlobalOutlined style={{ fontSize: "20px" }} />
            <p className="ml-2">Sống tại {userInfo?.address}</p>
          </div>
          {isCurrentUser && (
            <div
              className="cursor-pointer"
              onClick={() => setShowInput3(!showInput3)}
            >
              <EditOutlined style={{ fontSize: "20px" }} />
            </div>
          )}
        </div>
      ) : isCurrentUser ? (
        <div
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5 pl-4"
          onClick={() => setShowInput3(!showInput3)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm tỉnh/thành phố hiện tại</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5 pl-4">
          <GlobalOutlined style={{ fontSize: "20px" }} />
          <p className="ml-2">Không có tỉnh/thành phố hiện tại để hiển thị</p>
        </div>
      )}
      {showInput3 && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Tỉnh/Thành phố hiện tại"
            className="border border-gray-300 p-2 rounded w-full"
            onChange={handleInput}
            value={address}
          />
          <div className="absolute z-50 bg-white border border-gray-300">
            {predictions.length > 0 &&
              predictions.map((item) => {
                return (
                  <div
                    key={item.place_id}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleClickPlace(item)}
                  >
                    {item.description}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowInput3(false)}
            >
              Hủy
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSaveAddress}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
      {userInfo?.homeTown ? (
        <div className="flex justify-between items-center pt-5 pl-4">
          <div className="flex items-center text-gray-500">
            <GlobalOutlined style={{ fontSize: "20px" }} />
            <p className="ml-2">Quê quán {userInfo?.homeTown}</p>
          </div>
          {isCurrentUser && (
            <div
              className="cursor-pointer"
              onClick={() => setShowInput4(!showInput4)}
            >
              <EditOutlined style={{ fontSize: "20px" }} />
            </div>
          )}
        </div>
      ) : isCurrentUser ? (
        <div
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5 pl-4"
          onClick={() => setShowInput4(!showInput4)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm quê quán</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5 pl-4">
          <GlobalOutlined style={{ fontSize: "20px" }} />
          <p className="ml-2">Không có quê quán để hiển thị</p>
        </div>
      )}
      {showInput4 && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Quê quán"
            className="border border-gray-300 p-2 rounded w-full"
            onChange={handleInputHomeTown}
            value={homeTown}
          />
          <div className="absolute z-50 bg-white border border-gray-300">
            {predictions1.length > 0 &&
              predictions1.map((item) => {
                return (
                  <div
                    key={item.place_id}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleClickHomeTown(item)}
                  >
                    {item.description}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowInput4(false)}
            >
              Hủy
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                updateUserInfo({ homeTown });
                setShowInput4(false);
              }}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivingPlace;
