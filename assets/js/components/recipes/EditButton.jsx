import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import AddRecipeContext from '../../context/AddRecipeContext';
import API from '../../services/API'
import { EditIcons } from '../../ui/Icons'

export default function DeleteButton({ recipe, history }) {

    /* SET CONTEXT */
    const { setIRI } = useContext(AddRecipeContext);

    /* HANDLE DELETE AND UPDATE */
    const gotoEdit = async () => {
        setIRI(recipe.id)
        history.push('/enregistrer-recette/' + recipe.id)
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
