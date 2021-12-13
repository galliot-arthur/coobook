import React from 'react'
import { useSelector } from 'react-redux'
import ConnectedHomePage from './ConnectedHomePage'
import { isConnected } from '../services/authSlice'

export function HomePage({ history }) {

    const { connected } = useSelector(isConnected)


    return (
        connected ?
            <ConnectedHomePage history={history} />
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