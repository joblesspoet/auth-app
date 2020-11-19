const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const loginSuccess = (loginObj) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: loginObj
    }
}

const loginRequest = () => {
    return {
        type: "LOGIN_REQUEST"        
    }
}

const loginError = (error) => {
    return {
        type: "LOGIN_FAILURE",
        payload: error
    }
}

const logOut = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

const resetAuthValues = () => {
    return {
        type: "RESET_AUTH_STATE"
    }
}

export default {
    setUser,
    loginRequest,
    logOut,
    loginError,
    loginSuccess,
    resetAuthValues
}