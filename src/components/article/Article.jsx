import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import "./article.css"
import axios from "axios";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";
import { decryptData } from "../../config/utils";



export default function Article() {
    // On récupère l'id dans l'url
    const pathUrl = useLocation().pathname.split("/")[4];
    const { token, username } = useContext(Context);
    const [fetchArticle, setFetchArticle] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [categorieListe, setCategorieListe] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [title, setTitle] = useState('');
    const [contenu, setContenu] = useState('');


    //Fetching des articles de l'utilisateur
    useEffect(() => {
        const getArticle = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/article/get/" + pathUrl)
                .then((response) => {
                    setFetchArticle(response.data);
                    setCategorie(response.data.categorie.nom);
                    setTitle(response.data.titre);
                    setContenu(response.data.contenu);
                })
        }
        getArticle()
    }, [])


    //Fetching catégories (pour l'UPDATE)
    useEffect(() => {
        const fetchingCategories = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/api/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategories()
    }, [])


    //DELETE Article
   const handleDelete = async () => {
        await axios.delete(process.env.REACT_APP_URL_API + "/article/auteur/" + username + "/delete/" + fetchArticle.id,
            {
                headers: { 'Authorization': decryptData(token) }
            });
        window.location.replace("/")
    }


    //UPDATE Article
    const submitUpdate = async (e) => {
        e.preventDefault();
        const updatedArticle = {
            id: fetchArticle.id,
            titre: title,
            contenu
        }
        await axios.put(process.env.REACT_APP_URL_API + "/article/auteur/" + username + "/modify?categorie=" + categorie,
            updatedArticle,
            {
                headers: { 'Authorization': decryptData(token) }
            })
        window.location.replace("/author/" + username + "/post/" + fetchArticle.id)

    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src={fetchArticle.articlePicture ?
                        "http://localhost:8080/file/getById/" + fetchArticle.articlePicture.id : "https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"}
                    alt="" className="singlePostImg" />

                {!editMode ?
                    <>
                        <h1 className="singlePostTitle">{fetchArticle.titre}
                            {fetchArticle.auteur ?
                                (
                                    fetchArticle.auteur.username === username &&
                                    <div className="singlePostEdit">
                                        <i className="singlePostIcon far fa-edit" onClick={() => setEditMode(true)} />
                                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete} />
                                    </div>
                                ) : void 0
                            }
                        </h1>
                        <span className="singlePostDate">
                            {fetchArticle.categorie &&
                                fetchArticle.categorie.nom
                            }
                        </span>
                        <div className="singlePostInfo">
                            <span className="singlePostAutor">
                                {/* On doit tester l'existance d'un auteur avant l'affichage pour éviter une erreur "undefined" */}
                                {fetchArticle.auteur ?
                                    <Link className="link" to={`/?${fetchArticle.auteur.username}`}>
                                        <span className="postTitle">{fetchArticle.auteur.username}</span>
                                    </Link>
                                    : void 0
                                }
                            </span>
                            <span className="singlePostDate">{fetchArticle.date}</span>
                        </div>
                        <p className="singlePostDesc">{fetchArticle.contenu}</p>
                    </>
                    :
                    <>
                        <form action="" method="post" className="update-article" onSubmit={submitUpdate}>
                            <div className="singlePostTitleInput">
                                <div>
                                    <label htmlFor="titre">Titre: </label>
                                    <input
                                        defaultValue={fetchArticle.titre}
                                        type="text"
                                        name="titre"
                                        onChange={e => setTitle(e.target.value)}
                                        required />
                                </div>
                                <i className="far fa-times-circle" onClick={() => setEditMode(false)
                                } />

                            </div>

                            <label
                                htmlFor="cat-select">Catégorie:
                            </label>
                            <select
                                className="singlePostDate"
                                id="cat-select"
                                name="cat-select"
                                defaultValue={fetchArticle.categorie && fetchArticle.categorie.nom}
                                onChange={e => setCategorie(e.target.value)}>
                                <option defaultValue={fetchArticle.categorie && fetchArticle.categorie.nom} >
                                    {
                                        fetchArticle.categorie &&
                                        fetchArticle.categorie.nom}</option>
                                {
                                    categorieListe.map((categorie) => (
                                        <option defaultValue={categorie.nom}>{categorie.nom}</option>
                                    ))
                                }
                            </select>


                            <div className="form-example">
                                <label
                                    htmlFor="email">Contenu:
                                </label>
                                <input
                                    defaultValue={fetchArticle.contenu}
                                    type="text"
                                    name="contenu"
                                    className="contenu"
                                    onChange={e => setContenu(e.target.value)}
                                    required />
                            </div>

                            <div className="form-example">
                                <input type="submit" defaultValue="Modifier" />
                            </div>

                        </form>
                    </>
                }
            </div>
        </div>
    )
}
