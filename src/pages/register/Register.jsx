import React from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import { useRef, useContext, useState, useEffect } from 'react';
import { Context } from '../../context/Context';
import { encryptData } from '../../config/utils'
import axios from 'axios';


export default function Register() {
    const emailRef = useRef();
    const pseudoRef = useRef();
    const passwordRef = useRef();
    const [successNewUser, setSuccessNewUser] = useState(null);
    const { dispatch, isFetching } = useContext(Context)



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/user/subscribe", {
                username: emailRef.current.value,
                name: pseudoRef.current.value,
                password: passwordRef.current.value,
            }).then((response) =>
                response.status == 201 && setSuccessNewUser(response.data.username)
            )
        } catch (err) {
            // Si erreur
        }
    }

    useEffect(() => {
        const login = async () => {
            // if (user != null) {
            dispatch({ type: "LOGIN_START" });
            try {
                const res = await axios.post("/login", {
                    username: emailRef.current.value,
                    password: passwordRef.current.value,
                })
                res.headers.authorization = encryptData(res.headers.authorization);
                dispatch({
                    type: "LOGIN_SUCESS",
                    payload: res,
                })
                window.history.replaceState(null, '', '/');

            } catch (err) {
                dispatch({ type: "LOGIN_FAILURE" });
            }
        }
        successNewUser && login();
    }, [successNewUser])

    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>

                <label>Email</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Entrez votre email"
                    ref={emailRef}
                    required />

                <label>Pseudo</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Entrez votre nom d'utilisateur"
                    ref={pseudoRef}
                    required />

                <label>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Entrez votre mdp"
                    ref={passwordRef}
                    required />

                <button className="registerButton" type="submit">Register</button>
            </form>

            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
        </div>
    )
}
