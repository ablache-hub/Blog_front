const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return{
                token:null,
                role: null,
                isFetching:true,
                error:false,
            };
        case "LOGIN_SUCESS":
            return{
                token:action.payload.headers.authorization,
                role:action.payload.data,
                isFetching:false,
                error:false,
            };
            case "LOGIN_FAILURE":
                return{
                    token:null,
                    role: null,
                    isFetching:false,
                    error:true,
                };
        default:
            return state;
    }
}

export default Reducer;