import * as actionTypes from "../constants/index";

const fetchDevices = (devices) => {
    return {
        type: actionTypes.DEVICE_ACTIONS.FETCH_ALL_DEVICES,
        payload: devices,
    };
};

const updateDevice = (device) => {
    return {
        type: actionTypes.DEVICE_ACTIONS.UPDATE_DEVICE,
        payload: device,
    };
};

export default {
    fetchDevices,
    updateDevice
};