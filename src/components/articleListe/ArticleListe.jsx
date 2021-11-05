import { Link } from "react-router-dom"
import "./articleListe.css"

export default function ArticleListe(props) {
    return (
        <div className="post">
            <img
                className="postImg"
                src="https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">
                        {props.article.categorie &&
                            props.article.categorie.nom}
                    </span>
                </div>
                {props.article.auteur ?
                    <Link to={`/author/${props.article.auteur}/post/${props.article.id}`}>
                        <span className="postTitle">{props.article.titre}</span>
                    </Link>
                    :
                    <Link to={`/author/${props.userUrl}/post/${props.article.id}`}>
                        <span className="postTitle">{props.article.titre}</span>
                    </Link>
                }

                <hr />
                <span className="postDate">{props.article.date}</span>
            </div>
            <p className="postDesc">{props.article.contenu}</p>
        </div>
    )
}
