import "./singlePost.css"

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/d/6/8d638f7cad_50170753_22048-yuekai-du-grand-banquet-copie.jpg" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">Lorem, ipsum.
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAutor">Author</span>
                    <span className="singlePostDate">1 h</span>
                </div>
                <p className="singlePostDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iure voluptas necessitatibus totam accusamus eveniet laboriosam quisquam, dicta eaque beatae earum perferendis repellendus ea corrupti, temporibus maxime neque ex exercitationem, sunt quos deserunt rerum cumque. Magnam totam veritatis, corporis animi autem nam soluta ex earum inventore debitis unde dolorem, porro necessitatibus. Sit, inventore. Repellat provident explicabo consequatur, eum mollitia dignissimos ratione natus sint quidem, repellendus sed possimus nostrum cumque, nam perferendis nesciunt suscipit eligendi odio fugit dolorem distinctio tempore eaque aliquid! Ex, dolores eum saepe ipsa eos repudiandae perferendis quo architecto assumenda, fugit consequuntur ut et maxime, sunt velit minus!</p>
            </div>
        </div>
    )
}
