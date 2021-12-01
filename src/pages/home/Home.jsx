import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header"
import ListeArticles from "../../components/listeArticles/ListeArticles"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import Pagination from "../../config/pagination";

export default function Home() {

    const [fetchArticle, setFetchArticle] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    //Extraction username de l'url pour le fetching API des articles d'un utilisateur précis
    const location = useLocation().search.replace("?", "");

    useEffect(() => {
        const fetchingArticle = async () => {
            //Si catégorie dans URL, on récup la catégorie et on fetch avec
            location.includes("cat=") ?
                await axios.get(process.env.REACT_APP_URL_API + "/article/get/allByCategorie/" + location.replace("cat=", ""))
                    .then((response) => {
                        setFetchArticle(response.data)
                    })
                :
                //Sinon si param dans l'URL mais pas de "cat=" (donc username)
                (location ?
                    await axios.get(process.env.REACT_APP_URL_API + "/api/user/get/" + location)
                        .then((response) => {
                            setFetchArticle(response.data.articles)
                        })
                    //Sinon on charge la liste générique
                    :
                    await axios.get(process.env.REACT_APP_URL_API + "/article/get/all")
                        .then((response) => {
                            setFetchArticle(response.data)
                        })
                )
        }
        fetchingArticle()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = fetchArticle.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div className="home">
                <article className="paginate-list">
                    <Pagination className="pagination" postPerPage={postsPerPage} totalPosts={fetchArticle.length} paginate={paginate} />
                    {
                        fetchArticle ?
                            <ListeArticles listeArticles={currentPosts} userUrl={location} />
                            :
                            <p>Aucun article</p>
                    }
                    <Pagination className="pagination" postPerPage={postsPerPage} totalPosts={fetchArticle.length} paginate={paginate} />
                </article>
                <Sidebar />
            </div>
        </>
    )
}