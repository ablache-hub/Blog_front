import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function TopBar() {
    const { token, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    //Clean les params de l'url pour retour à la page "home" par defaut
    const cleanOnRefresh =() => {
        window.history.replaceState(null, '', '/');
        window.location.reload()
    }

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
                        <Link to="/" className="link">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">{token && "WRITE"}</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        <Link to="/" className="link">{token && "LOGOUT"}</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {console.log(token)}
                {token != null ? (
                    <img className="topImg" src="/assets/profil.jpg" alt=""></img>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">LOGIN</Link></li>
                        <li className="topListItem">
                            <Link className="link" to="/register">REGISTER</Link></li>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
