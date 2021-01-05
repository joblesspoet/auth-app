import * as actionTypes from "../constants/index";
import {API_INSTANCE, API_END_POINTS} from '../config/connection';

const setUser = (userObj) => {
  return {
    type: actionTypes.AUTH_ACTIONS.SET_USER,
    payload: userObj,
  };
};

const loginSuccess = (loginObj) => {
  return {
    type: actionTypes.AUTH_ACTIONS.LOGIN_SUCCESS,
    payload: loginObj,
  };
};

const loginRequest = () => {
  return {
    type: actionTypes.AUTH_ACTIONS.LOGIN_REQUEST,
  };
};

const loginError = (error) => {
  return {
    type: actionTypes.AUTH_ACTIONS.LOGIN_FAILURE,
    payload: error,
  };
};

const logOut = () => {
  return {
    type: actionTypes.AUTH_ACTIONS.LOGOUT_SUCCESS,
  };
};

const resetAuthValues = () => {
  return {
    type: actionTypes.AUTH_ACTIONS.RESET_AUTH_STATE,
  };
};

/**
 * Login user to application.
 * @param {string} email | user email address
 * @param {string} password | user password as string
 */
const doUserLogin = (email, password) => {
  return async (dispatch) => {
    try {
      await API_INSTANCE.post(API_END_POINTS.AUTH_END_POINTS.LOGIN, {
        email: email,
        password: password,
      }).then((resp) => {
        dispatch(
          loginSuccess({
            access_token: resp.access_token,
            user: resp.user,
          }),
        );
        dispatch(setAuthorizationHeader());
      });
    } catch (error) {
      if (error.message === 'Network Error') {
        dispatch(loginError('Network error detected.'));
      } else if (error?.response?.status === 422) {
        dispatch(loginError(error?.response?.data.errors));
      } else {
        dispatch(loginError(error.message));
      }
    }
  };
};

/**
 * Logout User from Application
 */
const doUserLogout = () => {
  return async (dispatch, getState) => {
    // console.log(getState().auth);
    // console.log(email, password);
    // dispatch(loginRequest());
    try {
      await API_INSTANCE.post(API_END_POINTS.AUTH_END_POINTS.LOGOUT).then(
        (resp) => {
          dispatch(logOut());
        },
      );
    } catch (error) {
      if (error.message === 'Network Error') {
        dispatch(loginError('Network error detected.'));
      } else if (error.response.status === 401) {
        console.log(error.message);
        dispatch(logOut());
      } else {
        dispatch(loginError(error.message));
      }
    }
  };
};

const setAuthorizationHeader = () => {
  return async (dispatch, getState) => {
    const objAuth = getState().auth;
    API_INSTANCE.interceptors.request.use(
      async (conf) => {
        if (objAuth.access_token && !conf.headers.Authorization) {
          conf.headers.Authorization = `Bearer ${objAuth.access_token}`;
        }
        return conf;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  };
};
export default {doUserLogin, doUserLogout};
