import React from 'react'
import { useHistory } from 'react-router-dom'
import { EditIcons } from '../../ui/Icons'

export default function EditButton({ recipe }) {

    const history = useHistory()

    const gotoEdit = () => {
        history.push('/modifier-recette/' + recipe.id)
    }

    return (
        <button onClick={gotoEdit} className="dropdown-item">
            Modifier
            <span className="text-muted ms-2">
                <EditIcons />
            </span>
        </button>
    )
}
