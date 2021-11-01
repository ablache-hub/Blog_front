import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import "./article.css"
import axios from "axios";
import { Link } from "react-router-dom"


export default function Article() {
    // On récupère l'id dans l'url
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})

    useEffect(() => {
        const getPost = async () => {
            await axios.get("/article/get/" + path)
                .then((response) => {
                    setPost(response.data)
                })
        }
        getPost()
    }, [path])


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/d/6/8d638f7cad_50170753_22048-yuekai-du-grand-banquet-copie.jpg" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">{post.titre}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAutor">
                        {/* On doit tester l'existance d'un auteur avant l'affichage pour éviter une erreur "undefined" */}
                        {post.auteur ?
                            <Link className="link" to={`/?${post.auteur.username}`}>
                                <span className="postTitle">{post.auteur.username}</span>
                            </Link>
                            : void 0
                        }
                    </span>
                    <span className="singlePostDate">{post.date}</span>
                </div>
                <p className="singlePostDesc">{post.contenu}</p>
            </div>
        </div>
    )
}
