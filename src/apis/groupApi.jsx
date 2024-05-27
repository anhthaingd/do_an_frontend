import Api from "./baseApi";

export const createGroup = (data) => {
  return Api.post("/group", data)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getGroupById = (id) => {
  return Api.get(`/group/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}