import Api from "./baseApi";

export const getCommentsByPostID = (postID) => {
  return Api.get(`/commentpost/postID/${postID}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const createCommentPost = (comment) => {
  return Api.post(`/commentpost`, comment)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};

export const deleteCommentPost = (commentId) => {
  return Api.delete(`/commentpost/${commentId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về từ response ở đây
      return response.data;
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      throw error;
    });
};
