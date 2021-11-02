import "./write.css";
import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";



export default function Write() {
    const [title, setTitle] = useState('');
    const [contenu, setContenu] = useState('');
    const { username, token } = useContext(Context)


    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            titre: title,
            contenu,
        }
        axios.post("/article/" + username,
            newPost,
            {
                headers: { 'Authorization': token }
            })

    }

    return (
        <div className="write">
            <img
                className="writeImg"
                src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/24132/images/CD4UFNxlQ8GgBMHtv9dR_010-reussir-photo-paysage.jpg" alt="" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i class="writeIcon fas fa-plus"></i>
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
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Ecrivez texte..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e=>setContenu(e.target.value)}

                    />
                </div>
                <button className="writeSubmit" type='submit'>Publier</button>
            </form>
        </div>
    )
}
