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
        await axios.put(process.env.REACT_APP_URL_API + "/article/modify?categorie=" + categorie,
            newPost,
            {
                headers: { 'Authorization': decryptData(token) }
            })
        window.location.replace("/#/profil/")
    }

    useEffect(() => {
        const fetchingProfilArticle = async () => {
            await axios.get(process.env.REACT_APP_URL_API + "/article/get/" + location, { headers: { 'Authorization': decryptData(token) } })
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
            await axios.get(process.env.REACT_APP_URL_API + "/categorie/getAll")
                .then((response) => {
                    setCategorieListe(response.data);
                })
        }
        fetchingCategorie()
    }, [])

    return (
        <div>
            <form action="" method="get" className="form-example" onSubmit={handleSubmit}>
                <h1 className="edit-title">Edition Article</h1>
                <div className="input-group mb-3 w-50">
                    <label className="input-group-text" htmlFor="name" id="basic-addon1">Titre</label>
                    <input
                        defaultValue={title}
                        type="text"
                        name="titre"
                        className="form-control"
                        onChange={e => setTitle(e.target.value)}
                        required />
                        
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="cat-select" id="basic-addon1">Catégorie</label>
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
                </div>

                <div className="input-group w-50">
                    <label
                        htmlFor="email"
                        className="input-group-text">Contenu: </label>
                    <textarea
                        defaultValue={contenu}
                        type="text"
                        name="contenu"
                        className="form-control"
                        onChange={e => setContenu(e.target.value)}
                        required />
                </div>


                <div >
                    <input className="btn btn-info" type="submit" defaultValue="Modifier" />
                </div>
            </form>



        </div>
    )
}
