import React from 'react'
import "./contact.css"

export default function Contact() {
    return (
        <>
            <section class="contact-section form-group" id="contact">
                <h2 class="section-title">Comment me joindre?</h2>
                <form action="https://formsubmit.co/alexandreblache.pro@gmail.com" className="contact__form" method="POST">

                    <div className="form-group">
                        <input name="nom" type="text" placeholder="Nom" class="contact__input form-control" required />
                    </div>
                    <div className="form-group">
                        <input name="email" type="text" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Adresse email invalide"
                            placeholder="Email" class="contact__input form-control" required />
                    </div>

                    <div className="form-group">
                        <input name="contact" type="text" placeholder="Sujet" class="contact__input form-control" />
                    </div>

                    <div className="form-group">
                        <textarea name="message" id="" cols="0" rows="5" placeholder="Votre Message"
                            class="form-control" />
                    </div>

                    <input type="hidden" name="_next" value={process.env.REACT_APP_URL_API + "/#"} />
                    <input type="submit" value="Envoyer" className='btn btn-primary contact__button' />
                </form>
            </section>
        </>


    )
}
