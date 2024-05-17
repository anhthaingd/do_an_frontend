import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById } from "../apis/locationApi";
import {
  AimOutlined,
  CarOutlined,
  HeartOutlined,
  HomeOutlined,
  ShopOutlined,
  WarningOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import MachineTimeline from "../components/MachineTimeline";
import {
  createPlayground,
  getPlaygroundByLocationID,
} from "../apis/playgroundApi";
import PlaygroundCard from "../components/cards/PlaygroundCard";
import { getUserById } from "../apis/userApi";
import Modal from "antd/es/modal/Modal";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  TimePicker,
  Input,
  InputNumber,
  Select,
  Tabs,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import LocationCard from "../components/cards/LocationCard";
const LocationDetail = () => {
  const locationID = useParams().id;
  const [location, setLocation] = useState({});
  const [playgrounds, setPlaygrounds] = useState([]);
  const [owner, setOwner] = useState();
  const [numberPlayground, setNumberPlayground] = useState(0);
  const [width, setWidth] = useState();
  const [length, setLength] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const fetchPlayground = async (locationId) => {
    try {
      const playgroundResponse = await getPlaygroundByLocationID(locationId);
      setPlaygrounds(playgroundResponse.data);
    } catch (error) {}
  };
  const fetchData = async () => {
    try {
      const locationResponse = await getLocationById(locationID);
      setLocation(locationResponse.data);

      setOwner(locationResponse.data.owner);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchPlayground(locationID);
  }, []);
  const savePlayground = async () => {
    setLoading(true);
    const data = {
      name: "",
      locationID: locationID,
      width: width,
      length: length,
      price: price,
      type: type,
    };
    try {
      for (let i = 0; i < numberPlayground; i++) {
        const name = `Sân số ${playgrounds.length + i + 1}`;
        data.name = name;
        const response = await createPlayground(data);
        // handle response or do something with it
      }
      fetchPlayground(locationID);
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving playground:", error);
    }
  };
  const getTime = (time) => {
    const dateTime = new Date(time);
    const hours = dateTime.getHours(); // Lấy giờ
    const minutes = dateTime.getMinutes(); // Lấy phút
    const a = hours + ":" + minutes;
    return a;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    setIsModalOpen(false);
    //   savePlayground();
    // }, 3000);
    const response = await savePlayground();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <div>
        <p className="text-2xl font-bold">{location.name}</p>
        <div className="flex text-center">
          <AimOutlined className="pt-1 pr-3" style={{ fontSize: "26px" }} />
          <p className="text-xl pt-1 flex text-center">
            {location.location_detail}
          </p>
        </div>
        <div className="flex">
          <div className="w-2/3 h-2/3 pt-6 ">
            <img
              src={
                location.image
                  ? location.image
                  : "https://phuongnam24h.com/img_data/images/nhung-san-bong-da-dep-nhat-the-gioi.jpg"
              }
              alt=""
              className=" inset-0 object-cover rounded-2xl "
              style={{ width: "90%", height: "400px" }}
            />
          </div>
          <div className="w-1/3">
            <div className="flex pl-8 pb-6">
              <div className="flex">
                <p className="text-lg ">Đánh giá: 5</p>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class=" w-6 fill-current text-yellow-500"
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                </svg>
                <p className="text-lg ">(1 đánh giá)</p>
              </div>
              <div className="pl-5">
                <HeartOutlined style={{ fontSize: "26px" }} className="pr-3" />
                <WarningOutlined style={{ fontSize: "26px" }} />
              </div>
            </div>
            <p className="text-xl font-bold border-l-4 border-blue-500 pl-2">
              Thong tin san
            </p>
            <div>
              <div className="flex justify-between pr-5 pt-2">
                <p className="">Chu san:</p>
                <p className="font-semibold">{owner?.username}</p>
              </div>
              <div className="flex justify-between pr-5 ">
                <p className="">Gio mo cua:</p>
                <p className="font-semibold">
                  {getTime(location.open_time)} - {getTime(location.close_time)}
                </p>
              </div>
              <div className="flex justify-between pr-5">
                <p>So san:</p>
                <p className="font-semibold">{playgrounds.length} San</p>
              </div>
              <div className="flex justify-between pr-5">
                <p>Lien he:</p>
                <p className="font-semibold">{owner?.phone}</p>
              </div>
            </div>
            <p className="text-lg font-semibold pl-2 pt-2">Dich vu tien ich</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex ">
                <WifiOutlined />
                <p className="ml-1 font-semibold">Wifi</p>
              </div>
              <div className="flex">
                <HomeOutlined />
                <p className="ml-1 font-semibold">Can tin</p>
              </div>
              <div className="flex">
                <CarOutlined />
                <p className="ml-1 font-semibold">Bai gui xe</p>
              </div>
              <div className="flex">
                <ShopOutlined />
                <p className="ml-1 font-semibold">Cua hang the thao</p>
              </div>
            </div>
            <div className="pt-10 flex justify-center">
              {role == 1 ? (
                <button className="addStory-link" onClick={showModal}>
                  Tạo sân
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <p className="text-xl font-bold pt-4">Chi tiết</p>
        <div className="grid grid-cols-4 gap-4 pt-2">
          {playgrounds.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center "
                style={{ zIndex: 20 }}
              >
                <PlaygroundCard
                  playground={item}
                  index={index}
                  fetchPlayground={fetchPlayground}
                  ownerID={location?.owner?.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        title="Nhập thông tin"
        open={isModalOpen}
        onOk={savePlayground}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button
            key="link"
            type="primary"
            onClick={savePlayground}
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
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 15,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item label="Nhập số sân bạn muốn tạo">
            <InputNumber
              onChange={(value) => setNumberPlayground(value)}
              value={numberPlayground}
            />
          </Form.Item>
          {/* <Form.Item label="Name">
            <Input onChange={(e) => setWidth(e.target.value)} value={width} />
          </Form.Item> */}
          <Form.Item label="Width">
            <Input onChange={(e) => setWidth(e.target.value)} value={width} />
          </Form.Item>
          <Form.Item label="Length">
            <Input onChange={(e) => setLength(e.target.value)} value={length} />
          </Form.Item>
          <Form.Item label="Price">
            <Input onChange={(e) => setPrice(e.target.value)} value={price} />
          </Form.Item>
          <Form.Item label="Type">
            <Select onChange={(value) => setType(value)}>
              <Select.Option key="0" value="0">
                Thường
              </Select.Option>
              <Select.Option key="1" value="1">
                Vip
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationDetail;
