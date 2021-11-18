import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ConnectedHomePage from './ConnectedHomePage'

export function HomePage() {

    const { connected } = useContext(AuthContext)


    return (
        connected ?
            <ConnectedHomePage />
            :
            <StandardHomePage />
    )
}

const StandardHomePage = () => {
    return (
        <div>

            <h1 className="display-4">Bienvenue</h1>
            <p className="lead">Bienvenue sur CooBook, le reseau social de votre cuisine.</p>
            <hr className="my-4" />
            {/* THEN */}
            <h5 className="text-muted">Qu'est-ce que CooBook ?</h5>
            <p>CooBook est un livre de cuisine interactif vous permettant de sauvegarder, consulter et partager vos meilleurs recettes de cuisine, ou celles de vos amis.</p>
            <h5 className="text-muted">Comment ça marche ?</h5>
            <p>Inscrivez-vous d'abord, nous vous expliquons tout ensuite !</p>
        </div>
    )
}