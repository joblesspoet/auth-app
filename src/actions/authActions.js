import * as actionTypes from "../constants/index";

const setUser = (userObj) => {
  return {
    type: actionTypes.SET_USER,
    payload: userObj,
  };
};

const loginSuccess = (loginObj) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: loginObj,
  };
};

const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

const loginError = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

const logOut = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const resetAuthValues = () => {
  return {
    type: actionTypes.RESET_AUTH_STATE,
  };
};

export default {
  setUser,
  loginRequest,
  logOut,
  loginError,
  loginSuccess,
  resetAuthValues,
};
