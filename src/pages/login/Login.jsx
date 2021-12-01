import axios from 'axios';
import React from 'react'
import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import { encryptData } from '../../config/utils'
import './login.css'

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
           let res = await axios.post(process.env.REACT_APP_URL_API + "/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            res.headers.authorization = encryptData(res.headers.authorization);
            dispatch({
                type: "LOGIN_SUCESS",
                payload: res,
            })

            // window.history.replaceState(null, '', '/');

            //   .then(res => {
            //     if (res.headers.authorization) {
            //         const user = {
            //             token: res.headers.authorization,
            //             role: res.data
            //         }

            //         const stockage = () => {

            //              localStorage.setItem('user', JSON.stringify(user));
            //           /*  const res = await SecureStore.getItemAsync('user');
            //             const objRes = JSON.parse(res);
            //             console.log("test" + objRes.token);*/
            //         }
            //         stockage();
            //     } 
            //     console.log(localStorage.getItem('user'))
            // },
            //     )
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Entrez votre identifiant"
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Entrez votre mdp"
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}