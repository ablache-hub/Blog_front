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
            await axios.get("/api/user/myCredentials", { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    response.data.profilePicture && setProfilPic(response.data.profilePicture.id);
                }
                )
        }
        fetchingProfilPic();

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
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">{token && "WRITE"}</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">ABOUT</Link>
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
                            <img className="topImg"
                                src={!profilPic.length == 0 ? "http://localhost:8080/file/getById/" + profilPic : "/assets/profil.png"}
                                alt=""
                            />
                            <Link to="/profil" className="linkLogout">PROFIL</Link>
                            <Link to="/" className="linkLogout" onClick={handleLogout}>LOGOUT</Link>
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
