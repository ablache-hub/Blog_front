import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header"
import ListeArticles from "../../components/listeArticles/ListeArticles"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"


export default function Home() {

    const [fetchArticle, setFetchArticle] = useState([])

    //Extraction username de l'url pour le fetching API des articles d'un utilisateur précis
    const location = useLocation().search.replace("?", "");

    location.includes("cat=") ? console.log(location.replace("cat=", "")) : console.log(location)


    useEffect(() => {
        const fetchingArticle = async () => {
            //Si catégorie dans URL, on récup la catégorie et on fetch avec
            location.includes("cat=") ?
                await axios.get("/article/get/allByCategorie/" + location.replace("cat=", ""))
                    .then((response) => {
                        setFetchArticle(response.data)
                    })
                :
                //Sinon si param dans l'URL mais pas de "cat=" (donc username)
                (location ?
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
                )
        }
        fetchingArticle()
    }, [])

    return (
        <>
            <Header />
            <div className="home">
                {fetchArticle ? <ListeArticles listeArticles={fetchArticle} userUrl={location} />
                    :
                    <p>Aucun article</p>
                }
                <Sidebar />
            </div>
        </>
    )
}