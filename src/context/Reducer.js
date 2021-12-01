const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                username: null,
                token: null,
                role: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCESS":
            return {
                username: action.payload.headers.username,
                token: action.payload.headers.authorization,
                role: action.payload.headers.role,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                username: null,
                token: null,
                role: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                username: null,
                token: null,
                role: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
}

export default Reducer;