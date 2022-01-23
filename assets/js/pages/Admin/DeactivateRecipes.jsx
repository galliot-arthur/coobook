import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { reactivate } from '../../services/recipeSlice'
import { CheckIcon } from '../../ui/Icons'

export default function DeactivateRecipes({ recipes }) {

    return <div className="fade-left">
        <div className="d-flex justify-content-between align-items-center">
            <h2>Recettes Désactivées</h2>
        </div>
        <ul className=''>
            {recipes.map(r => <Recipe recipe={r} key={r.id} />)}
        </ul>
    </div>
}

const Recipe = ({ recipe }) => {
    const dispatch = useDispatch()

    const handleReactivate = () => dispatch(reactivate(recipe.id))

    return <li className='list-group-admin'>
        <Link to={'/recette/' + recipe.id}>{recipe.title}</Link>
        <div>
            <button className='text-success' onClick={handleReactivate}>
                <CheckIcon /> Réactiver
            </button>
        </div>
        <hr />
    </li>
}
