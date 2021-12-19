import React from 'react'
import { ImageIcon } from '../../ui/Icons'

export default function EditCoverButton({ recipe, history }) {


    /* HANDLE DELETE AND UPDATE */
    const gotoEdit = async () => {
        window.localStorage.setItem('recipeIRI', recipe.id)
        history.push('/enregistrer-photo/')
    }

    return (
        <button onClick={gotoEdit} className="dropdown-item">
            Modifier l'illustration
            <span className="text-muted ms-2">
                <ImageIcon />
            </span>
        </button>
    )
}
