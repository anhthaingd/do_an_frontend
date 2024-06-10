import { AimOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import EditableField from "./EditableField"; // Đảm bảo import đúng đường dẫn
import { updateMatch } from "../../apis/matchApi";
import { getMemberByUserID } from "../../apis/memberApi";
import { createUserPost } from "../../apis/userPostApi";
import { createPost } from "../../apis/postApi";
const MatchModal = ({ isOpen, onClose, match, fetchMatch }) => {
  const loginUserID = localStorage.getItem("userId");
  const [ownerUsername, setOwnerUsername] = useState(match?.owner?.username);
  const [opponentUsername, setOpponentUsername] = useState(
    match?.opponent?.username || "Chưa có"
  );
  const [score, setScore] = useState(match?.result || "Chưa có");
  const [startTime, setStartTime] = useState(match?.start_time);
  const [endTime, setEndTime] = useState(match?.end_time);
  const [price, setPrice] = useState(match?.price);
  const [notes, setNotes] = useState(match?.note || "");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [myGroup, setMyGroup] = useState([]);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleUpdate = async () => {
    const res = await updateMatch(match.id, { result: score, note: notes });
    console.log(res);
    // fetchMatch();
    onClose();
  };
  const fetchMyGroup = async () => {
    try {
      const response = await getMemberByUserID(loginUserID);
      setMyGroup(response.data);
    } catch (error) {
      console.error("Fetch group error: ", error);
    }
  };
  const shareToProfile = async () => {
    const post = {
      ownerID: loginUserID,
      writerID: loginUserID,
      matchID: match?.id,
    };
    const res = await createUserPost(post);
    closeModal();
  };

  const shareToGroup = async (groupID) => {
    const post = {
      groupID: groupID,
      userID: loginUserID,
      matchID: match?.id,
    };
    const res = await createPost(post);
    console.log(res);
    closeModal();
  };
  useEffect(() => {
    fetchMyGroup();
  }, []);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-3/4 overflow-y-auto">
        <div className="flex justify-end pb-2">
          <button
            onClick={() => {
              onClose();
              setNotes(match?.note || "");
              setScore(match?.result || "Chưa có");
            }}
            className="text-gray-400 hover:text-red-500 text-2xl"
          >
            ✖
          </button>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-2xl font-bold">
              {match?.location?.name} ({match?.playground?.name})
            </p>
            <div className="flex items-center mt-2">
              <AimOutlined
                className="text-gray-700"
                style={{ fontSize: "20px" }}
              />
              <p className="text-lg ml-2">{match?.location?.location_detail}</p>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <p className="text-xl font-semibold">Thông tin trận đấu</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <EditableField
              label="Chủ nhà"
              value={ownerUsername}
              onChange={setOwnerUsername}
              canEdit={false}
              user={match?.owner}
            />
            <EditableField
              label="Đối thủ"
              value={opponentUsername}
              onChange={setOpponentUsername}
              canEdit={false}
              user={match?.opponent}
            />
            <EditableField
              label="Tỉ số"
              value={score}
              onChange={setScore}
              canEdit={true}
            />
            <EditableField
              label="Thời gian"
              value={`${startTime} - ${endTime}`}
              onChange={(value) => {
                const [newStartTime, newEndTime] = value.split("-");
                setStartTime(newStartTime.trim());
                setEndTime(newEndTime.trim());
              }}
              canEdit={false}
            />
            <EditableField label="Giá" value={price} onChange={setPrice} />
            <EditableField
              label="Ghi chú"
              value={notes}
              onChange={setNotes}
              canEdit={true}
            />
          </div>
        </div>

        {loginUserID == match?.ownerID ||
        loginUserID == match?.opponentID ||
        loginUserID == match?.location?.ownerID ? (
          <div className="flex justify-end gap-2">
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Lưu
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={openModal}
              >
                Chia sẻ
              </button>
            </div>
            {modalIsOpen && (
              <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
                <div className="bg-white p-4 w-80 rounded shadow-lg relative">
                  <h2 className="text-lg font-bold mb-4">Chia sẻ</h2>
                  <div>
                    <p
                      className="p-2 bg-gray-300 rounded cursor-pointer hover:text-white hover:bg-blue-300"
                      onClick={shareToProfile}
                    >
                      Trang cá nhân
                    </p>
                    {myGroup.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="p-2 bg-gray-300 rounded mt-2 cursor-pointer hover:text-white hover:bg-blue-300"
                          onClick={() => shareToGroup(item?.group?.id)}
                        >
                          {item?.group?.name}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 "
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MatchModal;
