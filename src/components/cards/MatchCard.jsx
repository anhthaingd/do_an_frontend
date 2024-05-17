import React, { useEffect, useState } from "react";
import { getUserById } from "../../apis/userApi";
import { Button, Modal } from "antd";
import { updateMatch } from "../../apis/matchApi";

const MatchCard = ({ match, fetchMatch, date, locationID }) => {
  const [owner, setOwner] = useState({});
  const userID = localStorage.getItem("userId");
  const [status, setStatus] = useState(match.status);
  const fetchOwner = async () => {
    try {
      const response = await getUserById(match.ownerID);
      setOwner(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChallenge = async () => {
    showModal();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await updateMatch(match.id, { opponentID: userID, status: 1 });
    fetchMatch(date, locationID);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchOwner();
  }, [status]);
  return (
    <div
      className="border border-blue-500 p-2 grid grid-cols-4 h-16 rounded shadow-lg  bg-white m-2"
      style={{ width: "90%" }}
    >
      <img
        src="https://tse3.mm.bing.net/th?id=OIP.hzI0H-nVKBNmz28kT8m2ugHaHa&pid=Api&P=0&h=180"
        alt="s"
        className="w-12 ml-3"
      />
      <div className="pr-2">
        <div>Tên: {owner?.username}</div>
        <div>Sđt: {owner?.phone}</div>
      </div>
      <div className="">
        <div>
          Thời gian: {match.start_time} - {match.end_time}
        </div>
        <div>Giá: {match.price}</div>
      </div>
      <div className="pl-3 flex justify-center items-center">
        {(() => {
          if (match.status == 1) {
            return (
              <Button type="" className="bg-gray-300 " disabled>
                Đã ghép cặp
              </Button>
            );
          } else if (userID == match.ownerID) {
            return (
              <Button type="primary" danger>
                Xóa
              </Button>
            );
          } else {
            return (
              <Button type="primary" onClick={handleChallenge}>
                Thách đấu
              </Button>
            );
          }
        })()}
      </div>
      <Modal
        title="Bạn có chắc chắn muốn thách đấu với người này không?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      ></Modal>
    </div>
  );
};

export default MatchCard;
