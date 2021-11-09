import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import {encryptData} from '../config/cryptoJs'


const INITIAL_STATE = {
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') !== 'null' ? localStorage.getItem('token') : null,
    role: localStorage.getItem('role') || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem('token', state.token);
        localStorage.setItem('role', state.role);
        localStorage.setItem('username', state.username)

    }, [state.username, state.token, state.role])

    return (
        <Context.Provider
            value={
                {
                    username: state.username,
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