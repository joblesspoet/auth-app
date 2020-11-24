import {
    combineReducers
} from 'redux';

import authReduicer from './authReducers';
import deviceReducers from './deviceReducers';

const appReducer = combineReducers({
    auth: authReduicer,
    device: deviceReducers
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;