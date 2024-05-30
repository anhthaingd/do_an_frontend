import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatBox = () => {
  const { messages } = useContext(ChatContext);
  const loginUserID = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="h-full bg-gray-900">
      <div className="flex flex-col space-y-4 p-4 bg-gray-900 text-white ">
        {messages.map((message, index) => {
          const isLoginUser = message.senderID == loginUserID;
          return (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs ${
                isLoginUser ? "bg-blue-500 self-end" : "bg-gray-700 self-start"
              }`}
            >
              {message.message}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;
