import React, { useContext } from 'react'
import AddRecipeContext from '../../context/AddRecipeContext';
import { ImageIcon } from '../../ui/Icons'

export default function EditCoverButton({ recipe, history }) {

    /* SET CONTEXT */
    const { setIRI } = useContext(AddRecipeContext);

    /* HANDLE DELETE AND UPDATE */
    const gotoEdit = async () => {
        setIRI(recipe.id)
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
