import React, { useEffect } from 'react'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
import { useSelector } from 'react-redux'
import { fetchRecipes, selectAllRecipes } from '../services/recipeSlice'
import { useDispatch } from 'react-redux'

export default function ConnectedHomePage({ history }) {

    const feed = useSelector(selectAllRecipes)

    return (
        feed.length == 0 ?
            <Loader />
            :
            feed.map(recipe =>
                <Recipe history={history} recipe={recipe} key={recipe.id} />
            )
    )
}