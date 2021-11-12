import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import "./article.css"
import axios from "axios";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";
import { decryptData } from "../../config/utils";



export default function Article() {
    // On récupère l'id dans l'url
    const location = useLocation();
    const pathUrl = location.pathname.split("/")[4];
    const { token, username } = useContext(Context)
    const [article, setArticle] = useState({})

    useEffect(() => {
        const getPost = async () => {
            await axios.get("/article/get/" + pathUrl)
                .then((response) => {
                    setArticle(response.data)
                })
        }
        getPost()
    }, [])

    const handleDelete = async () => {
        await axios.delete("/article/auteur/" + username + "/delete/" + article.id,
            {
                headers: { 'Authorization': decryptData(token) }
            });
        window.location.replace("/")
    }


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/d/6/8d638f7cad_50170753_22048-yuekai-du-grand-banquet-copie.jpg" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">{article.titre}
                    {article.auteur ?
                        (
                            article.auteur.username === username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit"></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        ) : void 0
                    }
                  
                </h1>
                 <span className="singlePostDate">
                    {article.categorie &&
                        article.categorie.nom
                    }
                </span> 
                <div className="singlePostInfo">
                    <span className="singlePostAutor">
                        {/* On doit tester l'existance d'un auteur avant l'affichage pour éviter une erreur "undefined" */}
                        {article.auteur ?
                            <Link className="link" to={`/?${article.auteur.username}`}>
                                <span className="postTitle">{article.auteur.username}</span>
                            </Link>
                            : void 0
                        }
                    </span>
                    <span className="singlePostDate">{article.date}</span>
                </div>
                <p className="singlePostDesc">{article.contenu}</p>
            </div>
        </div>
    )
}
