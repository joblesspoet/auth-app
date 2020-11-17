const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
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
    logOut,
    loginError
}