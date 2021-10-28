import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import './login.css'



export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/login", {
              username: userRef.current.value,
              password: passwordRef.current.value,
          }).then(res => {
            localStorage.setItem('user', res.headers.token)
           
          },
          console.log(localStorage)
            )
        } catch(err) {
            console.log(err)
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
                
                <button className="loginButton" type="submit">Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>

                </button>
        </div>
    )
}
