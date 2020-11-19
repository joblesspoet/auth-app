const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
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

export default {
    setUser,
    loginRequest,
    logOut,
    loginError
}