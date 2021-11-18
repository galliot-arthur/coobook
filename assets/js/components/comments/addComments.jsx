import React, { useEffect, useState } from 'react'
import TextArea from '../forms/TextArea'
import { Loader } from '../../ui/Loader'
import API from '../../services/API'
import { toast } from 'react-toastify'

export default function addComments(recipe) {
    const [loading, setLoading] = useState(false)

    /* HANDLE INPUT */
    const [comment, setComment] = useState({})
    useEffect(() => {
        setComment({
            recipe: recipe.id,
            user: window.localStorage.getItem('authId')
        })
    }, [])
    const handleChange = ({ currentTarget }) => setComment(
        ...comment,
        { 'content': currentTarget.value }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log(comment)
            //await API.post(1, 'comments')
            toast.info('Commentaire publié')
        } catch (i) {
            console.log(i)
            toast.warning('Erreur, merci de réessayer.')
        }
    }

    return (
        <div>
            {
                loading ?
                    <Loader />
                    :
                    <form
                        className="fade-start"
                        onSubmit={() => handleSubmit}>

                        <TextArea
                            name=""
                            label=""
                            value={comment}
                            onChange={() => handleChange}
                            placeholder="..."
                            minLength="2"
                        />
                        <button className="btn btn-danger">
                            Envoyer
                        </button>
                    </form>
            }
        </div>
    )
}
