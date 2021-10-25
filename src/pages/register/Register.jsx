import React from 'react'
import './register.css'

export default function Register() {
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className="registerForm">
                <label>Username</label>
                <input type="text" className="registerInput" placeholder="Entrez votre nom d'utilisateur" />
                <label>Email</label>
                <input type="text" className="registerInput" placeholder="Entrez votre email" />

                <label>Password</label>
                <input type="password" className="registerInput" placeholder="Entrez votre mdp" />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">Register</button>
        </div>
    )
}
