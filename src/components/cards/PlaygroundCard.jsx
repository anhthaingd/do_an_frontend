import {
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  EuroCircleOutlined,
  FunnelPlotOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
const format = "HH:mm";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const { Meta } = Card;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const PlaygroundCard = ({ playground }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [loading, setLoading] = useState(false);
  return (
    <div className="pt-3">
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img
            alt="example"
            src="https://nhadepso.com/wp-content/uploads/2023/02/cap-nhat-50-hinh-nen-bong-da-dep-chat-luong-nhat-cho-may-tinh_1.jpg"
          />
        }
        onClick={showModal}
      >
        <div>
          <p className=" text-center font-semibold text-base">Sân số 1</p>
        </div>
        <div className="flex justify-between">
          <div>
            <ColumnWidthOutlined className="mr-1" />
            Width: 12
          </div>
          <div>
            <ColumnHeightOutlined className="mr-1" />
            Length: 12
          </div>
        </div>
        <div className="flex justify-between pt-1">
          <div>
            <EuroCircleOutlined className="mr-1" />
            Price: 12
          </div>
          <div>
            <FunnelPlotOutlined />
            Type: Vip
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
            <p className="p-1">Khach hang</p>
            <p className="p-1">So dien thoai</p>
            <p className="p-1">Ngay dat</p>
            <p className="p-1 pt-3">Bat dau</p>
            <p className="p-1 pt-3">Ket thuc</p>
            <p className="p-1">San da dat</p>
          </div>
          <div className="w-2/3 ">
            <p className="p-1">Sân số 5</p>
            <p className="p-1">Nguyen Doan Anh Thai</p>
            <p className="p-1">0362202169</p>
            <DatePicker
              defaultValue={dayjs(dayjs(), dateFormatList[0])}
              format={dateFormatList}
            />
            <div className="flex p-1">
              <TimePicker
                defaultValue={dayjs("12:08", format)}
                format={format}
              />
            </div>
            <div className="flex p-1">
              <TimePicker
                defaultValue={dayjs("12:08", format)}
                format={format}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlaygroundCard;
