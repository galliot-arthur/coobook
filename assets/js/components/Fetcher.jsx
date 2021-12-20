import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isConnected } from '../services/authSlice'
import { fetchBookMarked } from '../services/bookMarkSlice'
import { loadComments } from '../services/commentSlice'
import { setLikes } from '../services/likeSlice'
import { fetchRecipes, selectAllRecipes } from '../services/recipeSlice'

let Fetcher = () => {
    if (!axios.defaults.headers["Authorization"])
        axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem('toto')

    const connected = useSelector(isConnected)
    return connected ? <Fetch /> : <></>
}

const Fetch = () => {

    const dispatch = useDispatch()

    /* feed */
    dispatch(fetchRecipes(feed))
    const feed = useSelector(selectAllRecipes)
    /* likes */
    const likes = []
    if (feed && feed.length > 1) {
        feed.map(recipe => recipe.likes.map(like => {
            if (like.user.id == localStorage.getItem('authId')) likes.push({
                recipe: recipe.id,
            })
        }))
    }
    dispatch(setLikes(likes))
    /* bookmarks */
    dispatch(fetchBookMarked())
    /* comments */
    const comments = []
    feed.map(recipe => recipe.comments.map(comment => {
        comments.push({ ...comment, recipeId: recipe.id, })
    }))
    dispatch(loadComments(comments))

    return <></>
}

export default Fetcher = React.memo(Fetcher)
