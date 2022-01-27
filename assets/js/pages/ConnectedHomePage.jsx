import React, { useEffect } from 'react'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
import { useSelector } from 'react-redux'
import { selectAllRecipes } from '../services/recipeSlice'
import API from '../services/API'

export default function ConnectedHomePage() {

    const feed = useSelector(selectAllRecipes)

    return (<>
        {
            feed.length == 0 ?
                <Loader />
                :
                feed
                    .filter(r => r.status !== 'deactivate')
                    .map(recipe => <Recipe recipe={recipe} key={recipe.id} />)
        }
    </>)
}