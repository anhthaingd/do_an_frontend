import Api from "./baseApi";

export const getRoomByUserID = (userID) => {
  return Api.get(`/room/userID/${userID}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const updateRoom = (roomID) => {
  return Api.put(`/room/${roomID}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
