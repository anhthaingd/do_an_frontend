import React, { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [guest, setGuest] = useState();
  const [messages, setMessages] = useState([]);
  const [isChange, setIsChange] = useState(false);
  return (
    <ChatContext.Provider
      value={{ messages, setMessages, guest, setGuest, isChange, setIsChange }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
