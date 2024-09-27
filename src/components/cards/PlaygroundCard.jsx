import {
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  EuroCircleOutlined,
  FunnelPlotOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, Select, Switch } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useState } from "react";
import { DatePicker, Space, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
import { updatePlayground } from "../../apis/playgroundApi";
import { getUserById } from "../../apis/userApi";
import {
  createMatch,
  getMatchByDateAndPlaygroundID,
} from "../../apis/matchApi";
import { useNavigate, useParams } from "react-router-dom";
import { deletePlayground } from "../../apis/playgroundApi";
import { toast } from "react-toastify";
const format = "HH:mm";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const { Meta } = Card;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const role = localStorage.getItem("role");

const PlaygroundCard = ({
  playground,
  index,
  fetchPlayground,
  ownerID,
  location,
}) => {
  const userID = localStorage.getItem("userId");
  const locationID = useParams().id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [name, setName] = useState(playground.name);
  const [width, setWidth] = useState(playground.width);
  const [length, setLength] = useState(playground.length);
  const [price, setPrice] = useState(playground.price);
  const [type, setType] = useState(playground.type);
  const [user, setUser] = useState({});
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [listMatchByDate, setListMatchByDate] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [checkStartTime, setCheckStartTime] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isOutdoor, setIsOutdoor] = useState(playground.position);
  const [yardSurface, setYardSurface] = useState(playground.yard_surface);
  const [quantity, setQuantity] = useState(playground.quantity);
  const navigate = useNavigate();
  const showModal = () => {
    ownerID == userID ? setIsOpenEdit(true) : setIsModalOpen(true);
  };
  function roundTime(startTime, endTime) {
    // Chuyển đổi start time và end time thành số phút từ nửa đêm (00:00)
    const start =
      parseInt(startTime?.split(":")[0]) * 60 +
      parseInt(startTime?.split(":")[1]);
    const end =
      parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

    let duration = end - start;

    let hour = Math.ceil(duration / 60);

    return hour;
  }
  const fetchUser = async () => {
    try {
      const response = await getUserById(userID);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMachByDate = async (date, playgroundID) => {
    try {
      if (date) {
        const response = await getMatchByDateAndPlaygroundID(
          date,
          playgroundID
        );
        setListMatchByDate(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMatch = async () => {
    try {
      const data = {
        ownerID: userID,
        locationID: locationID,
        playgroundID: playground.id,
        date: day,
        start_time: startTime,
        end_time: endTime,
        price: roundTime(startTime, endTime) * playground.price,
        status: 2,
        isPublic,
      };
      const res = await createMatch(data);
      if (res.success) {
        toast.success("Đặt sân thành công");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    if (!day) {
      message.error("Please select a date");
      return;
    }

    if (!startTime) {
      message.error("Please select a start time");
      return;
    }

    if (!endTime) {
      message.error("Please select an end time");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      saveMatch();
      navigate();
      fetchMachByDate(day, playground.id);
    }, 2000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDay("");
    setStartTime("");
    setEndTime("");
  };
  const updatePlaygrounds = async () => {
    try {
      const data = {
        name: name,
        width: width,
        length: length,
        price: price,
        position: isOutdoor,
        yard_surface: yardSurface,
        quantity: quantity,
      };
      await updatePlayground(playground.id, data);
      fetchPlayground(locationID);
    } catch (error) {
      console.error("Error updating playground:", error);
    }
  };
  const typeOptions = [
    { value: "0", label: "Thường" },
    { value: "1", label: "Vip" },
  ];
  const getTypeLabel = (type) => {
    const option = typeOptions.find(
      (option) => option.value === type.toString()
    );
    return option ? option.label : "";
  };
  const handleEditOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpenEdit(false);
      updatePlaygrounds();
    }, 300);
  };
  const handleEditCancel = () => {
    setIsOpenEdit(false);
  };
  const [loading, setLoading] = useState(false);
  const handleDateChange = (e) => {
    if (!e) {
      setDay("");
      message.error("Hãy chọn ngày");
      // setDisableButton(true);
    } else {
      setDay(e.format("DD-MM-YYYY"));
      fetchMachByDate(e.format("DD-MM-YYYY"), playground.id);
    }
  };
  const handleStartTimeChange = (time) => {
    if (!time) {
      // setDisableButton(true);
      setStartTime("");
      message.error("Hãy chọn thời gian bắt đầu");
    } else {
      const newStart = dayjs(time.format("HH:mm"), "HH:mm");
      const overlaps = listMatchByDate.some((item) => {
        const existingStart = dayjs(item.start_time, "HH:mm");
        const existingEnd = dayjs(item.end_time, "HH:mm");

        return (
          newStart.isBefore(existingEnd) && newStart.isAfter(existingStart)
        );
      });

      if (overlaps) {
        message.error("Khung giờ này đã có người khác đặt");
        setDisableButton(true);
      } else {
        setStartTime(time.format("HH:mm"));
        setCheckStartTime(true);
        endTime !== "" ? setDisableButton(false) : setDisableButton(true);
      }
    }
  };
  const handleEndTimeChange = (time) => {
    if (!time) {
      setEndTime("");
      message.error("Hãy chọn thời gian kết thúc");
    } else {
      const newEnd = dayjs(time.format("HH:mm"), "HH:mm");
      const overlaps = listMatchByDate.some((item) => {
        const existingStart = dayjs(item.start_time, "HH:mm");
        const existingEnd = dayjs(item.end_time, "HH:mm");
        return newEnd.isAfter(existingStart) && newEnd.isBefore(existingEnd);
      });
      if (overlaps) {
        message.error("Khoảng thời gian này đã có người khác đặt");
        setDisableButton(true); // Disable the button if there's an overlap
      } else {
        setEndTime(time.format("HH:mm"));
        !isTimeRangeOverlap() && checkStartTime === true
          ? setDisableButton(false)
          : setDisableButton(true); // Enable the button if there's no overlap
      }
    }
  };
  const disabledStartTime = () => {
    return {
      disabledHours: () => {
        const end = dayjs(endTime, "HH:mm");
        if (!end.isValid()) return [];
        return Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour > end.hour()
        );
      },
      disabledMinutes: (selectedHour) => {
        const end = dayjs(endTime, "HH:mm");
        if (!end.isValid()) return [];
        if (selectedHour === end.hour()) {
          return Array.from({ length: 60 }, (_, i) => i).filter(
            (minute) => minute >= end.minute()
          );
        }
        return [];
      },
    };
  };
  const disabledEndTime = () => {
    return {
      disabledHours: () => {
        const start = dayjs(startTime, "HH:mm");
        if (!start.isValid()) return [];
        return Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour < start.hour()
        );
      },
      disabledMinutes: (selectedHour) => {
        const start = dayjs(startTime, "HH:mm");
        if (!start.isValid()) return [];
        if (selectedHour === start.hour()) {
          return Array.from({ length: 60 }, (_, i) => i).filter(
            (minute) => minute <= start.minute()
          );
        }
        return [];
      },
    };
  };
  const disabledDate = (current) => {
    // Disable all dates before today
    return current && current < moment().startOf("day");
  };

  const isTimeRangeOverlap = () => {
    const newStart = dayjs(startTime, "HH:mm");
    const newEnd = dayjs(endTime, "HH:mm");

    // Kiểm tra xem thời gian mới chọn có bị bao gồm hoặc bao gồm bất kỳ khoảng thời gian nào trong listMatchByDate không
    return listMatchByDate.some((item) => {
      const existingStart = dayjs(item.start_time, "HH:mm");
      const existingEnd = dayjs(item.end_time, "HH:mm");
      return (
        (newStart.isAfter(existingStart) && newStart.isBefore(existingEnd)) || // Kiểm tra xem newStart nằm trong khoảng thời gian hiện có
        (newEnd.isAfter(existingStart) && newEnd.isBefore(existingEnd)) || // Kiểm tra xem newEnd nằm trong khoảng thời gian hiện có
        (existingStart.isAfter(newStart) && existingStart.isBefore(newEnd)) || // Kiểm tra xem existingStart nằm trong khoảng thời gian mới chọn
        (existingEnd.isAfter(newStart) && existingEnd.isBefore(newEnd)) || // Kiểm tra xem existingEnd nằm trong khoảng thời gian mới chọn
        (newStart.isSame(existingStart) && newEnd.isSame(existingEnd)) // Kiểm tra xem newStart và newEnd bằng chính existingStart và existingEnd
      );
    });
  };
  const handleDisableButton = () => {
    if (
      startTime === "" ||
      endTime === "" ||
      day === "" ||
      isTimeRangeOverlap()
    ) {
      const errorMessage = isTimeRangeOverlap()
        ? "Khoảng thời gian đã bị trùng"
        : null;
      errorMessage && message.error(errorMessage);
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };
  const handleDeletePlayground = async () => {
    try {
      await deletePlayground(playground.id);
      setIsOpenEdit(false);
      fetchPlayground(locationID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitch = (checked) => {
    setIsPublic(checked);
  };
  useEffect(() => {
    fetchUser();
    setCheckStartTime(false);
    handleDisableButton();
    // fetchMachByDate();
  }, [playground, day, startTime, endTime]);
  return (
    <div className="pt-3">
      <Card
        hoverable
        style={{
          width: 270,
        }}
        cover={(() => {
          if (playground.location.type === 0) {
            return (
              <img
                alt="example"
                src="https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-nen-bong-da-dep.jpg"
              />
            );
          } else if (playground.location.type === 1) {
            return (
              <img
                alt="example"
                src="https://thethaodonga.com/wp-content/uploads/2022/05/cau-long-tieng-anh-la-gi-2.png"
              />
            );
          } else if (playground.location.type === 2) {
            return (
              <img
                alt="example"
                src="https://trangnguyensport.com/wp-content/uploads/2017/06/qua-bong-tennis-768x576.jpg"
              />
            );
          } else if (playground.location.type === 3) {
            return (
              <img
                alt="example"
                src="https://thethaodonga.com/wp-content/uploads/2021/07/qua-bong-ban-3-sao-hop-12-qua-2.jpg"
              />
            );
          } else if (playground.location.type === 4) {
            return (
              <img
                alt="example"
                src="https://tse2.mm.bing.net/th?id=OIP.oKQ-Qp79SBY7JsNHdjMQeAHaE8&pid=Api&P=0&h=180"
              />
            );
          } else if (playground.location.type === 5) {
            return (
              <img
                alt="example"
                src="https://thethaodonga.com/wp-content/uploads/2021/10/gia-1-qua-bong-ro-2.jpg"
              />
            );
          }
        })()}
        onClick={showModal}
      >
        <div>
          <p className=" text-center font-semibold text-base">
            {playground.name}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <ColumnWidthOutlined className="mr-1" />
            Chiều rộng: {playground.width}m
          </div>
          <div>
            <EuroCircleOutlined className="mr-1" />
            Price: {playground.price}$
          </div>
        </div>
        <div className="flex justify-between pt-1">
          <div>
            <ColumnHeightOutlined className="mr-1" />
            Chiều dài: {playground.length}m
          </div>
          {playground?.quantity ? (
            <div>
              <UserOutlined className="mr-1" />
              {playground?.quantity}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between pt-1">
          <div>
            {playground?.yard_surface ? (
              <div>
                <FunnelPlotOutlined className="mr-1" />{" "}
                {playground?.yard_surface}
              </div>
            ) : null}
          </div>

          <div>
            {playground?.position ? (
              <div>
                <HomeOutlined className="mr-1" /> {playground?.position}
              </div>
            ) : null}
          </div>
        </div>
      </Card>
      <Modal
        title="Thông tin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        footer={[
          <Button
            key="link"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: "#1677ff" }}
            loading={loading}
            disabled={disableButton}
          >
            Đặt sân
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <div className="flex">
          <div className="w-1/3">
            <p className="p-1">Sân:</p>
            <p className="p-1">Khách hàng</p>
            <p className="p-1">Số điện thoại</p>
            <p className="p-1">Công khai</p>
            <p className="p-1">Ngày đặt</p>
            <p className="p-1 pt-3">Bắt đầu</p>
            <p className="p-1 pt-3">Kết thúc</p>
            <p className="p-1 pt-3">Giá</p>
            <p className="p-1">Sân đã đặt</p>
          </div>
          <div className="w-2/3 ">
            <p className="p-1 text-red-500">{playground.name}</p>
            <p className="p-1">{user?.username}</p>
            <p className="p-1">{user?.phone}</p>
            <p className="p-1">
              <Switch defaultChecked onChange={handleSwitch} />
            </p>
            <DatePicker
              format={"DD-MM-YYYY"}
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
            <div className="flex p-1">
              <TimePicker
                format={format}
                onChange={handleStartTimeChange}
                disabledTime={disabledStartTime}
              />
            </div>
            <div className="flex p-1">
              <TimePicker
                format={format}
                onChange={handleEndTimeChange}
                disabledTime={disabledEndTime}
              />
            </div>
            <p className="pt-2 pl-1 font-bold text-yellow-700 h-8">
              {startTime && endTime
                ? roundTime(startTime, endTime) * playground.price + "đ"
                : null}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {listMatchByDate.map((item, index) => {
                return (
                  <p className="p-1 border border-red-500 rounded text-center">
                    {item.start_time} - {item.end_time}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Chỉnh sửa thông tin"
        open={isOpenEdit}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        width={500}
        footer={[
          <Button
            key="back"
            onClick={handleDeletePlayground}
            danger
            className="mr-44"
          >
            Xóa sân
          </Button>,
          <Button
            key="link"
            type="primary"
            onClick={handleEditOk}
            style={{ backgroundColor: "#1677ff" }}
            loading={loading}
          >
            Cập nhật
          </Button>,
          <Button key="back" onClick={handleEditCancel}>
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
          <Form.Item label="Tên">
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </Form.Item>
          <Form.Item label="Chiều rộng">
            <Input onChange={(e) => setWidth(e.target.value)} value={width} />
          </Form.Item>
          <Form.Item label="Chiều dài ">
            <Input onChange={(e) => setLength(e.target.value)} value={length} />
          </Form.Item>
          <Form.Item label="Giá">
            <Input onChange={(e) => setPrice(e.target.value)} value={price} />
          </Form.Item>
          <Form.Item label="Vị trí">
            <Select value={isOutdoor} onChange={(value) => setIsOutdoor(value)}>
              <Select.Option key="t" value="Trong nhà">
                Trong nhà
              </Select.Option>
              <Select.Option key="n" value="Ngoài trời">
                Ngoài trời
              </Select.Option>
            </Select>
          </Form.Item>
          {location?.type == 0 ? (
            <Form.Item label="Bề mặt sân">
              <Select
                // defaultValue={getTypeLabel(type)}
                onChange={(value) => setYardSurface(value)}
                value={yardSurface}
              >
                <Select.Option key="a" value="Sân futsal">
                  Sân futsal
                </Select.Option>
                <Select.Option key="b" value="Sân cỏ tự nhiên">
                  Sân cỏ tự nhiên
                </Select.Option>
                <Select.Option key="c" value="Sân cỏ nhân tạo">
                  Sân cỏ nhân tạo
                </Select.Option>
              </Select>
            </Form.Item>
          ) : location?.type == 1 ? (
            <Form.Item label="Bề mặt sân">
              <Select
                onChange={(value) => setYardSurface(value)}
                value={yardSurface}
              >
                <Select.Option key="g" value="Sàn gỗ">
                  Sàn gỗ
                </Select.Option>
                <Select.Option key="t" value="Sàn thảm PVC">
                  Sàn thảm PVC
                </Select.Option>
              </Select>
            </Form.Item>
          ) : location?.type == 2 ? (
            <Form.Item label="Bề mặt sân">
              <Select
                onChange={(value) => setYardSurface(value)}
                value={yardSurface}
              >
                <Select.Option key="3" value="Sân đất nện">
                  Sân đất nện
                </Select.Option>
                <Select.Option key="4" value="Sân cỏ">
                  Sân cỏ
                </Select.Option>
                <Select.Option key="5" value="Sân cứng tiêu chuẩn">
                  Sân cứng tiêu chuẩn
                </Select.Option>
              </Select>
            </Form.Item>
          ) : location?.type == 4 || location?.type == 5 ? (
            <Form.Item label="Bề mặt sân">
              <Select
                onChange={(value) => setYardSurface(value)}
                value={yardSurface}
              >
                <Select.Option key="6" value="Sân gỗ">
                  Sân gỗ
                </Select.Option>
                <Select.Option key="7" value="Sân nhựa tổng hợp">
                  Sân nhựa tổng hợp
                </Select.Option>
                <Select.Option key="8" value="Sân bê tông">
                  Sân bê tông
                </Select.Option>
              </Select>
            </Form.Item>
          ) : (
            ""
          )}
          {location?.type == 0 ? (
            <Form.Item label="Số lượng">
              <Select
                // defaultValue={getTypeLabel(type)}
                onChange={(value) => setQuantity(value)}
                value={quantity}
              >
                <Select.Option key="9" value="Sân 5 người">
                  Sân 5 người
                </Select.Option>
                <Select.Option key="10" value="Sân 7 người">
                  Sân 7 người
                </Select.Option>
                <Select.Option key="11" value="Sân 11 người">
                  Sân 11 người
                </Select.Option>
              </Select>
            </Form.Item>
          ) : (
            ""
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default PlaygroundCard;
