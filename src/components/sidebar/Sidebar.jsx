import "./sidebar.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Sidebar() {

    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/api/categorie/getAll")
                .then((response) => {
                    setCategorie(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">A PROPOS</span>
                <p>Bienvenue sur mon blog. Vous pouvez en tester les fonctionnalités librement.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" className="link">Toutes</Link>
                    </li>
                    {categorie.map((categorie) => (
                        <li className="sidebarListItem" key={categorie.id}>
                            <Link to={`?cat=${categorie.nom}`} className="link">{categorie.nom}</Link>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
