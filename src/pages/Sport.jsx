import React, { useEffect, useState } from "react";
import { getLocationByTypeLimit } from "../apis/locationApi";
import {
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import LocationList from "../components/LocationList";
import useQueryParams from "../hooks/useQueryParams";
import axios from "axios";
const Sport = ({ sportDetail }) => {
  const [params] = useSearchParams();
  const { queryParams, navigate } = useQueryParams();
  const page = params.get("page");
  const [listLocation, setListLocation] = useState([]);
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
  const fetchLocation = async () => {
    try {
      const response = await getLocationByTypeLimit({
        type: sportDetail.type,
        max: 12,
        ...queryParams,
      });
      console.log(response);
      setCount(response?.data?.count);
      setListLocation(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClickProvince = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    const provinceData = addressData.find(
      (item) => item.Name === selectedProvince
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
      pathname: `/${sportDetail.path}`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleOnClickDistrict = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    const districtData = districtArr.find(
      (item) => item.Name === selectedDistrict
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
      pathname: `/${sportDetail.path}`,
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
      pathname: `/${sportDetail.path}`,
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
  useEffect(() => {
    fetchLocation();
    fetchAddressData();
  }, [params, sportDetail.type]);
  return (
    <div className="pt-2">
      <div className="flex justify-center p-2 border border-blue-500">
        <div className="w-3/5 pr-2 rounded flex justify-center ">
          <img
            src={sportDetail.image}
            alt="Football"
            className="h-96 w-10/12"
          />
        </div>
        <div className="w-2/5 text-left">
          <div>
            <h2 className="text-xl font-bold mb-2">{sportDetail.title2}</h2>
            <p>{sportDetail.description1}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Lịch sử hình thành</h2>
            <p>{sportDetail.description2}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2 pr-5">
        <select
          defaultValue={"a"}
          value={province}
          className="w-52 p-3 border border-blue-500 outline-none rounded"
          onChange={handleOnClickProvince}
        >
          {addressDataWithDefaultOption.map((item, index) => (
            <option key={index} value={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>

        <select
          value={district}
          className="w-52 p-3 border border-blue-500 outline-none rounded"
          onChange={handleOnClickDistrict}
        >
          {districtArrOption.map((item, index) => (
            <option key={index} value={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>

        <select
          value={ward}
          className="w-52 p-3 border border-blue-500 outline-none rounded"
          onChange={handleOnClickWard}
        >
          {wardArrOption.map((item, index) => (
            <option key={index} value={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-3xl font-bold pl-6 pt">Danh sách sân</p>
        <LocationList
          listLocation={listLocation}
          count={count}
          page={page}
          sport={sport}
        />
      </div>
    </div>
  );
};

export default Sport;
