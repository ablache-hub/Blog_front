import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
    const { token, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem" ><Link to="/" className="link">HOME</Link></li>
                    <li className="topListItem"><Link to="/" className="link">ABOUT</Link></li>
                    <li className="topListItem"><Link to="/" className="link">CONTACT</Link></li>
                    <li className="topListItem"><Link to="/write" className="link">WRITE</Link></li>
                    <li className="topListItem" onClick={handleLogout}>{token && "LOGOUT"}</li>
                </ul>
            </div>
            <div className="topRight">
                {token ? (
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
