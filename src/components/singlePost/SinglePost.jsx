import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import "./singlePost.css"
import axios from "axios";

export default function SinglePost() {
    // On récupère l'id dans l'url
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const [post, setPost] = useState({})

    useEffect(() => {
        const getPost = async () => {
            await axios.get("/article/" + path)
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
                        {/* La promesse doit être testée pour éviter une erreur "undefined" */}
                        {post.auteur ? post.auteur.username : void 0}
                    </span>
                    <span className="singlePostDate">{post.date}</span>
                </div>
                <p className="singlePostDesc">{post.contenu}</p>
            </div>
        </div>
    )
}
