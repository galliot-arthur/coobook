import React from 'react'
import Recipe from '../../components/Recipe'
import { useSelector } from 'react-redux'
import { selectAllBookMarked } from '../../services/bookMarkSlice'

let BookmarkedRecipes = () => {

    const recipes = useSelector(selectAllBookMarked)
        ? useSelector(selectAllBookMarked)
        : localStorage.getItem('bookmarksState')

    return (
        <div className='fade-left'>
            <h1 className="display-4">Marque-Pages</h1>
            <p className="lead">Vos recettes enregistrée</p>
            <hr className="my-4" />
            {recipes.filter(r => r.status !== 'deactivate').filter(r => r.status !== 'deactivate').map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
        </div>)
}

export default BookmarkedRecipes = React.memo(BookmarkedRecipes)