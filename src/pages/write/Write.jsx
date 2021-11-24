import "./write.css";
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";
import { decryptData } from '../../config/utils'



export default function Write() {

    const { username, token } = useContext(Context);

    const [title, setTitle] = useState(null);
    const [contenu, setContenu] = useState(null);
    const [newId, setnewId] = useState(null);
    const [categorieListe, setCategorieListe] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [articlePic, setArticlePic] = useState(null);
    const [articlePicUrl, setArticlePicUrl] = useState(null);
    const [error, catchError] = useState(null);
    const [errorPopup, showErrorPopup] = useState(false);
    const newArticle = new FormData();
    const [hidden, setHidden] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !contenu || !categorie.length) {
            !title && catchError('titre')
            !contenu && catchError('contenu')
            !categorie.length && catchError('categorie')
        }
        else {
            newArticle.append('username', username)
            newArticle.append('titre', title);
            newArticle.append('contenu', contenu);
            newArticle.append('categorie', categorie);
            articlePic && newArticle.append('picture', articlePic);

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
        };
    }
    // }
    //Après POST, on redirige vers l'article nouvellement crée grâve à l'Id récup dans la reponse
    useEffect(() => {
        newId &&
            window.location.replace("/author/" + username + "/post/" + newId);
    }, [newId])

    //Fetch catégorie pour menu
    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get("/api/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    useEffect(() => {
        error && showErrorPopup(true)
        setTimeout(() => {
            showErrorPopup(false)
        }, 3000);
    }, [error])

    useEffect(() => {
        articlePic && setArticlePicUrl(URL.createObjectURL(articlePic))
    }, [articlePic])


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

    return (

        <div className="write">
            <img
                className="writeImg"
                src={articlePicUrl ? articlePicUrl : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                alt="" />

            <form className="writeForm"
                onSubmit={handleSubmit}>

                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>

                    {/* {errorPopup &&
                        error === 'pic' && <div className='error'>Veuillez ajouter une image</div>
                    } */}
                    <input
                        type="file"
                        id="fileInput"
                        onChange={e => setArticlePic(e.target.files[0])}
                        style={{ display: "none" }} />

                    {/* {errorPopup &&
                        error === 'titre' && <div className='error'>Titre requis</div>
                    } */}
                    <input
                        type="text"
                        placeholder="Titre article"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => (setTitle(e.target.value))}
                        required
                    />

                    {/* {errorPopup &&
                        error === 'categorie' && <div className='error'>Veuillez choisir une catégorie</div>
                    } */}
                    <label className="categorie-label" htmlFor="cat-select">Catégorie</label>
                    <select
                        className="categorie-form"
                        id="cat-select"
                        onChange={e => setCategorie(e.target.value)}
                        required
                        >
                        <option value="">--Choisissez une catégorie--</option>
                        {
                            categorieListe.map((categorie) => (
                                <option key={categorie.id} value={categorie.nom}>{categorie.nom}</option>
                            ))
                        }
                    </select>
                </div>



                {/* {errorPopup &&
                    error === 'contenu' && <div className='error'>Contenu requis</div>
                } */}
                <div className="writeFormGroup">

                    <textarea
                        placeholder="Ecrivez texte..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setContenu(e.target.value)}
                        required
                    />
                </div>
                <button className="writeSubmit" type='submit'>Publier</button>
            </form>
        </div>
    )
}
