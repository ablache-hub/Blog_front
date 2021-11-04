import { Link } from "react-router-dom"
import "./post.css"

export default function ArticleListe({article}) {
    return (
        <div className="post">
            {console.log(article)}
            <img 
            className="postImg"
            src="https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"
            alt=""
            />
            <div className="postInfo">
                <div className="postCats">
                <span className="postCat">{article.categorie}</span>
            </div>
            {article.auteur ? 
             <Link to={`/author/${article.auteur}/post/${article.id}`}>
             <span className="postTitle">{article.titre}</span>
         </Link>
         :
         <Link to={`/author/null/post/${article.id}`}>
         <span className="postTitle">{article.titre}</span>
     </Link>
        }
            
            <hr/>
            <span className="postDate">{article.date}</span>
        </div>
        <p className="postDesc">{article.contenu}</p>
        </div>
    )
}
