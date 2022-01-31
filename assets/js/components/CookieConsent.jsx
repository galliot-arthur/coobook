import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import reactDom from 'react-dom'
import { Link } from "react-router-dom"

export default function CookieConsent() {
    const [accepted, setAccepted] = useState(false)
    const [cgu, setCgu] = useState(false)

    useEffect(() => {
        const cookie = localStorage.getItem('Accept')
        if (cookie === 'true') setAccepted(true)
    }, [])

    let bg = ''
    const handleAccept = (e) => {
        e.preventDefault()
        if (cgu) {
            localStorage.setItem('Accept', 'true')
            setAccepted(true)
            toast.info('Bienvenue !')
        }
        else {
            bg = ' bg-danger'
        }
    }

    const block = <>
        <div className='cookie-context fade-start'>
            <h3>Ce site utilise les cookies.</h3>
            <div>
                En poursuivant votre navigation, vous acceptez le dépôt de cookies destinés à faciliter la navigation sur le site ainsi que l'ensemble des conditions d'utilisations.
            </div>
            <form onSubmit={handleAccept}>

                <div className="input-group mb-3 mt-2">
                    <div className="input-group-text ">
                        <input
                            className={"form-check-input" + bg}
                            aria-label="Accepter les conditions générales d'utilisations."
                            type="checkbox"
                            name="cgu"
                            value={cgu}
                            required
                            checked={cgu}
                            onChange={() => setCgu(!cgu)}
                        />
                    </div>
                    <div className="input-group-text">
                        <Link to='/coobook-cgu'>Voir les conditions d'utisation.</Link>
                    </div>
                </div>
                <div>
                    <button className="btn btn-dark" type="submit">J'accepte</button>
                    <a className="btn btn-outline-dark ms-2" href='https://www.google.com'>Je quitte le site.</a>
                </div>
            </form>
        </div>
    </>
    return accepted ? <></> : reactDom.createPortal(block, document.querySelector('body'))
}
