import * as actionTypes from "../constants/index";

const initialState = {
  devices: [],
  lastError: null,
  is_request: false,
  my_requests: [],
  logs: []
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.DEVICE_ACTIONS.REQUEST_DEVICES:
      return {
        ...state,
        is_request: true,
      };
      
    case actionTypes.DEVICE_ACTIONS.FETCH_ALL_DEVICES_SUCCESS:
      return {
        ...state,
        is_request: false,
        devices: action.payload,
        lastError: null,
      };

    case actionTypes.DEVICE_ACTIONS.FETCH_ALL_DEVICES_ERROR:
      return {
        ...state,
        lastError: action.payload,
        is_request: false,
      };

    default:
      return state;
  }
};

export default deviceReducer;
