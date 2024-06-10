import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
  msg: "",
  userId: "",
  role: 0,
  loginUserIDRd: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: "",
        loginUserIDRd: action.loginUserIDRd,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data,
        token: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: "",
        role: action.role,
        loginUserIDRd: action.loginUserIDRd,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data,
        token: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loginUserIDRd: null,
        isLoggedIn: false,
        token: null,
        msg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
