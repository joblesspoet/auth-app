import * as actionTypes from "../constants/index";
import {API_INSTANCE, API_END_POINTS} from '../config/connection';


const actionRequestDevices = () => {
    return {
        type: actionTypes.DEVICE_ACTIONS.REQUEST_DEVICES,
    };
};

const actionRequestDevicesSuccess = (data) => {
    return {
        type: actionTypes.DEVICE_ACTIONS.REQUEST_DEVICES,
        payload: data
    };
};

const actionRequestDevicesError = (error) => {
    return {
        type: actionTypes.DEVICE_ACTIONS.REQUEST_DEVICES,
        payload: error
    };
};

const doGetDevices = () => {
    return async (dispatch) => {
        try {
            dispatch(actionRequestDevices());
            await API_INSTANCE.post(API_END_POINTS.DEVICE_END_POINTS.GET_ALL, {})
            .then((resp) => {
                console.log(resp)
                dispatch(
                    actionRequestDevicesSuccess(resp.data),
                );
              });
        } catch (exception) {
            dispatch(actionRequestDevicesError(exception.message));
        }
    }
}

export default {
    doGetDevices,
};