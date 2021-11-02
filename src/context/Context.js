import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        const user = {
            token: state.token,
            role: state.role
        }
        localStorage.setItem('token', state.token);
        localStorage.setItem('role', state.role)

    }, [state.token, state.role])

    return (
        <Context.Provider
            value={
                {
                    token: state.token,
                    role: state.role,
                    isFetching: state.isFetching,
                    error: state.error,
                    dispatch,
                }
            }>
            {children}
        </Context.Provider>
    )
}