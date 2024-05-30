import Api from "./baseApi";

export const getLocationByType = (type) => {
  return Api.get(`/location/type/${type}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getLocationById = (id) => {
  return Api.get(`/location/${id}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getLocationByTypeLimit = (queryParams) => {
  return Api.get(`/location`, { params: queryParams })
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getLocationByUserID = (id) => {
  return Api.get(`/location/owner/${id}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const createLocation = (data) => {
  return Api.post("/location", data)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const updateLocation = (id, data) => {
  return Api.put(`/location/${id}`, data)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const deleteLocation = (id) => {
  return Api.delete(`/location/${id}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getAllLocation = () => {
  return Api.get("/location/all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
