import React, { useEffect, useState } from "react";
import { createLocation, getLocationByUserID } from "../apis/locationApi";
import LocationCard from "../components/cards/LocationCard";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Form, TimePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Input,
  InputNumber,
  Select,
} from "antd";

import dayjs from "dayjs";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const formats = "HH:mm";
const MyLocation = () => {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const userID = localStorage.getItem("userId");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState(0);
  const [sale, setSale] = useState(0);
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [locationDetail, setLocationDetail] = useState("");
  const [listLocation, setListLocation] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [districtArr, setDistrictArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);
  const fetchLocation = async () => {
    const response = await getLocationByUserID(userID);
    setListLocation(response.data);
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
  }, [listLocation]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      saveLocation();
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addressDataWithDefaultOption = [{ Name: "Chọn tỉnh" }, ...addressData];
  const districtArrOption = [{ Name: "Chọn huyện" }, ...districtArr];
  const wardArrOption = [{ Name: "Chọn xã" }, ...wardArr];
  const [loading, setLoading] = useState(false);
  const saveLocation = async (e) => {
    if (id) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jay3krzh");
      data.append("cloud_name", "dshzlfayf");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dshzlfayf/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const imageData = await res.json();
      const img = !imageData.secure_url ? image : imageData.secure_url;
      const location = {
        name,
        sale,
        image: img,
        type,
        province,
        district,
        ward,
        locationDetail,
        openTime,
        closeTime,
      };
      // try {
      //   const response = await AttackService.updateAttack(id, attack);
      //   openNotificationWithIcon("SUCCESS", "Update Successfully", "success");
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "jay3krzh");
        data.append("cloud_name", "dshzlfayf");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dshzlfayf/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await res.json();
        const img = !imageData.secure_url
          ? "https://simerp.io/wp-content/uploads/2021/07/POS-quan-ly-hang-ton-kho.png"
          : imageData.secure_url;
        const location = {
          ownerID: userID,
          name,
          sale,
          image: img,
          type,
          province,
          district,
          ward,
          location_detail: locationDetail,
          open_time: openTime,
          close_time: closeTime,
        };
        try {
          const response = await createLocation(location);
          // openNotificationWithIcon(
          //   "SUCCESS",
          //   "Successfully created a new attack",
          //   "success"
          // );
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [test, setTest] = useState({ imgFile: null, imgSrc: "" });
  const handleChangeFile = (e) => {
    // Lấy file từ event
    let file = e.target.files[0];
    setTest({ imgFile: file, imgSrc: "" });

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setTest({ imgFile: file, imgSrc: e.target.result });
      };
    }
  };
  return (
    <div>
      <div className="flex pl-6 pt-2">
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Trang chu {">"}{" "}
        </p>
        <p className="text-sm text-gray-800 ml-1 cursor-pointer">San cua toi</p>
      </div>
      <div className="p-4 pl-6">
        <Button
          type="primary"
          danger
          className="flex text-center"
          onClick={showModal}
        >
          <PlusOutlined className="mt-1" />
          Tao san moi
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 pt-2 pb-4">
        {listLocation.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center "
              style={{ zIndex: 20 }}
            >
              <LocationCard location={item} />
            </div>
          );
        })}
      </div>
      <Modal
        title="Nhập thông tin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button
            key="link"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#1677ff" }}
            loading={loading}
          >
            Tạo
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Form
          onSubmitCapture={(e) => saveLocation(e)}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item label="Name">
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </Form.Item>
          <Form.Item label="Thời gian mở cửa">
            <div className="">
              <TimePicker.RangePicker
                format={formats}
                onChange={(value) => {
                  if (value) {
                    setOpenTime(dayjs(value[0]).format("HH:mm"));
                    setCloseTime(dayjs(value[1]).format("HH:mm"));
                  }
                }}
              />
            </div>
          </Form.Item>
          <Form.Item label="Sale">
            <InputNumber onChange={(value) => setSale(value)} value={sale} />
          </Form.Item>
          <Form.Item label="Type">
            <Select onChange={(value) => setType(value)}>
              <Select.Option key="0" value="0">
                Bóng đá
              </Select.Option>
              <Select.Option key="1" value="1">
                Cầu lông
              </Select.Option>
              <Select.Option key="2" value="2">
                Tennis
              </Select.Option>
              <Select.Option key="3" value="3">
                Bóng bàn
              </Select.Option>
              <Select.Option key="4" value="4">
                Bóng chuyền
              </Select.Option>
              <Select.Option key="5" value="5">
                Bóng rổ
              </Select.Option>
              <Select.Option key="6" value="6">
                Golf
              </Select.Option>
              <Select.Option key="7" value="7">
                Võ thuật
              </Select.Option>
              <Select.Option key="8" value="8">
                Đua xe
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Vị trí">
            <div>
              <select
                defaultValue={"a"}
                value={province}
                onChange={(e) => {
                  const selectedProvince = e.target.value;
                  setProvince(selectedProvince);

                  const provinceData = addressData.find(
                    (item) => item.Name === selectedProvince
                  );
                  if (provinceData && provinceData.Districts) {
                    setDistrictArr(provinceData.Districts);
                  }
                }}
              >
                {addressDataWithDefaultOption.map((item, index) => (
                  <option key={index} value={item.Name}>
                    {item.Name}
                  </option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => {
                  const selectedDistrict = e.target.value;
                  setDistrict(selectedDistrict);

                  const districtData = districtArr.find(
                    (item) => item.Name === selectedDistrict
                  );
                  if (districtData && districtData.Wards) {
                    setWardArr(districtData.Wards);
                  }
                }}
              >
                {districtArrOption.map((item, index) => (
                  <option key={index} value={item.Name}>
                    {item.Name}
                  </option>
                ))}
              </select>

              <select value={ward} onChange={(e) => setWard(e.target.value)}>
                {wardArrOption.map((item, index) => (
                  <option key={index} value={item.Name}>
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Item>
          <Form.Item label="Nhập vị trí">
            <Input
              onChange={(e) => setLocationDetail(e.target.value)}
              value={locationDetail}
            />
          </Form.Item>

          <Form.Item label="Image ">
            <input
              type="file"
              accept="image/*"
              name="url"
              placeholder="Choose file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleChangeFile(e);
              }}
            />
            <br />
            {test.imgSrc ? (
              <img
                style={{ width: 100, height: 100 }}
                src={test.imgSrc}
                alt="..."
              />
            ) : (
              <></>
            )}
            {id && !test.imgSrc ? (
              <img style={{ width: 200, height: 100 }} src={image} alt="..." />
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyLocation;
