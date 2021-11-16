import React from 'react'
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import axios from 'axios';
import { decryptData } from '../../config/utils';

export default function ProfilDel() {
    const location = useLocation().pathname.split("/")[4];
    const { token, username } = useContext(Context);
    const [categorieListe, setCategorieListe] = useState([]);
    const [title, setTitle] = useState('');
    const [contenu, setContenu] = useState('');
    const [categorie, setCategorie] = useState('');

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
        window.location.replace("/profil/")
    }

    useEffect(() => {
        const fetchingProfilArticle = async () => {
            await axios.get("/article/get/" + location, { headers: { 'Authorization': decryptData(token) } })
                .then((response) => {
                    // setFetchArticle(response.data);
                    setCategorie(response.data.categorie.nom);
                    setTitle(response.data.titre);
                    setContenu(response.data.contenu);
                })
        }
        fetchingProfilArticle();
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
            <form action="" method="get" className="form-example" onSubmit={handleSubmit}>
                <div className="form-example">
                    <label htmlFor="name">Titre: </label>
                    <input
                        defaultValue={title}
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
                    defaultValue={categorie}
                    onChange={e => setCategorie(e.target.value)}>
                    <option>
                        {categorie}
                    </option>
                    {
                        categorieListe.map((categorie) => (
                            <option key={categorie.id} defaultValue={categorie.nom}>{categorie.nom}</option>
                        ))
                    }
                </select>

                <div className="form-example">
                    <label
                        htmlFor="email">Contenu: </label>
                    <input
                        defaultValue={contenu}
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



        </div>
    )
}
