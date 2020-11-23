import * as actionTypes from "../constants/index";

const initialState = {
  user: {},
  access_token: null,
  is_logged_in: false,
  is_loading: false,
  lastError: undefined,
  hasError: false,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        is_loading: true,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        is_loading: false,
        hasError: true,
        lastError: action.payload,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        is_loading: false,
        hasError: false,
        lastError: undefined,
        is_logged_in: true,
        user: action.payload,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        is_loading: false,
        hasError: false,
        lastError: undefined,
        is_logged_in: true,
        user: action.payload.user,
        access_token: action.payload.access_token,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        is_loading: true,
      };

    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        hasError: true,
        lastError: action.payload,
        is_loading: false,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        is_loading: false,
        hasError: false,
        lastError: undefined,
        is_logged_in: false,
        user: null,
        access_token: null,
      };

    case actionTypes.RESET_AUTH_STATE:
      return initialState;

    default:
      return state;
  }
};

export default currentUser;
