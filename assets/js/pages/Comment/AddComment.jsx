import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from '../../components/forms/TextArea'
import CommentButton from '../../components/recipes/CommentButton'
import { addComment } from '../../services/commentSlice'

export default function AddComment({ recipe }) {

    const dispatch = useDispatch()
    const [adding, setAdding] = useState(false)

    /* HANDLE INPUT */
    const [comment, setComment] = useState({
        recipe: '/api/recipes/' + recipe.id,
        user: "/api/users/" + window.localStorage.getItem('authId'),
        content: "",
    })

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setComment({ ...comment, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addComment({ comment: comment, recipeId: recipe.id }))
        setAdding(false)
    }

    return (adding
        ? <form
            className="fade-left form-group"
            onSubmit={handleSubmit}>
            <TextArea
                name="content"
                label={false}
                value={comment.content}
                onChange={handleChange}
                placeholder="Saisisser ici votre commentaire..."
                minLength="2"
            />
            <button className="btn btn-primary mt-2">
                Enregistrer
            </button>
            <button onClick={() => setAdding(false)}>Annuler</button>
        </form>
        :
        <CommentButton onClick={() => setAdding(true)} text="Ajouter un commentaire à cette recette" />
    )
}
