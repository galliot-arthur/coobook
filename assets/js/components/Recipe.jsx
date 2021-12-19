import moment from 'moment'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcons } from '../ui/Icons'
import BookMarkButton from './recipes/BookMarkButton'
import LikeButton from './recipes/LikeButton'
import CommentButton from './recipes/CommentButton'
import ThreeDots from './ThreeDots'
import DeleteButton from './recipes/DeleteButton'
import EditButton from './recipes/EditButton'
import EditCoverButton from './recipes/EditCoverButton'
import ShareButton from './recipes/ShareButton'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { useHistory } from 'react-router-dom'

export default function Recipe({ recipe }) {

    const history = useHistory()
    /* FORMAT DATE */
    const formatDate = str => moment(str).locale('fr').fromNow(true)

    /* HANDLE LIKE */
    const [likes, setLikes] = useState(recipe.likes.length)
    const onLike = (state) => {
        !state ? setLikes(likes + 1) : setLikes(likes - 1)
    }

    /* HANDLE DELETE */
    const [deleted, setDeleted] = useState(false)
    const onDelete = () => setDeleted(true)
    if (deleted) return <></>

    const { height, width } = useWindowDimensions()

    return (
        <div key={recipe.id} className="row fade-left">

            {/* HEADER */}
            <div className="d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center justify-content-start">
                    <div>
                        <UserCircleIcons size="24" />
                    </div>
                    <div className="ps-2">
                        <NavLink to={"/profil/" + recipe.User.id} className="me-1">{recipe.User.firstName}</NavLink>
                        <i className="text-small text-muted"> il y a {formatDate(recipe.createdAt)}</i>
                    </div>
                </div>

                {/* OPTIONS */}
                <ThreeDots >
                    <h6 className="mx-3">{recipe.title}</h6>
                    <ShareButton recipe={recipe} />
                    {
                        (recipe.User.id == window.localStorage.getItem('authId')) &&
                        <>
                            <EditButton recipe={recipe} />
                            <DeleteButton id={recipe.id} onDelete={onDelete} />
                        </>
                    }

                    {/* IN THE TODO LIST (23/11/2021) */}

                    {/* <NavLink to='/' className="dropdown-item">
                            Signaler
                            <span className="text-muted ms-2">
                                <WarningIcon />
                            </span>
                        </NavLink> */}
                    {/* <NavLink to='/' className="dropdown-item">
                            Se désabonner
                            <span className="text-muted ms-2">
                                <StopIcon />
                            </span>
                        </NavLink> */}
                </ThreeDots>
            </div>

            {/* IMAGE */}
            <NavLink to={"/recette/" + recipe.id} className={"d-flex justify-content-center" + (width > 992 ? ' col-5' : '')}>
                {
                    recipe.recipesImages[0] ?
                        <img className="img-thumbnail" src={"images/recipes/" + recipe.recipesImages[0].path} alt={recipe.slug} />
                        : md -
                        <img className="img-thumbnail" src={"images/recipes/default-placeholder.png"} alt="illustration recette par défault" />
                }
            </NavLink>
            <div className={width > 992 ? 'col-7' : 'mt-3'}>
                {/* ACTIONS */}
                <div className="mb-2 d-flex justify-content-center justify-content-lg-start align-items-md-end">
                    <LikeButton recipe={recipe} onLike={onLike} />
                    <BookMarkButton recipe={recipe} />
                    <i className="text-muted text-small">{likes} j'aime{likes > 1 && 's'}</i>
                </div>

                <div className="align-items-start">
                    <NavLink
                        to={"/recette/" + recipe.id}
                        className="lead text-decoration-none display-6 text-break"
                    >
                        {recipe.title}
                    </NavLink>
                </div>
                <div className="text-dark mt-2">
                    {recipe.intro}
                    <NavLink to={"/recette/" + recipe.id} className="ms-1 text-decoration-none text-muted" >Voir plus...</NavLink>
                </div>
            </div>

            <hr className={width > 992 ? 'my-5' : 'my-3'} />
        </div >
    )

}
