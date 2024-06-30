import React, { useContext, useEffect, useRef, useState } from "react";
import { sendMessage } from "../../apis/chatApi";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";

const ChatModal = ({ isOpen, onClose, buttonRef }) => {
  const loginUserID = localStorage.getItem("userId");
  const receiverID = useParams().id;
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { socket } = useContext(ChatContext);
  const onSend = async () => {
    const res = await sendMessage({
      senderID: loginUserID,
      receiverID,
      message,
    });
    // setNewMessage(res.data);
    if (res.success) {
      socket.emit("sendMessage", {
        newMessage: res.data,
        senderID: loginUserID,
        receiverID,
      });
    }
    navigate("/chat");
  };
  // useEffect(() => {
  //   if (!socket || !newMessage) return;

  //   socket.emit("sendMessage", {
  //     newMessage,
  //     senderID: loginUserID,
  //     receiverID,
  //   });
  // }, [socket, newMessage, loginUserID]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-gray-300 p-4 mt-2 w-80 h-52 rounded shadow-lg z-50"
      style={{ top: position.top, left: position.left }}
      ref={modalRef}
    >
      <h2 className="text-lg font-bold mb-4 text-black">Nhắn tin</h2>
      <textarea
        className="w-full p-2 border rounded mb-4 text-black"
        rows="2"
        placeholder="Nhập tin nhắn..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="flex justify-end items-center">
        <div>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            className={`px-4 py-2 rounded ${
              message ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => onSend(message)}
            disabled={!message}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
