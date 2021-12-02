import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import likeBookmark from '../../services/like&bookmark'
import { BookMarkFilledIcon, BookMarkIcon } from '../../ui/Icons'

export default function BookMarkButton({ recipe }) {

    const [bookmark, setBookmark] = useState(false)
    /* INITIALIZE BOOKMARK STATE */
    useEffect(() => {
        if (recipe.bookMarks.length > 0) {
            setBookmark(likeBookmark.isUserLike(recipe.bookMarks))
        }
    }, [])
    /* HANDLE TOGGLE */
    const toggleBookmark = async () => {
        setBookmark(!bookmark)
        try {
            likeBookmark.toggleAffiliation(
                bookmark,
                'book_marks',
                recipe.id,
                recipe.bookMarks
            )
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
            setLike(!bookmark)
        }
    }
    return (
        <button className="me-3" onClick={toggleBookmark}>
            {bookmark ?
                <BookMarkFilledIcon size="22" />
                :
                <BookMarkIcon size="22" />}
        </button>
    )
}
