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
        const deleteProfileArticle = async () => {
            await axios.delete("/article/auteur/" + username + "/delete/" + id,
                {
                    headers: { 'Authorization': decryptData(token) }
                });
            window.location.reload();

        }
        id && deleteProfileArticle();

    }, [id])

    const getId = (event) => {
        setId(event.target.id);
    }


    return (
        <div>
            {fetchProfil.articles &&
                fetchProfil.articles.length ?
                fetchProfil.articles.map((article) =>
                    <ul className="article" key={article.id}>
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"
                            id={article.id} onClick={getId}
                        ></i>
                        <li>Titre: {article.titre}</li>
                        <li>Date: {article.date}</li>
                        <li>Categorie: {article.categorie.nom}</li>
                        <li className="contenu">Contenu: {article.contenu}</li>
                    </ul>)
                :
                <span>Aucun article</span>
            }
        </div>
    )
}

