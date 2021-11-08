import ArticleListe from "../articleListe/ArticleListe"
import "./listeArticles.css"

export default function ListeArticles(props) {

  

    return (
        <div className="posts">
            {!props.listeArticles.length ? 
            <span>Aucun article</span> 
            :
            props.listeArticles.map((article)=>(
                <ArticleListe key={article.id} article={article} userUrl={props.userUrl}/>
                    )
            )}
           
        </div>
    )
}
