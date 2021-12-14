import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnectedHomePage from './ConnectedHomePage'
import { isConnected } from '../services/authSlice'
import { fetchRecipes, selectAllRecipes } from '../services/recipeSlice'

export function HomePage({ history }) {

    const { connected } = useSelector(isConnected)
    const feed = useSelector(selectAllRecipes)

    if (connected && feed.length < 1) {
        const dispatch = useDispatch()
        dispatch(fetchRecipes())
    }

    return (
        connected ?
            <ConnectedHomePage history={history} />
            :
            <StandardHomePage />
    )
}

const StandardHomePage = () => {
    return (
        <div className='fade-left'>

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