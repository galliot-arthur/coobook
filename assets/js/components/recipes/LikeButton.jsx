import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import likeBookmark from '../../services/like&bookmark'
import { setStateLike } from '../../services/recipeSlice'
import { LikeFillIcon, LikeIcon } from '../../ui/Icons'

export default function LikeButton({ recipe, onLike }) {

    const dispatch = useDispatch()
    const [like, setLike] = useState(false)

    useEffect(() => {
        if (recipe.likes.length > 0) {
            setLike(likeBookmark.isUserLike(recipe.likes))
        }
    }, [])

    const toggleLike = async () => {
        setLike(!like)
        onLike(like)
        try {
            likeBookmark.toggleAffiliation(
                like,
                'likes',
                recipe.id,
                recipe.likes
            )
            dispatch(setStateLike({
                like,
                recipeId: recipe.id,
                userId: parseInt(localStorage.getItem('authId'))
            }))
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
            setLike(!like)
        }
    }

    return (
        <button className="me-3" onClick={toggleLike}>
            {
                like ?
                    <LikeFillIcon size="22" />
                    :
                    <LikeIcon size="22" />
            }
        </button>
    )
}
