import * as actionTypes from "../constants/index";

const fetchRequests = (requests) => {
    return {
        type: actionTypes.DEVICE_REQUESTS_ACTIONS.FETCH_ALL_REQUESTS,
        payload: requests,
    };
};

const updateRequest = (request) => {
    return {
        type: actionTypes.DEVICE_REQUESTS_ACTIONS.UPDATE_REQUEST,
        payload: request,
    };
};

export default {
    fetchRequests,
    updateRequest
};