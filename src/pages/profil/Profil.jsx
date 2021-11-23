import React from 'react'
import "./profil.css"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from 'axios';
import { decryptData } from '../../config/utils'



export default function Profil() {
    const { token, username } = useContext(Context);
    const [fetchProfil, setFetchProfil] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const bodyFormData = new FormData();

    useEffect(() => {
        const fetchingProfilArticles = async () => {
            await axios.get("/api/user/myCredentials", { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    setFetchProfil(response.data);
                })
        }
        fetchingProfilArticles()
    }, [])

    useEffect(() => {
        bodyFormData.append('file', profilePic);
        const postProfilePic = async () => {
            await axios.post("/file/user/" + username + "/upload", bodyFormData,
                {
                    headers: {
                        'Authorization': decryptData(token),
                        'Content-Type': 'multipart/form-data',
                        'Boundary': '03405406fdsdfsdfsdfs54654034134'
                    }
                });
            window.location.reload();
        }
        //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
        postProfilePic();
    }, [profilePic])


    const deleteArticle = async (event) => {
        await axios.delete("/article/auteur/" + username + "/delete/" + event.target.id,
            {
                headers: { 'Authorization': decryptData(token) }
            });
        window.location.reload();
    }


    console.log(fetchProfil)
    return (
        <div className="profil-wrapper">
            <div className="title">
                <div className="credentials">
                    <h1>{fetchProfil.username}</h1>
                    <br />
                    <h1>{fetchProfil.name}</h1>
                </div>
                <img
                    className="pic-profil"
                    src={fetchProfil.profilePicture ? "http://localhost:8080/file/getById/" + fetchProfil.profilePicture.id : "/assets/profil.png"}
                    alt="" />

                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={e => setProfilePic(e.target.files[0])} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Date</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Contenu</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchProfil.articles &&
                        fetchProfil.articles.length ?
                        fetchProfil.articles.map((article) =>
                            <tr key={article.id}>

                                <th scope="row">{article.titre}</th>
                                <td>{article.date}</td>
                                <td>{article.categorie.nom}</td>
                                <td>
                                    <p className="contenu overflow-auto">{article.contenu}</p>
                                </td>
                                <td> <i className="singlePostIcon far fa-edit"
                                    id={article.id}
                                    onClick={e => window.location.replace("/edit/" + username + "/post/" + e.target.id)}
                                />
                                    <i className="singlePostIcon far fa-trash-alt"
                                        id={article.id}
                                        onClick={e => deleteArticle(e)}
                                    />
                                    <i className="far fa-eye"
                                        id={article.id}
                                        onClick={e => window.location.replace("/author/" + username + "/post/" + e.target.id)}
                                    /></td>
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
                                onClick={e => window.location.replace("/edit/" + username + "/post/" + e.target.id)}
                            />
                            <i className="singlePostIcon far fa-trash-alt"
                                id={article.id}
                                onClick={e => deleteArticle(e)}
                            />
                            <i className="far fa-eye"
                                id={article.id}
                                onClick={e => window.location.replace("/author/" + username + "/post/" + e.target.id)}
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

