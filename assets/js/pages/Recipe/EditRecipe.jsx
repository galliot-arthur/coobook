import React from 'react'
import { useSelector } from 'react-redux'
import EditSteps from '../../components/editRecipes/EditSteps'
import { Info } from '../../components/editRecipes/Info'
import { selectOneRecipeById } from '../../services/recipeSlice'
import { Loader } from '../../ui/Loader'

export default function EditRecipe({ match }) {

    const { id } = match.params
    const recipeData = useSelector(state => selectOneRecipeById(state, id))

    if (!recipeData) return <Loader />
    //!recipe && history.replace('/')

    return (
        <div className='fade-left'>
            <h1>{recipeData.title}</h1>
            <p className="lead">Modifier ma recette</p>
            <hr />
            <Info recipeData={recipeData} />
            <EditSteps recipeData={recipeData} />
        </div>
    )
}
