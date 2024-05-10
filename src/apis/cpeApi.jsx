import Api from "./baseApi";

export const getCpeByCveId = (cveId) => {
  return Api.get(`/cpe/cveId/${cveId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
