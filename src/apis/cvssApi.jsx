import Api from "./baseApi";

export const getCvssByCveId = (cveId) => {
  return Api.get(`/cvss/cveId/${cveId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
