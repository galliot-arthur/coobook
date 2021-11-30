import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShareIcon, UserCircleIcons } from '../ui/Icons'
import BookMarkButton from './recipes/BookMarkButton'
import LikeButton from './recipes/LikeButton'
import CommentButton from './recipes/CommentButton'
import ThreeDots from './ThreeDots'
import DeleteButton from './recipes/DeleteButton'
import EditButton from './recipes/EditButton'
import EditCoverButton from './recipes/EditCoverButton'
import ShareButton from './recipes/ShareButton'

export default function Recipe({ history, recipe }) {

    /* FORMAT DATE */
    const formatDate = str => moment(str).locale('fr').fromNow(true)


    const [likes, setLikes] = useState(recipe.likes.length)


    const onLike = (state) => {
        !state ? setLikes(likes + 1) : setLikes(likes - 1)
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
                            <NavLink to={"/profil/" + recipe.User.id} className="lead me-1">{recipe.User.firstName}</NavLink>
                            <i className="text-small text-muted"> il y a {formatDate(recipe.createdAt)}</i>
                        </div>
                    </div>

                    {/* OPTIONS */}
                    <div>
                        <ThreeDots >
                            <h6 className="mx-3">{recipe.title}</h6>
                            <ShareButton recipe={recipe} />
                            {
                                (recipe.User.id == window.localStorage.getItem('authId')) &&
                                <>
                                    <EditButton recipe={recipe} history={history} />
                                    <EditCoverButton recipe={recipe} history={history} />
                                    <DeleteButton id={recipe.id} history={history} />
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
                </div>

                {/* IMAGE */}
                <NavLink to={"/recette/" + recipe.id} className="d-flex justify-content-center">
                    {
                        recipe.recipesImages[0] ?
                            <img className="img-thumbnail w-75" src={"images/recipes/" + recipe.recipesImages[0].path} alt={recipe.slug} />
                            :
                            <img className="img-thumbnail w-75" src={"images/recipes/default-placeholder.png"} alt="illustration recette par défault" />
                    }
                </NavLink>
                {/* ACTIONS */}
                <div className="mt-3 mb-2 d-flex align-items-end">
                    <LikeButton recipe={recipe} onLike={onLike} />
                    <CommentButton recipe={recipe} history={history} />
                    <BookMarkButton recipe={recipe} />
                    <i className="text-muted text-small">{likes} j'aime{likes > 1 && 's'}</i>
                </div>

                <div className="align-items-start">
                    <NavLink
                        to={"/recette/" + recipe.id}
                        className="lead text-decoration-none display-5 text-break"
                    >
                        {recipe.title}
                    </NavLink>
                </div>
                <div className="text-muted mt-2">
                    {recipe.intro}
                    <NavLink to={"/recette/" + recipe.id} className="ms-1 text-decoration-none text-muted" >Voir plus...</NavLink>
                </div>

                <hr className="my-3" />
            </div>
        </div >
    )

}
