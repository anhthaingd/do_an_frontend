import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { deleteUser, getAllUser } from "../../apis/userApi";
import { getLocationByTypeLimit } from "../../apis/locationApi";
import { createSearchParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import { items } from "../../utils/sport";
import { ReloadOutlined } from "@ant-design/icons";
const ManageLocation = () => {
  const [params] = useSearchParams();
  const { queryParams, navigate } = useQueryParams();
  const [listLocation, setListLocation] = useState([]); // [1
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [districtArr, setDistrictArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);
  const [type, setType] = useState(0);
  const addressDataWithDefaultOption = [{ Name: "Chọn tỉnh" }, ...addressData];
  const districtArrOption = [{ Name: "Chọn huyện" }, ...districtArr];
  const wardArrOption = [{ Name: "Chọn xã" }, ...wardArr];
  const sports = [{ name: "Chọn môn thể thao" }, ...items];
  const listSport = [
    "Chọn môn thể thao",
    "Bóng đá",
    "Cầu lông",
    "Tennis",
    "Bóng bàn",
    "Bóng chuyền",
    "Bóng rổ",
  ];
  const fetchAddressData = async () => {
    const result = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    if (result.status === 200) {
      setAddressData(result.data);
    }
  };
  const fetchLocation = async () => {
    try {
      const response = await getLocationByTypeLimit({ ...queryParams });
      setListLocation(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Tên",
      //   dataIndex: "name",
      key: "action",
      render: (data) => {
        return (
          <Link to={`/location/${data.id}`} target="_blank">
            {data.name}
          </Link>
        );
      },
    },
    {
      title: "Chủ sân",
      dataIndex: "ownerName",
      render: (data) => {
        return (
          <Link to={`/systems/${data?.id}`} target="_blank">
            {data?.username}
          </Link>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data) => {
        return (
          <img
            src={data}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "5px" }}
          />
        );
      },
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (user) => (
        <>
          <Button
            type="primary"
            ghost
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/system/update/${user.key}`)}
            className="mb-2"
          >
            Xem
          </Button>
          <Button type="primary" danger ghost onClick={() => deleteU(user)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];
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
      pathname: `/admin`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleOnClickType = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);

    let newSearchParams = {
      ...queryParams,
      type: e.target.value,
    };

    if (e.target.value === "Chọn môn thể thao") {
      delete newSearchParams.type;
    }
    navigate({
      pathname: `/admin`,
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
      pathname: `/admin`,
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
      pathname: `/admin`,
      search: createSearchParams(newSearchParams).toString(),
    });
  };
  const handleType = (type) => {
    if (type === 0) {
      return "Bóng đá";
    } else if (type === 3) {
      return "Bóng bàn";
    } else if (type === 1) {
      return "Cầu lông";
    } else if (type === 4) {
      return "Bóng chuyền";
    } else if (type === 5) {
      return "Bóng rổ";
    } else if (type === 2) {
      return "Tennis";
    }
  };
  const data = listLocation.map((item) => ({
    id: item.id,
    name: item.name,
    ownerName: item.owner,
    address: item.location_detail,
    image:
      item?.image !== null
        ? item.image
        : "https://tse4.mm.bing.net/th?id=OIP.NRrEYS-5-HeNRNH8qyscEwHaHw&pid=Api&P=0&h=180",
    type: handleType(item.type),
  }));
  const handleRefresh = () => {
    delete queryParams.district;
    delete queryParams.province;
    delete queryParams.ward;
    delete queryParams.type;
    setProvince("Chọn tỉnh");
    setType("Chọn môn thể thao");
    setDistrict("Chọn huyện");
    setWard("Chọn xã");
    navigate({
      pathname: `/admin`,
      search: createSearchParams(queryParams).toString(),
    });
  };
  const deleteU = async (user) => {
    try {
      console.log(user);
      const response = await deleteUser(user.key);
      fetchLocation();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLocation();
    fetchAddressData();
  }, [params]);
  return (
    <div className="mr-5">
      <div
        style={{
          marginTop: "10px",
          border: "1px solid gray",
          borderRadius: "15px",
          padding: "20px",
          height: "auto",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div className="flex justify-end gap-3 pt-2 pr-5">
          <div className="flex">
            <ReloadOutlined
              style={{ fontSize: "20px" }}
              className="pr-2 cursor-pointer hover:text-blue-500"
              onClick={handleRefresh}
            />
          </div>
          <select
            defaultValue={"a"}
            value={type}
            className="w-52 p-3 border border-blue-500 outline-none rounded"
            onChange={handleOnClickType}
          >
            {sports.map((item, index) => (
              <option key={index} value={item.type}>
                {item.name}
              </option>
            ))}
          </select>
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

        <div className="mt-1">
          <Table
            columns={columns}
            dataSource={data}
            style={{ gap: "20px", height: "auto" }}
            pagination={{
              pageSize: 5,
              onChange: (page) => {},
            }}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageLocation;
