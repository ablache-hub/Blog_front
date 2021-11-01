export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCESS",
    payload: user,
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})