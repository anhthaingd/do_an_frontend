import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { updateLocation } from "../../apis/locationApi";
const ModalEdit = ({
  openEditModal,
  setOpenEditModal,
  location,
  fetchLocation,
}) => {
  const formats = "HH:mm";
  const userID = localStorage.getItem("userId");
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [name, setName] = useState(location.name);
  const [image, setImage] = useState(location.image);
  const [type, setType] = useState(location.type);
  const [sale, setSale] = useState(location.sale);
  const [openTime, setOpenTime] = useState(location.open_time);
  const [closeTime, setCloseTime] = useState();
  const [locationDetail, setLocationDetail] = useState(
    location.location_detail
  );
  const [listLocation, setListLocation] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [province, setProvince] = useState(location.province);
  const [district, setDistrict] = useState(location.district);
  const [ward, setWard] = useState(location.ward);
  const [districtArr, setDistrictArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);
  const handleOK = () => {
    saveLocation();
    setOpenEditModal(false);
  };
  const handleCancel = () => {
    setOpenEditModal(false);
  };
  const fetchAddressData = async () => {
    const result = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    if (result.status === 200) {
      setAddressData(result.data);
    }
  };
  const typeOptions = [
    { value: "0", label: "Bóng đá" },
    { value: "1", label: "Cầu lông" },
    { value: "2", label: "Tennis" },
    { value: "3", label: "Bóng bàn" },
    { value: "4", label: "Bóng chuyền" },
    { value: "5", label: "Bóng rổ" },
  ];
  const getTypeLabel = (type) => {
    const option = typeOptions.find(
      (option) => option.value === type.toString()
    );
    return option ? option.label : "";
  };
  const addressDataWithDefaultOption = [{ Name: "Chọn tỉnh" }, ...addressData];
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
  const saveLocation = async (e) => {
    const data = new FormData();
    data.append("file", image);
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
    const locationData = {
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
      const res = await updateLocation(location.id, locationData);
      fetchLocation();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddressData();
  }, []);
  return (
    <div>
      <Modal
        title="Nhập thông tin"
        open={openEditModal}
        onOk={handleOK}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button
            key="link"
            type="primary"
            onClick={handleOK}
            style={{ backgroundColor: "#1677ff" }}
            // loading={loading}
          >
            Cập nhật
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Form
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
                defaultValue={[
                  dayjs(location.open_time, "HH:mm"),
                  dayjs(location.close_time, "HH:mm"),
                ]}
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
            <Select
              defaultValue={getTypeLabel(type)}
              onChange={(value) => setType(value)}
            >
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
            </Select>
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
              <img
                style={{ width: 200, height: 100 }}
                src={location.image}
                alt="..."
              />
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalEdit;
