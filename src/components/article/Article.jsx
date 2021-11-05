import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import "./article.css"
import axios from "axios";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";



export default function Article() {
    // On récupère l'id dans l'url
    const location = useLocation();
    const path = location.pathname.split("/")[4];
    const { token, username } = useContext(Context)

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

    const handleDelete = async () => {
        await axios.delete("/article/auteur/" + username + "/delete/" + post.id,
            {
                headers: { 'Authorization': token }
            });
        window.location.replace("/")
    }


    return (
        console.log(post),
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/d/6/8d638f7cad_50170753_22048-yuekai-du-grand-banquet-copie.jpg" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">{post.titre}
                    {post.auteur ?
                        (
                            post.auteur.username === username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit"></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        ) : void 0
                    }
                  
                </h1>
                 <span className="singlePostDate">
                    {post.categorie &&
                        post.categorie.nom
                    }
                </span> 
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
