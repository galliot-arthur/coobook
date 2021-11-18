import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { CommentIcon } from '../../ui/Icons'
import AddRecipeContext from '../../context/AddRecipeContext';

export default function CommentButton({ recipe, history }) {
    /* SET IRI  */
    const { setIRI } = useContext(AddRecipeContext);

    const handleClick = () => {
        setIRI(recipe.id)
        history.push('/commenter/' + recipe.id)
    }

    return (
        <button onClick={handleClick} className="me-3">
            <CommentIcon size={24} />
        </button>
    )
}
