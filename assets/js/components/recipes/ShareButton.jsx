import React from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../../config'
import { ShareIcon } from '../../ui/Icons'

export default function ShareButton({ recipe }) {

    const handleCopy = () => {
        navigator.clipboard.writeText(API_URL + '#/recette/' + recipe.id)
        toast.info('Lien copié avec succès.')
    }
    return (
        <button onClick={handleCopy} className="dropdown-item">
            Copier le lien
            <span className="text-muted ms-2">
                <ShareIcon />
            </span>
        </button>
    )
}
