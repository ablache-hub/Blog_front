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
                <span className="postCat">Music</span>
                <span className="postCat">Life</span>
            </div>
            <span className="postTitle">{posts.titre}
            </span>
            <hr/>
            <span className="postDate">1 hour ago</span>
        </div>
        <p className="postDesc">{posts.contenu}</p>
        </div>
    )
}
