export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (userData) => ({
    type: "LOGIN_SUCESS",
    payload: userData,
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})

export const Logout = () => ({
    type: "LOGOUT"
})