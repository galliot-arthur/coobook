import React, { useContext, useEffect, useState } from 'react'
import TextArea from '../../components/forms/TextArea'
import { Loader } from '../../ui/Loader'
import { toast } from 'react-toastify'
import API from '../../services/API'
import AddRecipeContext from '../../context/AddRecipeContext'

export default function AddComment({ match, history }) {

    const [loading, setLoading] = useState(false)
    const { IRI } = useContext(AddRecipeContext);
    /* HANDLE INPUT */
    const [comment, setComment] = useState({
        recipe: IRI,
        user: "/api/users/" + window.localStorage.getItem('authId'),
        content: "",
    })

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setComment({ ...comment, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log(comment)
            await API.post(comment, 'comments')
            history.replace('/recette/' + match.params.id)
            toast.info('Commentaire publié')
        } catch (i) {
            console.log(i.response)
            toast.warning('Erreur, merci de réessayer.')
            setLoading(false)
        }
    }

    return (
        <div>
            {
                loading ?
                    <Loader />
                    :
                    <form
                        className="fade-start form-group"
                        onSubmit={handleSubmit}>
                        <h1>Ajouter un commentaire</h1>
                        <TextArea
                            name="content"
                            label={false}
                            value={comment.content}
                            onChange={handleChange}
                            placeholder="Saisisser ici votre commentaire..."
                            minLength="2"
                        />
                        <button className="btn btn-danger mt-2">
                            Envoyer
                        </button>
                    </form>
            }
        </div>
    )
}
