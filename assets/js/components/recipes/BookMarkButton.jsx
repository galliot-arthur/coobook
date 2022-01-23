import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addBookmark, removeBookmark, selectBookMarkById } from '../../services/bookMarkSlice'
import likeBookmark from '../../services/like&bookmark'
import { BookMarkFilledIcon, BookMarkIcon } from '../../ui/Icons'

let BookMarkButton = ({ recipe }) => {

    const dispatch = useDispatch()

    const [bookmark, setBookmark] = useState(false)
    const bookmarkedRecipe = useSelector(state => selectBookMarkById(state, recipe.id))

    useEffect(() => {
        if (bookmarkedRecipe) {
            setBookmark(true)
        }
    }, [bookmarkedRecipe])

    /* HANDLE TOGGLE */
    async function toggleBookmark() {
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
            toast.warning('Erreur, merci de réessayer.')
            setBookmark(!bookmark)
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


export default BookMarkButton = React.memo(BookMarkButton)