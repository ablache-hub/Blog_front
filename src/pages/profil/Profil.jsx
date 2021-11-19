import React from 'react'
import "./profil.css"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from 'axios';
import { decryptData } from '../../config/utils'



export default function Profil() {
    const [fetchProfil, setFetchProfil] = useState([]);
    const { token, username } = useContext(Context);
    const [id, setId] = useState(null);
    const [id2, setId2] = useState(null);
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

    const getIdDel = (event) => {
        setId(event.target.id);
    }

    useEffect(() => {
        const deleteProfileArticle = async () => {
            await axios.delete("/article/auteur/" + username + "/delete/" + id,
                {
                    headers: { 'Authorization': decryptData(token) }
                });
            window.location.reload();

        }
        //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
        id && deleteProfileArticle();

    }, [id])

    const getIdEdit = (event) => {
        setId2(event.target.id);
    }

    useEffect(() => {
        const modifProfileArticle = () => {
            window.location.replace("/edit/" + username + "/post/" + id2)
        }
        //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
        id2 && modifProfileArticle();

    }, [id2])

    useEffect(() => {
        bodyFormData.append('file', profilePic);
        const postProfilePic = async () => {
            await axios.post("/file/user/" + username + "/upload", bodyFormData,
                {
                    headers: {
                        'Authorization': decryptData(token),
                        'Content-Type': 'multipart/form-data',
                        'Boundary': '0340540654654034134'
                    }
                });
            window.location.reload();
        }
        //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
        postProfilePic();

    }, [profilePic])

    return (
        <div className="profil-wrapper">
            <div className="title">
                <h1>{fetchProfil.username}</h1>
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


            {fetchProfil.articles &&
                fetchProfil.articles.length ?
                fetchProfil.articles.map((article) =>
                    <ul className="article" key={article.id}>
                        <i className="singlePostIcon far fa-edit"
                            id={article.id}
                            onClick={getIdEdit}

                        />
                        <i className="singlePostIcon far fa-trash-alt"
                            id={article.id}
                            onClick={getIdDel}
                        />
                        <i className="far fa-eye"
                            id={article.id}
                            onClick={e => window.location.replace("/author/" + username + "/post/" + e.target.id)}
                        />
                        {/* http://localhost:3000/author/test_auteur@gmail.com/post/5 */}
                        {/* window.location.replace("/edit/" + username + "/post/" + id2) */}

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
            }
        </div>
    )
}

