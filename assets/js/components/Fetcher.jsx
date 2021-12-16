import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLikes } from '../services/likeSlice'
import { fetchRecipes, selectAllRecipes } from '../services/recipeSlice'

export default function Fetcher() {


    const feed = useSelector(selectAllRecipes)
    const dispatch = useDispatch()

    /* SETTING LIKES */
    if (feed.length < 1) {
        dispatch(fetchRecipes())
    } else {
        const likes = []
        feed.map(recipe => recipe.likes.map(like => {
            if (like.user.id == localStorage.getItem('authId')) likes.push({
                recipe: recipe.id,
            })
        }))
        const dispatch = useDispatch()
        dispatch(setLikes(likes))
    }

    return <></>
}
