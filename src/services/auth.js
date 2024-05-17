import axiosConfig from "../apis/axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/auth/register",
        data: payload,
      });
      localStorage.setItem("userId", response.data.userId);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/auth/login",
        data: payload,
      });
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
