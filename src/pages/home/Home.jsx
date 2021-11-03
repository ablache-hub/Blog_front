import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header"
import ListeArticles from "../../components/listeArticles/ListeArticles"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import { Context } from "../../context/Context";


export default function Home() {

    const [fetchArticle, setFetchArticle] = useState([])

    //Extraction username de l'url pour le fetching API des articles d'un utilisateur précis
    const location = (useLocation().search).replace("?", "");
    const {token, username} = useContext(Context)


    useEffect(() => {
        const fetchingArticle = async () => {
            //Si username dans l'url, on récup ses articles
            location ?
                await axios.get("/api/user/get/" + location)
                    .then((response) => {
                        setFetchArticle(response.data.articles)
                    })
                //Sinon on charge la liste générique
                :
                await axios.get("/article/get/all")
                    .then((response) => {
                        setFetchArticle(response.data)
                    })
        }
        fetchingArticle()
    }, [])

    return (
        <>
            <Header />
            <div className="home">
                {fetchArticle ? <ListeArticles listeArticles={fetchArticle} />
                    :
                    <p>Aucun article</p>
                }
                <Sidebar />
            </div>
        </>
    )
}