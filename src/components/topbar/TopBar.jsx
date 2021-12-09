import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { decryptData } from "../../config/utils";


export default function TopBar() {
    const { token, dispatch } = useContext(Context);
    const [profilPic, setProfilPic] = useState([]);


    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    //Clean les params de l'url pour retour à la page "home" par defaut
    const cleanOnRefresh = () => {
        window.history.replaceState(null, '', '/');
        window.location.reload()
    }

    useEffect(() => {
        const fetchingProfilPic = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/api/user/myCredentials", { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    response.data.profilePicture && setProfilPic(response.data.profilePicture.id);
                }
                )
        }
        token && fetchingProfilPic();
    }, [])

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link" onClick={cleanOnRefresh}>
                            ACCUEIL
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">{token && "ÉCRIRE"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">A PROPOS</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">CONTACT</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    token != null ? (
                        <>
                            <Link to="/profil" className="linkLogout">
                                <img className="topImg"
                                    src={!profilPic.length == 0 ? process.env.REACT_APP_URL_API + "/file/getById/" + profilPic : "/assets/profil.png"}
                                    alt=""
                                />
                            </Link>
                            <Link to="/profil" className="linkLogout" className="link">PROFIL</Link>
                            <Link to="/" className="link" onClick={handleLogout}>LOGOUT</Link>
                        </>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link></li>
                            <li className="topListItem">
                                <Link className="link" to="/register">REGISTER</Link></li>
                        </ul>
                    )
                }
                <i className="topSearchIcon fas fa-search"></i>

            </div>
        </div>
    )
}
