import "./post.css"

export default function Post() {
    return (
        <div className="post">
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
            <span className="postTitle">Lorem, ipsum dolor sit
            </span>
            <hr/>
            <span className="postDate">1 hour ago</span>
        </div>
        <p className="postDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod repellat soluta tempore iure sunt temporibus architecto aliquid cum voluptatem, exercitationem, aliquam molestiae rerum iste nulla numquam. Asperiores nobis optio nemo facilis quibusdam laboriosam. Quis velit autem porro veniam aperiam perspiciatis, nostrum dolores amet rerum iste dolorum. Non et error est!</p>
        </div>
    )
}
