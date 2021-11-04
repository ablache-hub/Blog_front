import "./write.css";
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";



export default function Write() {
    const [title, setTitle] = useState('');
    const [contenu, setContenu] = useState('');
    const [newId, setnewId] = useState('')
    const { username, token } = useContext(Context)
 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            titre: title,
            contenu,
        }
        await axios.post("/article/" + username,
            newPost,
            {
                headers: { 'Authorization': token }
            })
            .then((response) => {
               setnewId(response.data.id)
            })
    }

    //Après avoir POST, on redirige vers l'article nouvellement crée grâve à l'Id récup dans la reponse
    useEffect(() => { 
        newId &&
            window.location.replace("/author/"+username+"/post/" + newId)
        
      });


    return (
        <div className="write">
            <img
                className="writeImg"
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/24132/images/CD4UFNxlQ8GgBMHtv9dR_010-reussir-photo-paysage.jpg" alt="" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }} />
                    <input
                        type="text"
                        placeholder="Titre article"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Ecrivez texte..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setContenu(e.target.value)}

                    />
                </div>
                <button className="writeSubmit" type='submit'>Publier</button>
            </form>
        </div>
    )
}
