import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import likeBookmark from '../../services/like&bookmark'
import { LikeFillIcon, LikeIcon } from '../../ui/Icons'

export default function LikeButton({ recipe }) {
    const [like, setLike] = useState(false)

    useEffect(() => {
        if (recipe.likes.length > 0) {
            setLike(likeBookmark.isUserLike(recipe.likes))
        }
    }, [])

    const toggleLike = async () => {
        setLike(!like)
        try {
            likeBookmark.toggleAffiliation(
                like,
                'likes',
                recipe.id,
                recipe.likes
            )
        } catch (e) {
            console.log(e)
            toast.warning('Erreur, merci de réessayer.')
            setLike(!like)
        }
    }

    return (
        <button className="me-3" onClick={toggleLike}>
            {
                like ?
                    <LikeFillIcon size="24" />
                    :
                    <LikeIcon size="24" />
            }
        </button>
    )
}
