import { Link } from "react-router-dom"
import "./articleListe.css"

export default function ArticleListe(props) {
    console.log(props)
    return (
        <div className="post">
            <img
                className="postImg"
                src={props.article.articlePicture ?
                    process.env.REACT_APP_URL_API + "/file/get/getById/" + props.article.articlePicture.id :
                    "https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"}

                alt={props.article.articlePicture &&
                    props.article.articlePicture.name
                }
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">
                        {props.article.categorie &&
                            props.article.categorie.nom}
                    </span>
                </div>
                {props.article.auteur ?
                    <Link to={`/author/${props.article.auteur.username}/post/${props.article.id}`}>
                        <span className="postTitle">{props.article.titre}</span>
                    </Link>
                    :
                    <Link to={`/author/${props.userUrl}/post/${props.article.id}`}>
                        <span className="postTitle">{props.article.titre}</span>
                    </Link>
                }
                {props.article.auteur &&
                    <span className="postAuteur">Par: {props.article.auteur.name}</span>
                }
                <span className="postDate">{props.article.date.slice(0, -10)}</span>
            </div>
            <p className="postDesc">{props.article.contenu}</p>
        </div>
    )
}
