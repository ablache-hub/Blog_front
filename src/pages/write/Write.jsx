import "./write.css";
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";
import { decryptData } from '../../config/utils'



export default function Write() {

    const [title, setTitle] = useState(null);
    const [contenu, setContenu] = useState(null);
    const [newId, setnewId] = useState(null);
    const { username, token } = useContext(Context);
    const [categorieListe, setCategorieListe] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [articlePic, setArticlePic] = useState(null);
    const newArticle = new FormData();
    const [error, catchError] = useState(null);
    const [errorPopup, showErrorPopup] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!articlePic || !title || !contenu || !categorie.length) {
            !articlePic && catchError('pic')
            !title && catchError('titre')
            !contenu && catchError('contenu')
            !categorie.length && catchError('categorie')
        }
        else {
            newArticle.append('username', username)
            newArticle.append('titre', title);
            newArticle.append('contenu', contenu);
            newArticle.append('categorie', categorie);
            newArticle.append('picture', articlePic);


            await axios.post("/article/new/",
                newArticle,
                {
                    headers: {
                        'Authorization': decryptData(token),
                        'Content-Type': 'multipart/form-data',
                        'Boundary': '0340540654654034134'
                    }
                }).then((response) => {
                    setnewId(response.data.id);
                });
        }
    }

    //Après avoir POST, on redirige vers l'article nouvellement crée grâve à l'Id récup dans la reponse
    useEffect(() => {
        newId &&
            window.location.replace("/author/" + username + "/post/" + newId);
    }, [newId])

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get("/api/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategorie()
    }, [])


    // useEffect(() => {
    //     bodyFormData.append('file', profilePic);
    //     const postArticlePic = async () => {
    //         await axios.post("/file/user/" + username + "/upload", bodyFormData,
    //             {
    //                 headers: {
    //                     'Authorization': decryptData(token),
    //                     'Content-Type': 'multipart/form-data',
    //                     'Boundary': '0340540654654034134'
    //                 }
    //             });
    //         window.location.reload();
    //     }
    //     //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
    //     postProfilePic();

    // }, [articlePic])

    useEffect(() => {
        error && showErrorPopup(true)
        setTimeout(() => {
            showErrorPopup(false)
        }, 3000);
    }, [error])

    return (

        <div className="write">
            {/* {errorPopup &&
                <div className='error'>
                    {error === 'pic' ? "Veuillez ajouter une image"
                        : error === 'contenu' ? 'Contenu obligatoire' :
                            error === 'titre' ? 'Titre requis' :
                                error === 'categorie' ? 'Veuillez selectionner une catégorie' : void 0}
                </div>} */}

            <img
                className="writeImg"
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/24132/images/CD4UFNxlQ8GgBMHtv9dR_010-reussir-photo-paysage.jpg" alt="" />

            <form className="writeForm"
                onSubmit={
                    // articlePic &&
                    //     categorie.length > 0 ?
                    handleSubmit
                    // :
                    // e => e.preventDefault()
                }
            >
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>

                    {errorPopup &&
                        error === 'pic' && <div className='error'>Veuillez ajouter une image</div>
                    }
                    <input
                        type="file"
                        id="fileInput"
                        onChange={e => setArticlePic(e.target.files[0])}
                        style={{ display: "none" }} />

                    {errorPopup &&
                        error === 'titre' && <div className='error'>Titre requis</div>
                    }
                    <input
                        type="text"
                        placeholder="Titre article"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />

                    {errorPopup &&
                        error === 'categorie' && <div className='error'>Veuillez choisir une catégorie</div>
                    }
                    <label className="categorie-label" htmlFor="cat-select">Catégorie</label>
                    <select
                        className="categorie-form"
                        id="cat-select"
                        onChange={e => setCategorie(e.target.value)}>
                        <option value="">--Choisissez une catégorie--</option>
                        {
                            categorieListe.map((categorie) => (
                                <option key={categorie.id} value={categorie.nom}>{categorie.nom}</option>
                            ))
                        }
                    </select>
                </div>

                {errorPopup &&
                    error === 'contenu' && <div className='error'>Contenu requis</div>
                }
                <div className="writeFormGroup">

                    <textarea
                        placeholder="Ecrivez texte..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setContenu(e.target.value)}

                    />
                </div>
                <button className="writeSubmit" type='submit'>Publier</button>
            </form>
        </div>
    )
}
