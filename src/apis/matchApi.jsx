import Api from "./baseApi";

export const createMatch = (data) => {
  return Api.post(`/match`, data)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const getMatchByDateAndPlaygroundID = (date, playgroundID) => {
  return Api.post(`/match/date/playground`, { date, playgroundID })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMatchByDateAndLocationID = (date, locationID) => {
  return Api.post(`/match/date/location`, { date, locationID })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateMatch = (id, data) => {
  return Api.put(`/match/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteMatch = (id) => {
  return Api.delete(`/match/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMatchByUserID = (userID) => {
  return Api.get(`/match/user/${userID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMatchByID = (id) => {
  return Api.get(`/match/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
