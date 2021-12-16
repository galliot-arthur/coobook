import React from 'react'
import { Loader } from '../../ui/Loader'
import Recipe from '../../components/Recipe'
import { useSelector } from 'react-redux'
import { fetchBookMarked, selectAllBookMarked } from '../../services/bookMarkSlice'
import { useDispatch } from 'react-redux'

let BookmarkedRecipes = () => {

    const recipes = useSelector(selectAllBookMarked)
        ? useSelector(selectAllBookMarked)
        : localStorage.getItem('bookmarksState')

    if (recipes.length < 1) {
        const dispatch = useDispatch()
        dispatch(fetchBookMarked())
        return <Loader />
    }

    return (
        <div className='fade-left'>
            <h1 className="display-4">Marque-Pages</h1>
            <p className="lead">Vos recettes enregistrée</p>
            <hr className="my-4" />
            {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
        </div>)
}

export default BookmarkedRecipes = React.memo(BookmarkedRecipes)