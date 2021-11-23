import React from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { TrashIcons } from '../../ui/Icons'

export default function DeleteButton({ id, history }) {

    /* HANDLE DELETE AND UPDATE */
    const handleDelete = async () => {
        try {
            await API.deleteById(id, 'recipes')
            toast.info('Cette recette à bien été supprimée')
            history.replace('/')
            window.location.reload()
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
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
