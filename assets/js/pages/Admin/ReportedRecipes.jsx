import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cancelReport, deactivate } from '../../services/recipeSlice'
import { CheckIcon, TrashIcons } from '../../ui/Icons'

export default function ReportedRecipes({ recipes }) {

    return <div className="fade-left">
        <div className="d-flex justify-content-between align-items-center">
            <h2>Recettes Signalées</h2>
        </div>
        <ul>
            {recipes.map(r => <Recipe recipe={r} key={r.id} />)}
        </ul>
    </div>
}

const Recipe = ({ recipe }) => {
    const dispatch = useDispatch()

    const handleDeactivate = () => dispatch(deactivate(recipe.id))
    const handleRemoveReport = () => dispatch(cancelReport(recipe.id))

    return <li className='list-group-admin'>
        <Link to={'/recette/' + recipe.id}>{recipe.title}</Link>
        <div>
            <button className='text-danger' onClick={handleDeactivate}>
                <TrashIcons /> Désactiver
            </button>
            <button className='text-success ms-3' onClick={handleRemoveReport}>
                <CheckIcon /> Annuler
            </button>
        </div>
        <hr />
    </li>
}
