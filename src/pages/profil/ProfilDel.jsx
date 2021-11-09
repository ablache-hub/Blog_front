import React from 'react'
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import axios from 'axios';
import { decryptData } from '../../config/utils';

export default function ProfilDel() {
    const location = useLocation().pathname.split("/")[4];
    const [title, setTitle] = useState('');
    const [contenu, setContenu] = useState('');
    const { token, username } = useContext(Context);
    const [fetchArticle, setFetchArticle] = useState("")
    const [categorieListe, setCategorieListe] = useState([]);
    const [categorie, setCategorie] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            id: location,
            titre: title,
            contenu
        }

        //Verifie si une caté est bien selectionnée
            await axios.put("/article/auteur/" + username + "/modify?categorie=" + categorie,
                newPost,
                {
                    headers: { 'Authorization': decryptData(token) }
                })
    }

    useEffect(() => {
        const fetchingProfilArticle = async () => {
            await axios.get("/article/get/" + location, { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    setFetchArticle(response.data);
                    setCategorie(response.data.categorie.nom)
                })
        }
        fetchingProfilArticle()

    }, [])

    useEffect(() => {
        const fetchingCategorie = async () => {
            await axios.get("/api/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <div>

            {/* <ul className="article" key={fetchArticle.id}>
                <i className="singlePostIcon far fa-edit"
                    id={fetchArticle.id}

                />
                <i className="singlePostIcon far fa-trash-alt"
                    id={fetchArticle.id}
                />
                <li>Titre: {fetchArticle.titre}</li>
                <li>Date: {fetchArticle.date}</li>
                <li>Categorie: {fetchArticle.categorie &&
                    fetchArticle.categorie.nom}</li>
                <li className="contenu">Contenu: {fetchArticle.contenu}</li>
            </ul> */}

            <form action="" method="get" className="form-example" onSubmit={handleSubmit}>
                <div className="form-example">
                    <label for="name">Titre: </label>
                    <input
                        defaultValue={fetchArticle.titre}
                        type="text"
                        name="titre"
                        className="titre"
                        onChange={e => setTitle(e.target.value)}
                        required />
                </div>

                <label className="categorie-label" htmlFor="cat-select">Catégorie</label>
                <select
                    className="categorie-form"
                    id="cat-select"
                    defaultValue={fetchArticle.categorie && fetchArticle.categorie.nom}
                    onChange={e => setCategorie(e.target.value)}>
                    <option value={fetchArticle.categorie && fetchArticle.categorie.nom} selected>
                        {
                            fetchArticle.categorie &&
                            fetchArticle.categorie.nom}</option>
                    {
                        categorieListe.map((categorie) => (
                            <option value={categorie.nom}>{categorie.nom}</option>
                        ))
                    }
                </select>

                <div className="form-example">
                    <label
                        for="email">Contenu: </label>
                    <input
                        defaultValue={fetchArticle.contenu}
                        type="text"
                        name="contenu"
                        className="contenu"
                        onChange={e => setContenu(e.target.value)}
                        required />
                </div>

                <div class="form-example">
                    <input type="submit" value="Modifier" />
                </div>

            </form>



        </div>
    )
}
