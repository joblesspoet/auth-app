import {
    combineReducers
} from 'redux';

import authReduicer from './authReducers';
import deviceReducers from './deviceReducers';
import deviceRequestReducers from './deviceRequestReducers';

const appReducer = combineReducers({
    auth: authReduicer,
    device: deviceReducers,
    requests: deviceRequestReducers
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;