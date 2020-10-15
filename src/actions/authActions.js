const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

export default {
    setUser,
    logOut
}