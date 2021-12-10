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
                 <a href="https://ablache-hub.github.io/Portfolio/" target="_blank"
                        rel="noopener noreferrer" className="topIcon">
                        <i className="topIcon fas fa-id-card" />
                    </a>
                    <a href="https://www.linkedin.com/in/alexandre-blache-b476421bb/" target="_blank"
                        rel="noopener noreferrer" className="topIcon">
                        <i className="topIcon fab fa-linkedin" />
                        </a>
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
                        <Link to="/" className="link">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/contact" className="link">CONTACT</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    token != null ? (
                        <>
                            <Link to="/profil" className="linkLogout">
                                <img className="topImg"
                                    src={!profilPic.length == 0 ? process.env.REACT_APP_URL_API + "/api/file/get/getById/" + profilPic : "/assets/profil.png"}
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
