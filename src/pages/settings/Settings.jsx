import React from 'react'
import "./settings.css"
import Sidebar from '../../components/sidebar/Sidebar'

export default function Settings() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Mettre à jour compte</span>
                    <span className="settingsDeleteTitle">Supprimer compte</span>
                </div>
                <form className="settingsForm">
                    <label>Image profil</label>
                    <div className="settingsPP">
                        <img src="../../assets/profil.jpg" alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}} />
                    </div>
                    <label>Nom utilisateur</label>
                    <input type="text" placeholder="Alex" />
                    <label>Email</label>
                    <input type="email" placeholder="test@test.com" />
                    <label>Mdp</label>
                    <input type="password" />
                    <button className="settingsSubmit">Update</button>
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
