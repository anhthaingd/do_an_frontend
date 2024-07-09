import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import axios from "axios";
import { getInformation, searchInformation } from "../apis/informationApi";
import { BiSearchAlt2 } from "react-icons/bi";
import avatar from "../images/avatar.jpg";
import ChipInput from "material-ui-chip-input";
import { searchAchievement } from "../apis/achievementApi";
import { ReloadOutlined } from "@ant-design/icons";
import { searchHobby } from "../apis/hobbyApi";
import { findUser } from "../apis/userApi";
const FindPlayer = () => {
  const loginUserID = localStorage.getItem("userId");
  const [params] = useSearchParams();
  const { queryParams, navigate } = useQueryParams();
  const page = params.get("page");
  const [listUser, setListUser] = useState([]);
  const [count, setCount] = useState(0);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [districtArr, setDistrictArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);
  const location = useLocation();
  const sport = location.pathname;
  const addressDataWithDefaultOption = [{ Name: "Chọn tỉnh" }, ...addressData];
  const districtArrOption = [{ Name: "Chọn huyện" }, ...districtArr];
  const wardArrOption = [{ Name: "Chọn xã" }, ...wardArr];
  const [address, setAddress] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [university, setUniversity] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [achievement, setAchievement] = useState("");
  const [hobby, setHobby] = useState("");
  const [userAchievement, setUserAchievement] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const fetchInformation = async () => {
    try {
      const res = await searchInformation({
        max: 12,
        ...queryParams,
      });
      setCount(res?.data?.count);
      setListUser(res.data.rows);
      const response = await searchAchievement({ ...queryParams });
      const response2 = await searchHobby({ ...queryParams });
      const response3 = await findUser({ ...queryParams });
      setUserAchievement(response.data);
      const hasInfo = phone || email || username;
      const temp = res.data.rows.filter((userItem) =>
        response.data.some(
          (achievementItem) => userItem.userID === achievementItem.userID
        )
      );
      const temp2 = res.data.rows.filter((userItem) =>
        response2.data.some(
          (achievementItem) => userItem.userID === achievementItem.userID
        )
      );
      const temp3 = res.data.rows.filter((userItem) =>
        response3.data.some((user) => userItem.userID === user.id)
      );
      console.log("temp3", temp3);
      let commonElements = [];
      if (achievement && hobby && hasInfo) {
        commonElements = temp
          .filter((tempItem) =>
            temp2.some((temp2Item) => tempItem.userID === temp2Item.userID)
          )
          .filter((commonItem) =>
            temp3.some((temp3Item) => commonItem.userID === temp3Item.userID)
          );
      } else if (achievement && hobby) {
        commonElements = temp.filter((tempItem) =>
          temp2.some((temp2Item) => tempItem.userID === temp2Item.userID)
        );
      } else if (achievement && hasInfo) {
        commonElements = temp.filter((tempItem) =>
          temp3.some((temp3Item) => tempItem.userID === temp3Item.userID)
        );
      } else if (hobby && hasInfo) {
        commonElements = temp2.filter((temp2Item) =>
          temp3.some((temp3Item) => temp2Item.userID === temp3Item.userID)
        );
      } else if (achievement) {
        commonElements = temp;
      } else if (hobby) {
        commonElements = temp2;
      } else if (hasInfo) {
        commonElements = temp3;
      }

      setMatchingUsers(commonElements);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("listUser", listUser);
  const fetchUserByAchievement = async () => {
    try {
      // const response = await searchAchievement({ ...queryParams });
      // const response2 = await searchHobby({ ...queryParams });
      // const response3 = await findUser({ ...queryParams });
      // setUserAchievement(response.data);
      // const hasInfo = phone || email || username;
      // const temp = listUser.filter((userItem) =>
      //   response.data.some(
      //     (achievementItem) => userItem.userID === achievementItem.userID
      //   )
      // );
      // const temp2 = listUser.filter((userItem) =>
      //   response2.data.some(
      //     (achievementItem) => userItem.userID === achievementItem.userID
      //   )
      // );
      // const temp3 = listUser.filter((userItem) =>
      //   response3.data.some((user) => userItem.userID === user.id)
      // );
      // console.log("temp3", temp3);
      // let commonElements = [];
      // if (achievement && hobby && hasInfo) {
      //   commonElements = temp
      //     .filter((tempItem) =>
      //       temp2.some((temp2Item) => tempItem.userID === temp2Item.userID)
      //     )
      //     .filter((commonItem) =>
      //       temp3.some((temp3Item) => commonItem.userID === temp3Item.userID)
      //     );
      // } else if (achievement && hobby) {
      //   commonElements = temp.filter((tempItem) =>
      //     temp2.some((temp2Item) => tempItem.userID === temp2Item.userID)
      //   );
      // } else if (achievement && hasInfo) {
      //   commonElements = temp.filter((tempItem) =>
      //     temp3.some((temp3Item) => tempItem.userID === temp3Item.userID)
      //   );
      // } else if (hobby && hasInfo) {
      //   commonElements = temp2.filter((temp2Item) =>
      //     temp3.some((temp3Item) => temp2Item.userID === temp3Item.userID)
      //   );
      // } else if (achievement) {
      //   commonElements = temp;
      // } else if (hobby) {
      //   commonElements = temp2;
      // } else if (hasInfo) {
      //   commonElements = temp3;
      // }

      // setMatchingUsers(commonElements);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserByHobby = async () => {
    const res = await searchHobby({ ...queryParams });
  };
  const findMatchingUsers = () => {
    return listUser.filter((userItem) =>
      userAchievement.some(
        (achievementItem) => userItem.userID === achievementItem.userID
      )
    );
  };

  const handleInputAchievement = (e) => {
    setAchievement(e.target.value);
    let newSearchParams = {
      ...queryParams,
      achievement: e.target.value,
    };
    // const temp = findMatchingUsers();
    // setMatchingUsers(temp);
    if (e.target.value === "") {
      setMatchingUsers([]);
      setAchievement("");
      delete newSearchParams.achievement;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputUsername = (e) => {
    setUsername(e.target.value);

    let newSearchParams = {
      ...queryParams,
      username: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.username;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputPhone = (e) => {
    setPhone(e.target.value);

    let newSearchParams = {
      ...queryParams,
      phone: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.phone;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputEmail = (e) => {
    setEmail(e.target.value);

    let newSearchParams = {
      ...queryParams,
      email: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.email;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputHobby = (e) => {
    setHobby(e.target.value);
    let newSearchParams = {
      ...queryParams,
      hobby: e.target.value,
    };
    if (e.target.value === "") {
      setHobby("");
      delete newSearchParams.hobby;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleOnClickProvince = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    const cleanName = (name) => name.replace(/Tỉnh|Thành phố/g, "").trim();
    const provinceData = addressData.find(
      (item) => cleanName(item.Name) === cleanName(selectedProvince)
    );
    if (provinceData && provinceData.Districts) {
      setDistrictArr(provinceData.Districts);
    }

    let newSearchParams = {
      ...queryParams,
      province: e.target.value,
    };

    if (e.target.value === "Chọn tỉnh") {
      delete newSearchParams.province;
    }

    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleOnClickDistrict = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    const cleanedName = (name) => name.replace(/Quận|Huyện|Thị xã/g, "").trim();
    const districtData = districtArr.find(
      (item) => cleanedName(item.Name) === selectedDistrict
    );
    if (districtData && districtData.Wards) {
      setWardArr(districtData.Wards);
    }
    let newSearchParams = {
      ...queryParams,
      district: e.target.value,
    };

    if (e.target.value === "Chọn huyện") {
      delete newSearchParams.district;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleOnClickWard = (e) => {
    setWard(e.target.value);

    let newSearchParams = {
      ...queryParams,
      ward: e.target.value,
    };

    if (e.target.value === "Chọn xã") {
      delete newSearchParams.ward;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };

  const handleInputAddress = (e) => {
    setAddress(e.target.value);

    let newSearchParams = {
      ...queryParams,
      address: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.address;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };

  const handleInputWorkplace = (e) => {
    setWorkplace(e.target.value);

    let newSearchParams = {
      ...queryParams,
      workplace: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.workplace;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputUniversity = (e) => {
    setUniversity(e.target.value);

    let newSearchParams = {
      ...queryParams,
      university: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.university;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleInputHighSchool = (e) => {
    setHighSchool(e.target.value);

    let newSearchParams = {
      ...queryParams,
      highSchool: e.target.value,
    };
    if (e.target.value === "") {
      delete newSearchParams.highSchool;
    }
    navigate({
      pathname: `/search`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const fetchAddressData = async () => {
    const result = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    if (result.status === 200) {
      setAddressData(result.data);
    }
  };
  const handleRefresh = () => {
    delete queryParams.district;
    delete queryParams.province;
    delete queryParams.ward;
    delete queryParams.type;
    delete queryParams.address;
    delete queryParams.workplace;
    delete queryParams.university;
    delete queryParams.highSchool;
    delete queryParams.achievement;
    delete queryParams.hobby;
    delete queryParams.username;
    delete queryParams.phone;
    delete queryParams.email;
    setUsername("");
    setPhone("");
    setEmail("");
    setWorkplace("");
    setUniversity("");
    setHighSchool("");
    setAchievement("");
    setHobby("");
    setAddress("");
    setProvince("Chọn tỉnh");
    setDistrict("Chọn huyện");
    setWard("Chọn xã");
    navigate({
      pathname: `/search`,
      search: createSearchParams(queryParams).toString(),
    });
  };
  useEffect(() => {
    fetchInformation();
    fetchUserByAchievement();
    fetchAddressData();
    fetchUserByHobby();
  }, [queryParams]);
  return (
    <div className=" min-h-[513px] flex">
      <div className="w-3/4 bg-gray-100 p-5">
        <div>
          <div className="">
            <div className="flex justify-between">
              <p className="font-bold">Tìm kiếm theo thông tin cơ bản</p>
              <ReloadOutlined
                style={{ fontSize: "20px" }}
                className="pr-2 cursor-pointer hover:text-blue-500"
                onClick={handleRefresh}
              />
            </div>

            <div className="flex gap-3 pt-5 pr-5 pl-10">
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={username}
                    onChange={handleInputUsername}
                    placeholder="Nhập username..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={phone}
                    onChange={handleInputPhone}
                    placeholder="Nhập số điện thoai..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={email}
                    onChange={handleInputEmail}
                    placeholder="Nhập email..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-5">
            <p className="font-bold">Tìm kiếm theo địa điểm</p>
          </div>

          <div className="flex gap-3 pt-5 pr-5 pl-10">
            <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
              <div className="flex items-center bg-white">
                <input
                  type="text"
                  // value={searchTerm}
                  value={address}
                  onChange={handleInputAddress}
                  placeholder="Nhập địa điểm..."
                  style={{ outline: "none" }}
                  className="w-full"
                  // onClick={handleSubmit}
                />
              </div>
            </div>

            <select
              defaultValue={"a"}
              value={province}
              className="w-52 p-3 border border-blue-500 outline-none rounded"
              onChange={handleOnClickProvince}
            >
              {addressDataWithDefaultOption.map((item, index) => {
                // Remove "tỉnh" and "thành phố" from the item.Name if they exist
                const cleanedName = item.Name.replace(
                  /Tỉnh|Thành phố/g,
                  ""
                ).trim();
                return (
                  <option key={item.Id} value={cleanedName}>
                    {cleanedName}
                  </option>
                );
              })}
            </select>

            <select
              value={district}
              className="w-52 p-3 border border-blue-500 outline-none rounded"
              onChange={handleOnClickDistrict}
            >
              {districtArrOption.map((item, index) => {
                // Remove "tỉnh" and "thành phố" from the item.Name if they exist
                const cleanedName = item.Name.replace(
                  /Quận|Huyện|Thị xã/g,
                  ""
                ).trim();
                return (
                  <option key={item.Id} value={cleanedName}>
                    {cleanedName}
                  </option>
                );
              })}
            </select>

            <select
              value={ward}
              className="w-52 p-3 border border-blue-500 outline-none rounded"
              onChange={handleOnClickWard}
            >
              {wardArrOption.map((item, index) => {
                // Remove "tỉnh" and "thành phố" from the item.Name if they exist
                const cleanedName = item.Name.replace(
                  /Phường|Xã|Thị trấn/g,
                  ""
                ).trim();
                return (
                  <option key={item.Id} value={cleanedName}>
                    {cleanedName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="pt-5">
            <p className="font-bold">Tìm kiếm theo công việc và học vấn</p>

            <div className="flex gap-3 pt-5 pr-5 pl-10">
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={workplace}
                    onChange={handleInputWorkplace}
                    placeholder="Nhập nơi làm việc..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={university}
                    onChange={handleInputUniversity}
                    placeholder="Nhập trường đại học..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-80 p-3 border border-blue-500 outline-none rounded bg-white">
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={highSchool}
                    onChange={handleInputHighSchool}
                    placeholder="Nhập trương trung học..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <p className="font-bold">Tìm kiếm theo sở thích và thành tích</p>

            <div className="flex gap-3 pt-5 pr-5 pl-10">
              <div
                className="w-80 p-3 border border-blue-500 outline-none rounded bg-white"
                style={{ width: "45%" }}
              >
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={hobby}
                    onChange={handleInputHobby}
                    placeholder="Nhập sở thích..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
              <div
                className="p-3 ml-6 border border-blue-500 outline-none rounded bg-white"
                style={{ width: "45%" }}
              >
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={achievement}
                    onChange={handleInputAchievement}
                    placeholder="Nhập thành tích..."
                    style={{ outline: "none" }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 bg-green-200">
        {Object.keys(queryParams).length === 0
          ? ""
          : hobby !== "" ||
            achievement !== "" ||
            username !== "" ||
            phone !== "" ||
            email !== ""
          ? matchingUsers.map(
              (user) =>
                user.user.id != loginUserID && (
                  <div
                    key={user.id}
                    className="bg-white p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user.user.id}`);
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-bold">{user.user.username}</p>
                        <p>{user.user.phone}</p>
                      </div>
                    </div>
                  </div>
                )
            )
          : listUser.map(
              (user) =>
                user.user.id != loginUserID && (
                  <div
                    key={user.id}
                    className="bg-white p-2 m-2 rounded-md hover:bg-blue-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user.user.id}`);
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-bold">{user.user.username}</p>
                        <p>{user.user.phone}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
      </div>
    </div>
  );
};

export default FindPlayer;
