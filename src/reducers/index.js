import {
    combineReducers
} from 'redux';

import authReduicer from './authReducers';

const appReducer = combineReducers({
    auth: authReduicer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;