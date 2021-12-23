import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteRecipe } from '../../services/recipeSlice'
import { TrashIcons } from '../../ui/Icons'

export default function DeleteButton({ id, onDelete }) {

    const history = useHistory()
    const dispatch = useDispatch()

    /* HANDLE DELETE */
    const handleDelete = () => {
        dispatch(deleteRecipe(id))
        toast.info('Cette recette à bien été supprimée')
        history.replace('/')
    }

    return (
        <button onClick={handleDelete} className="dropdown-item">
            Supprimer
            <span className="text-muted ms-2">
                <TrashIcons />
            </span>
        </button>
    )
}
