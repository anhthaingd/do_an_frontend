import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getInformation,
  updateInformation,
} from "../../../apis/informationApi";
import {
  AimOutlined,
  EditOutlined,
  GlobalOutlined,
  HomeOutlined,
  LikeOutlined,
  PhoneFilled,
  PlusCircleTwoTone,
  ShoppingOutlined,
} from "@ant-design/icons";
import { getUserById } from "../../../apis/userApi";
import ChipInput from "material-ui-chip-input";
import {
  createHobby,
  deleteHobby,
  getHobbyByUserID,
} from "../../../apis/hobbyApi";
import {
  createAchievement,
  deleteAchievement,
  getAchievementByUserID,
} from "../../../apis/achievementApi";
import {
  getGeocodingByInput,
  getGeocodingByPlaceId,
} from "../../../apis/mapApi";
const Overview = () => {
  const { id: userID } = useParams();
  const loginUserID = localStorage.getItem("userId");
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [showInput5, setShowInput5] = useState(false);
  const [showInput6, setShowInput6] = useState(false);
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
  const [hobby, setHobby] = useState([]);
  const [currentHobby, setCurrentHobby] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState([]);
  const [achievement, setAchievement] = useState([]);
  const [temp, setTemp] = useState([]);
  const [tempAchievement, setTempAchievement] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [predictions1, setPredictions1] = useState([]);
  const [infoAll, setInfoAll] = useState({
    address: "",
    province: "",
    district: "",
    ward: "",
  });
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
  const fetchUser = async () => {
    const response = await getInformation(userID);
    setUserInfo(response.data);
    setInfoAll(response.data);
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
  const fetchHobby = async () => {
    const response = await getHobbyByUserID(userID);
    setCurrentHobby(response.data);
    let newHobby = [];
    for (let i = 0; i < response.data.length; i++) {
      newHobby.push(response.data[i].name);
    }
    setHobby(newHobby);
    setTemp(newHobby);
  };
  const fetchAchievement = async () => {
    const response = await getAchievementByUserID(userID);
    setCurrentAchievement(response.data);
    let newAchievement = [];
    for (let i = 0; i < response.data.length; i++) {
      newAchievement.push(response.data[i].name);
    }
    setTempAchievement(newAchievement);
    setAchievement(newAchievement);
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
  const createAllHobbies = async () => {
    const newItems = hobby.filter((hobby) => !temp.includes(hobby));
    const oldItems = temp.filter((h) => !hobby.includes(h));
    for (const hobbyItem of newItems) {
      let data = { userID: loginUserID, name: hobbyItem };
      await createHobby(data);
    }

    for (const hobbyItem of oldItems) {
      let data = { userID: loginUserID, name: hobbyItem };
      await deleteHobby(data);
    }
    fetchHobby();
  };

  const createAllAchievements = async () => {
    const newItems = achievement.filter(
      (achievement) => !tempAchievement.includes(achievement)
    );
    const oldItems = tempAchievement.filter((h) => !achievement.includes(h));
    for (const achievementItem of newItems) {
      let data = { userID: loginUserID, name: achievementItem };
      await createAchievement(data);
    }
    for (const achievementItem of oldItems) {
      let data = { userID: loginUserID, name: achievementItem };
      await deleteAchievement(data);
    }
    fetchAchievement();
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
  const baseInfo = async () => {
    const response = await getUserById(userID);
    setBase(response.data);
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
  // const updateUserInfo = async (field, newValue) => {
  //   const updatedUserInfo = { ...userInfo, [field]: newValue };
  //   setUserInfo(updatedUserInfo);
  //   await updateInformation(loginUserID, updatedUserInfo);
  //   fetchUser();
  // };
  useEffect(() => {
    fetchUser();
    baseInfo();
    fetchHobby();
    fetchAchievement();
  }, []);

  return (
    <div>
      {userInfo?.workplace ? (
        <div className="flex justify-between items-center">
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
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer"
          onClick={() => setShowInput(!showInput)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm nơi làm việc</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
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
                updateUserInfo({ workplace: workPlace });
                setShowInput(false);
              }}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {userInfo?.highSchool ? (
        <div className="flex justify-between items-center pt-5">
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
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5"
          onClick={() => setShowInput1(!showInput1)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm trường trung học</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5">
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
                updateUserInfo({ highSchool });
                setShowInput1(false);
              }}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {userInfo?.university ? (
        <div className="flex justify-between items-center pt-5">
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
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5"
          onClick={() => setShowInput2(!showInput2)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm trường cao đẳng/đại học</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5">
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
                updateUserInfo({ university });
                setShowInput2(false);
              }}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {userInfo?.address ? (
        <div className="flex justify-between items-center pt-5">
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
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5"
          onClick={() => setShowInput3(!showInput3)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm tỉnh/thành phố hiện tại</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5">
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
        <div className="flex justify-between items-center pt-5">
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
          className="flex items-center hover:underline hover:text-blue-500 cursor-pointer pt-5"
          onClick={() => setShowInput4(!showInput4)}
        >
          <PlusCircleTwoTone />
          <h2 className="ml-2 text-blue-500 ">Thêm quê quán</h2>
        </div>
      ) : (
        <div className="flex items-center text-gray-500 pt-5">
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

      <div className="pb-5 pt-5">
        {currentHobby?.length > 0 ? (
          <div>
            <div className="flex justify-between">
              <h2 className=" text-gray-500">Sở thích</h2>
              {isCurrentUser && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowInput5(!showInput5)}
                >
                  <EditOutlined style={{ fontSize: "20px" }} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap">
              {currentHobby.map((hobbyItem) => (
                <div
                  key={hobbyItem._id}
                  className="bg-gray-200 rounded-full px-4 py-1 text-sm m-1"
                >
                  {hobbyItem.name}
                </div>
              ))}
            </div>
          </div>
        ) : isCurrentUser ? (
          <div
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer"
            onClick={() => setShowInput5(!showInput5)}
          >
            <PlusCircleTwoTone />
            <h2 className="ml-2 text-blue-500 ">Thêm sở thích</h2>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <div>
              <LikeOutlined style={{ fontSize: "20px" }} />
            </div>
            <p className="ml-2">Người dùng chưa thêm sở thích</p>
          </div>
        )}
        {showInput5 && (
          <div className="pt-3">
            <ChipInput
              label="Sở thích"
              variant="outlined"
              helperText="Nhấn enter để thêm sở thích"
              value={hobby}
              onAdd={(chip) => {
                if (!hobby.includes(chip)) {
                  setHobby([...hobby, chip]);
                }
              }}
              onDelete={(chip, index) => {
                const newHobby = [...hobby];
                newHobby.splice(index, 1); // Xóa chip tại index khỏi mảng hobby
                setHobby(newHobby);
              }}
              fullWidth
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowInput5(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowInput5(false);
                  createAllHobbies();
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="pb-5 ">
        {currentAchievement?.length > 0 ? (
          <div>
            <div className="flex justify-between">
              <h2 className=" text-gray-500">Thành tích</h2>
              {isCurrentUser && (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowInput6(!showInput6)}
                >
                  <EditOutlined style={{ fontSize: "20px" }} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap">
              {currentAchievement.map((hobbyItem) => (
                <div
                  key={hobbyItem._id}
                  className="bg-gray-200 rounded-full px-4 py-1 text-sm m-1"
                >
                  {hobbyItem.name}
                </div>
              ))}
            </div>
          </div>
        ) : isCurrentUser ? (
          <div
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer"
            onClick={() => setShowInput6(!showInput6)}
          >
            <PlusCircleTwoTone />
            <h2 className="ml-2 text-blue-500 ">Thêm thành tích</h2>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <div>
              <AimOutlined style={{ fontSize: "20px" }} />
            </div>
            <p className="ml-2">Người dùng chưa thêm thành tích</p>
          </div>
        )}
        {showInput6 && (
          <div className="pt-3">
            <ChipInput
              label="Thành tích"
              variant="outlined"
              helperText="Nhấn enter để thêm thành tích"
              value={achievement}
              onAdd={(chip) => {
                if (!achievement.includes(chip)) {
                  setAchievement([...achievement, chip]);
                }
              }}
              onDelete={(chip, index) => {
                const newAchievement = [...achievement];
                newAchievement.splice(index, 1); // Xóa chip tại index khỏi mảng hobby
                setAchievement(newAchievement);
              }}
              fullWidth
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowInput6(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowInput6(false);
                  createAllAchievements();
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center pt-4">
        <PhoneFilled
          style={{ fontSize: "30px" }}
          className="text-gray-500 mr-2"
        />
        <div>
          <p className="text-sm">{base?.phone}</p>
          <p className="text-sm">Di động</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
