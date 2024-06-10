import actionTypes from "./actionTypes";
import { apiLogin, apiRegister } from "../../services/auth";
import { createInformation } from "../../apis/informationApi";
export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
        loginUserIDRd: response.data.userId,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data.token,
        role: response.data.role,
        loginUserIDRd: response.data.userId,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
