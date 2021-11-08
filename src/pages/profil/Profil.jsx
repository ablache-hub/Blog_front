import React from 'react'
import "./profil.css"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from 'axios';


export default function Profil() {
    const [fetchProfil, setFetchProfil] = useState([]);
    const { token, username } = useContext(Context);
    const [id, setId] = useState([]);

    useEffect(() => {
        const fetchingProfil = async () => {
            await axios.get("/api/user/myCredentials", { headers: { 'Authorization': token } })
                .then((response) => {
                    setFetchProfil(response.data);
                })
        }
        fetchingProfil()
    }, [])

    useEffect(() => {
        const deleteArticle = async () => {
            await axios.delete("/article/auteur/" + username + "/delete/" + id,
                {
                    headers: { 'Authorization': token }
                });
                window.location.reload();

        }
        deleteArticle();

    }, [id])

    const handleClick = (event) => {
        setId(event.target.id);
    }


    // const handleDelete = async () => {
    //     await axios.delete("/article/auteur/" + username + "/delete/" + article.id,
    //         {
    //             headers: { 'Authorization': token }
    //         });
    // window.location.replace("/")
    // }

    // useEffect(() => {
    //     console.log(id)
    //     const deleteArticle = async () => {
    //               await axios.delete("/article/auteur/" + username + "/delete/" + id,
    //             {
    //                 headers: { 'Authorization': token }
    //             })
    //     }
    //     deleteArticle()
    // }, [id]);


    return (
        <div>
            <span>
                {
                    console.log(fetchProfil),
                    fetchProfil.articles &&
                    fetchProfil.articles.map((article) =>
                        <ul className="article">
                            <i className="singlePostIcon far fa-edit"></i>
                            <i className="singlePostIcon far fa-trash-alt"
                                id={article.id} onClick={handleClick}
                            ></i>
                            <li>Titre: {article.titre}</li>
                            <li>Date: {article.date}</li>
                            <li>Categorie: {article.categorie.nom}</li>
                            <li className="contenu">Contenu: {article.contenu}</li>
                        </ul>)
                }
            </span>
        </div>
    )
}

