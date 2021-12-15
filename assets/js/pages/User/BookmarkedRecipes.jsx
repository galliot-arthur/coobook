import React from 'react'
import { Loader } from '../../ui/Loader'
import Recipe from '../../components/Recipe'
import { useSelector } from 'react-redux'
import { fetchBookMarked, selectAllBookMarked } from '../../services/bookMarkSlice'
import { useDispatch } from 'react-redux'

export default function BookmarkedRecipes() {

    const recipes = useSelector(selectAllBookMarked)
        ? useSelector(selectAllBookMarked)
        : localStorage.getItem('bookmarksState')

    if (recipes.length < 1) {
        const dispatch = useDispatch()
        dispatch(fetchBookMarked())
        return <Loader />
    }

    return recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)
}