import { Link } from "react-router-dom";
import "./topbar.css"
import { useEffect, useState } from "react";

export default function TopBar() {

    const [isLog, setisLog] = useState(["alright"]);

    const logout = () => {
        localStorage.clear();
        setisLog(false);
        // console.log("clean");
    }



    useEffect(() => {

    }, [])

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
                    {localStorage.getItem('user') ?
                        <li className="topListItem"><Link to="/write" className="link">WRITE</Link></li>
                        : void 0
                    }
                    <li className="topListItem">
                        {localStorage.getItem('user') &&
                            <Link to="/" onClick={() => {
                                logout();
                            }} className="link">{isLog}</Link>}
                    </li>
                    {isLog ?
                        <li>
                            <Link
                                to="/"
                                className="link"
                                onClick={
                                    () => isLog == "ok" ? setisLog("ça marche") : setisLog("ok")}>
                                test
                            </Link>
                        </li>
                        : void 0}
                </ul>
            </div>
            <div className="topRight">
                {localStorage.getItem('user') ? (
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
