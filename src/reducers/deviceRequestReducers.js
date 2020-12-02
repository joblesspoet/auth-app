import * as actionTypes from "../constants/index";

const initialState = {
    requests: [],    
    is_loading: false,
    lastError: undefined,
    hasError: false,
  };

  const requestReducer = (state = initialState, action) => {
    switch(action.type){
        
        case actionTypes.DEVICE_REQUESTS_ACTIONS.FETCH_ALL_REQUESTS:
            return {
                ...state,
                is_loading: false,
                requests: action.payload
            }

        case actionTypes.DEVICE_REQUESTS_ACTIONS.UPDATE_REQUEST:
            return {
                ...state,
                requests: state.requests.map(
                    (item) => item.id === action.payload.id ? { ...item,
                        request_status: action.payload.request_status
                    } :
                    item)
            }

        default:
            return state;
    }
  }

  export default requestReducer;