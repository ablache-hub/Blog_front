import { Link } from "react-router-dom"
import "./post.css"

export default function Post({posts}) {
    return (
        <div className="post">
            {console.log(posts)}
            <img 
            className="postImg"
            src="https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"
            alt=""
            />
            <div className="postInfo">
                <div className="postCats">
                <span className="postCat">{posts.categorie}</span>
            </div>
            <Link to={`/post/${posts.id}`}>            
                <span className="postTitle">{posts.titre}</span>
            </Link>
            <hr/>
            <span className="postDate">{posts.date}</span>
        </div>
        <p className="postDesc">{posts.contenu}</p>
        </div>
    )
}
