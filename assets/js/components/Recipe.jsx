import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import likeBookmark from '../services/like&bookmark'
import { BookMarkFilledIcon, BookMarkIcon, CommentIcon, LikeFillIcon, LikeIcon, TreeDotsIcon, UserCircleIcons, UserFeedIcon } from '../ui/Icons'

export default function Recipe({ recipe }) {

    /* FORMAT DATE */
    const formatDate = str => moment(str).format('DD/MM/YYYY')

    /* HANDLE LIKE */
    const [like, setLike] = useState(false)

    /* INITIALIZE LIKE STATES */
    useEffect(() => {
        if (recipe.likes.length > 0) {
            let rez = likeBookmark.isUserLike(
                window.localStorage.getItem('authId'),
                recipe.likes
            )
            setLike(rez)
        }
    }, [])

    /* TOGGLE LIKE */
    const toggleLike = async () => {
        setLike(!like)
        //console.log(like)
        try {
            likeBookmark.toggleAffiliation(
                like,
                'likes',
                recipe.id,
                window.localStorage.getItem('authId'),
                recipe.likes
            )
        } catch (e) {
            console.log(e)
            toast.warning('Erreur, merci de réessayer.')
            setLike(!like)
        }
    }

    /* HANDLE BOOKMARS */
    const [bookmark, setBookmark] = useState(false)
    /* INITIALIZE BOOKMARKS */
    useEffect(() => {
        if (recipe.bookMarks.length > 0) {
            let rez = likeBookmark.isUserLike(
                window.localStorage.getItem('authId'),
                recipe.bookMarks
            )
            setBookmark(rez)
        }
    }, [])
    /* TOGGLE BOOKMARKS */
    const toggleBookmark = async () => {
        setBookmark(!bookmark)
        try {
            likeBookmark.toggleAffiliation(
                bookmark,
                'book_marks',
                recipe.id,
                window.localStorage.getItem('authId'),
                recipe.bookMarks
            )
        } catch (e) {
            console.log(e)
            toast.warning('Erreur, merci de réessayer.')
            setLike(!like)
        }
    }

    return (
        <div key={recipe.id} className="row fade-start">
            <div className="col-12 col-lg-6 col-md-10 col-sm-10 mx-auto">

                {/* HEADER */}
                <div className="d-flex align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center justify-content-start">
                        <div>
                            <UserCircleIcons size="24" />
                        </div>
                        <div className="ps-2">
                            <span className="lead">{recipe.User.firstName}</span>
                            <span className="text-small text-muted"> le {formatDate(recipe.createdAd)}</span>
                        </div>
                    </div>
                    <button>
                        <TreeDotsIcon size="24" />
                    </button>
                </div>
                {/* IMAGE */}
                <NavLink to={"recette/" + recipe.id} className="d-flex justify-content-center">
                    {
                        recipe.recipesImages[0] ?
                            <img className="img-thumbnail w-75" src={"images/recipes/" + recipe.recipesImages[0].path} alt={recipe.slug} />
                            :
                            <img className="img-thumbnail w-75" src={"images/recipes/default-placeholder.png"} alt="illustration recette par défault" />
                    }
                </NavLink>
                <div className="my-3">
                    <button className="me-3" onClick={toggleLike}>
                        {
                            like ?
                                <LikeFillIcon size="24" />
                                :
                                <LikeIcon size="24" />
                        }
                    </button>
                    <button className="me-3">
                        <CommentIcon size="24" />
                    </button>
                    <button className="me-3" onClick={toggleBookmark}>
                        {
                            bookmark ?
                                <BookMarkFilledIcon size="24" />
                                :
                                <BookMarkIcon size="24" />
                        }

                    </button>
                </div>

                <div className="align-items-start">
                    <NavLink
                        to={"recette/" + recipe.id}
                        className="lead text-decoration-none display-5 text-break"
                    >
                        {recipe.title}
                    </NavLink>
                </div>
                <div className="text-small text-muted mt-2">
                    {recipe.intro}
                </div>

                <hr className="my-3" />
            </div>
        </div>
    )

}
