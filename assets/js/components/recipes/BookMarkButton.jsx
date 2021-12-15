import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addBookmark, removeBookmark } from '../../services/bookMarkSlice'
import likeBookmark from '../../services/like&bookmark'
import { BookMarkFilledIcon, BookMarkIcon } from '../../ui/Icons'

export default function BookMarkButton({ recipe }) {

    const dispatch = useDispatch()
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
            if (bookmark) {
                dispatch(removeBookmark(recipe.id))
            } else {
                dispatch(addBookmark(recipe))
            }
        } catch (e) {
            //toast.warning('Erreur, merci de réessayer.')
            //setBookmark(!bookmark)
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
