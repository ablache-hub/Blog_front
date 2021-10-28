import ArticleListe from "../articleListe/ArticleListe"
import "./listeArticles.css"

export default function ListeArticles({listeArticles}) {

  

    return (
        <div className="posts">
            {listeArticles.map((article)=>(
                <ArticleListe key={article.id} article={article}/>
                    )
            )}
           
        </div>
    )
}
