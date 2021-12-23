import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import likeBookmark from '../../services/like&bookmark'
import { addLike, removeLike, selectLikeById } from '../../services/likeSlice'
import { setStateLike } from '../../services/recipeSlice'
import { LikeFillIcon, LikeIcon } from '../../ui/Icons'

export default function LikeButton({ recipe, onLike }) {

    const dispatch = useDispatch()
    const like = useSelector(state => selectLikeById(state, recipe.id))

    const toggleLike = async () => {
        onLike(like)
        try {
            likeBookmark.toggleAffiliation(
                like,
                'likes',
                recipe.id,
                recipe.likes
            )
            like
                ? dispatch(removeLike(recipe.id))
                : dispatch(addLike(recipe.id))

        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
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
