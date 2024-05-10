import Api from "./baseApi";

export const getCweIdByCveId = (cveId) => {
  return Api.get(`/cwe/cveId/${cveId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getCweById = (cweId) => {
  return Api.get(`/cwe/${cweId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getObservedByCweId = (cweId) => {
  return Api.get(`/cwe/observed/${cweId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getMitigationByCweId = (cweId) => {
  return Api.get(`/cwe/mitigation/${cweId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getDetectByCweId = (cweId) => {
  return Api.get(`/cwe/detect/${cweId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getCweByCapecId = (capecId) => {
  return Api.get(`/cwe/capecId/${capecId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

