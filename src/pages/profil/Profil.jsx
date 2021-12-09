import React from 'react'
import "./profil.css"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from 'axios';
import { decryptData } from '../../config/utils'



export default function Profil() {
    const { token, username, dispatch } = useContext(Context);
    const [fetchProfil, setFetchProfil] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    // const [articlePic, setArticlePic] = useState(null);
    // const [articleID, setArticleId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [nom, setNom] = useState("");
    const [user, setUser] = useState("");
    const bodyFormData = new FormData();


    // Fetch liste article de l'user
    useEffect(() => {
        const fetchingProfilArticles = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/api/user/myCredentials", { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    setFetchProfil(response.data);
                })
        }
        fetchingProfilArticles()
    }, [])


    // POST image profile
    useEffect(() => {
        bodyFormData.append('file', profilePic);
        const postProfilePic = async () => {
            await axios.post(process.env.REACT_APP_URL_API + "/file/user/" + username + "/upload", bodyFormData,
                {
                    headers: {
                        'Authorization': decryptData(token),
                        'Content-Type': 'multipart/form-data',
                        'Boundary': '03405406fdsdfsdfsdfs54654034134'
                    }
                });
            window.location.reload();
        }
        //La ternaire evite d'appeller la fonction au chargement
        profilePic && postProfilePic();
        setProfilePic(null);
        bodyFormData.delete('file');
    }, [profilePic])


    // Update image profile
    const updateArticlePic = async (event) => {
        bodyFormData.append('file', event.target.files[0]);
        await axios.post(process.env.REACT_APP_URL_API + "/file/article/" + event.target.id + "/upload", bodyFormData,
            {
                headers: {
                    'Authorization': decryptData(token),
                    'Content-Type': 'multipart/form-data',
                    'Boundary': '03405406fdsdfsdfsdfs54654034134'
                }
            });
        window.location.reload();
    }

    // DELETE Article
    const deleteArticle = async (event) => {
        await axios.delete(process.env.REACT_APP_URL_API + "/article/auteur/" + username + "/delete/" + event.target.id,
            {
                headers: { 'Authorization': decryptData(token) }
            });
        window.location.reload();
    }

    // Update credentials
    const updateProfil = async (e) => {
        e.preventDefault();
        const updatedProfil = {
            // username: user && user,
            name: nom
        }
        //Verifie si une caté est bien selectionnée
        await axios.put(process.env.REACT_APP_URL_API + "/api/user/" + username,
            updatedProfil,
            {
                headers: { 'Authorization': decryptData(token) }
            })
            .then((response) => {
                setFetchProfil(response.data);
            })
            .then(setEdit(false))
    }

    const deleteAccount = async () => {
        await axios.delete(process.env.REACT_APP_URL_API + "/api/user/delete",
            {
                headers: { 'Authorization': decryptData(token) }
            });
        dispatch({ type: "LOGOUT" })
        // window.location.replace("/");
    }

    //UPDATE Article
    // const updateCredentials = async (e) => {
    //     e.preventDefault();
    //     const updatedCredentials = {
    //         name
    //     }
    //     await axios.put(process.env.REACT_APP_URL_API + "/api/user/" + username,
    //         updatedArticle,
    //         {
    //             headers: { 'Authorization': decryptData(token) }
    //         })
    //     window.location.replace("/#/author/" + username + "/post/" + fetchArticle.id)

    // }

    return (
        <div className="profil-wrapper">
            <div className="title">
                <div className="credentials">
                    {!edit ?
                        <>
                            <h1>Email/Username:
                                {/* <i className="singlePostIcon far fa-edit" onClick={() => setEdit(true)} /> */}
                                <p>{fetchProfil.username}</p></h1>
                            <br />
                            <h1>Pseudonyme:
                                <i className="singlePostIcon far fa-edit" onClick={() => setEdit(true)} />

                                <p>{fetchProfil.name}</p></h1>
                        </>
                        :
                        <>
                            {/* Edit username */}
                            {/* <div className="input-group mb-3 w-75">
                                <label className="input-group-text" htmlFor="name" id="basic-addon1">Utilisateur</label>
                                <input
                                    // defaultValue={title}
                                    type="text"
                                    name="user"
                                    className="form-control"
                                    onChange={e => setUser(e.target.value)}
                                    required />
                                <i class="far fa-check-square" onClick={updateProfil} />
                                <i className="far fa-times-circle" onClick={() => setEdit(false)} />
                            </div> */}

                            {/* Edit nom */}
                            <div className="input-group mb-3 w-75">
                                <label className="input-group-text" htmlFor="name" id="basic-addon1">Nom</label>
                                <input
                                    // defaultValue={title}
                                    type="text"
                                    name="nom"
                                    className="form-control"
                                    onChange={e => setNom(e.target.value)}
                                    required />
                                <i class="far fa-check-square" onClick={updateProfil} />
                                <i className="far fa-times-circle" onClick={() => setEdit(false)} />
                            </div>
                        </>
                    }
                </div>
                <img
                    className="pic-profil"
                    src={fetchProfil.profilePicture ? process.env.REACT_APP_URL_API + "/file/getById/" + fetchProfil.profilePicture.id : "/assets/profil.png"}
                    alt="" />

                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={e => setProfilePic(e.target.files[0])}
                />
                <div className="deleteUser">
                    {!showDeleteAlert ?
                        <>
                            <p>Supprimer Compte</p>
                            <i class="fas fa-user-slash" onClick={() => setShowDeleteAlert(true)} />
                        </>
                        :
                        <div className="deletePopup">
                            <p className="popupTitle">Confirmer?</p>
                            <div className="deleteButtons">
                                <button type="button" class="btn btn-danger btn-sm" onClick={deleteAccount}>Supprimer</button>
                                <button type="button" class="btn btn-secondary" onClick={() => setShowDeleteAlert(false)}>Annuler</button>
                            </div>

                        </div>
                    }
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Date</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Contenu</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchProfil.articles &&
                        fetchProfil.articles.length ?
                        fetchProfil.articles.map((article) =>
                            <tr key={article.id} className={"profil_list_article_" + article}>

                                <th scope="row">{article.titre}</th>
                                <td>
                                    {
                                        article.date.substr(0, 7) == "Modifié" ?
                                            article.date.slice(11, 29) :
                                            article.date.slice(3, -3)
                                    }
                                </td>
                                <td>{article.categorie.nom}</td>
                                <td>
                                    <p className="contenu overflow-auto">{article.contenu}</p>
                                </td>
                                <td className="articlePictureList">
                                    {<img
                                        src={article.articlePicture ?
                                            process.env.REACT_APP_URL_API + "/file/getById/" + article.articlePicture.id
                                            :
                                            "https://orgaphenix.com/wp-content/uploads/2020/01/secrets-photo-profil-linkedin.jpeg"}
                                        alt=""
                                        className="singlePostImgProfil" />
                                    }
                                    <label htmlFor={article.id}>
                                        <i className="writeIcon fas fa-plus fileInputArticle" />
                                    </label>
                                    <input
                                        type="file"
                                        id={article.id}
                                        style={{ display: "none" }}
                                        onChange={
                                            e => updateArticlePic(e)
                                        }
                                    />
                                </td>
                                <td> <i className="singlePostIcon far fa-edit"
                                    id={article.id}
                                    onClick={e => window.location.replace("/#/edit/" + username + "/post/" + e.target.id)}
                                />
                                    <i className="singlePostIcon far fa-trash-alt"
                                        id={article.id}
                                        onClick={e => deleteArticle(e)}
                                    />
                                    <i className="far fa-eye"
                                        id={article.id}
                                        onClick={e => window.location.replace("/#/author/" + username + "/post/" + e.target.id)}
                                    />
                                </td>
                            </tr>
                        )
                        :
                        <span>Aucun article</span>
                    }
                </tbody>


                {/* 
                {fetchProfil.articles &&
                    fetchProfil.articles.length ?
                    fetchProfil.articles.map((article) =>
                        <ul className="article" key={article.id}>
                            <i className="singlePostIcon far fa-edit"
                                id={article.id}
                                onClick={e => window.location.replace("/#/edit/" + username + "/post/" + e.target.id)}
                            />
                            <i className="singlePostIcon far fa-trash-alt"
                                id={article.id}
                                onClick={e => deleteArticle(e)}
                            />
                            <i className="far fa-eye"
                                id={article.id}
                                onClick={e => window.location.replace("/#/author/" + username + "/post/" + e.target.id)}
                            />
                            <li>
                                <h1>Titre</h1>
                                <p>{article.titre}</p>
                            </li>
                            <li>
                                <h1>Date</h1>
                                <p>{article.date}</p>
                            </li>
                            <li>
                                <h1>Categorie</h1>
                                <p>{article.categorie.nom}</p>
                            </li>
                            <li className="contenu">
                                <h1>Contenu</h1>
                                <p>{article.contenu}</p>
                            </li>
                        </ul>)
                    :
                    <span>Aucun article</span>
                } */}
            </table>
        </div>
    )
}

