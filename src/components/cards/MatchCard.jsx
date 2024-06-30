import React, { useEffect, useState } from "react";
import { getUserById } from "../../apis/userApi";
import { Button, Modal } from "antd";
import { deleteMatch, updateMatch } from "../../apis/matchApi";
import MatchModal from "../modal/MatchModal";
const MatchCard = ({ match, fetchMatch, date, locationID }) => {
  const [owner, setOwner] = useState({});
  const userID = localStorage.getItem("userId");
  const [status, setStatus] = useState(match.status);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const fetchOwner = async () => {
    try {
      const response = await getUserById(match.ownerID);
      setOwner(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    // try {
    //   await deleteMatch(match.id);
    //   fetchMatch(date, locationID);
    // } catch (error) {
    //   console.log(error);
    // }
    setIsModalOpen1(true);
  };
  const handleChallenge = async () => {
    showModal();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await updateMatch(match.id, { opponentID: userID, status: 1 });
    fetchMatch(date, locationID);
  };
  const handleOk1 = async () => {
    setIsModalOpen(false);
    await deleteMatch(match.id);
    fetchMatch(date, locationID);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const today = new Date();
  const abc = new Date(match.date);
  useEffect(() => {
    fetchOwner();
  }, [status]);
  const dateParts = match.date.split("-");
  const day = parseInt(dateParts[0]); // Lấy ngày
  const month = parseInt(dateParts[1]) - 1; // Lấy tháng và trừ đi 1
  const year = parseInt(dateParts[2]); // Lấy năm

  const matchTimeParts = match.start_time.split(":");
  const matchTime = new Date(
    year,
    month,
    day,
    parseInt(matchTimeParts[0]),
    parseInt(matchTimeParts[1])
  );
  return (
    <div className="w-full">
      <div className=" w-full">
        <div className="border border-blue-500 p-2 grid grid-cols-6 h-16 rounded shadow-lg  bg-white m-2 z-10">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.hzI0H-nVKBNmz28kT8m2ugHaHa&pid=Api&P=0&h=180"
            alt="s"
            className="w-12 ml-3 cursor-pointer"
            onClick={openPopup}
          />
          <div className="flex  items-center text-red-500">
            {match?.playground?.name}
          </div>
          <div className="pr-2">
            <div>Tên: {owner?.username}</div>
            <div>Sđt: {owner?.phone}</div>
          </div>
          <div className="col-span-2">
            <div>
              Thời gian: {match.start_time} - {match.end_time}
            </div>
            <div>Giá: {match.price}</div>
          </div>
          <div className="flex justify-center items-center">
            {(() => {
              if (match.status == 1 || matchTime < today || !match.isPublic) {
                return (
                  <Button type="" className="bg-gray-400 " disabled>
                    {match.status == 1 || !match.isPublic
                      ? "Đã ghép cặp"
                      : "Đã quá hạn"}
                  </Button>
                );
              } else if (userID == match.ownerID) {
                return (
                  <Button type="primary" danger onClick={handleDelete}>
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
          <Modal
            title="Bạn có chắc chắn muốn hủy trận đấu?"
            open={isModalOpen1}
            onOk={handleOk1}
            onCancel={handleCancel1}
            okText="Có"
            cancelText="Không"
          ></Modal>
        </div>
      </div>
      <div className="z-50">
        <MatchModal
          isOpen={isPopupOpen}
          onClose={closePopup}
          match={match}
          fetchMatch={fetchMatch}
        />
      </div>
    </div>
  );
};

export default MatchCard;
