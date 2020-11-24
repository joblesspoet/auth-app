import * as actionTypes from "../constants/index";

const initialState = {
    devices: [],    
    is_loading: false,
    lastError: undefined,
    hasError: false,
  };

  const deviceReducer = (state = initialState, action) => {
    switch(action.type){
        
        case actionTypes.DEVICE_ACTIONS.FETCH_ALL_DEVICES:
            return {
                ...state,
                is_loading: false,
                devices: action.payload
            }

        case actionTypes.DEVICE_ACTIONS.UPDATE_DEVICE:
            return {
                ...state,
                devices: state.devices.map(
                    (item) => item.id === action.payload.id ? { ...item,
                        status: action.payload.status
                    } :
                    item)
            }

        default:
            return state;
    }
  }

  export default deviceReducer;