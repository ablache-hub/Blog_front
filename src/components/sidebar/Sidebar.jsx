import "./sidebar.css"
import { useEffect, useState } from "react";
import axios from "axios";


export default function Sidebar() {

    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get("/api/categorie/getAll")
                .then((response) => {
                    setCategorie(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, exercitationem.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {categorie.map((categorie) => (
                        <li className="sidebarListItem"><a href={`/?cat=${categorie.nom}`}>{categorie.nom}</a></li>
                    )
                    )}
                </ul> 
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
