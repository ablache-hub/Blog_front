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
            window.location.replace("/del/" + username + "/post/" + id2)
        }
        //La ternaire evite de rappeller la fonction quand la valeur d'id passe à null après suppression
        id2 && modifProfileArticle();

    }, [id2])

    return (
        <div>
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

