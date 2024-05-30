import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loginUserInfo, setLoginUserInfo] = useState(null);
  
  return (
    <AuthContext.Provider value={{ loginUserInfo, setLoginUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
