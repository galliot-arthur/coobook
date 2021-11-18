import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { TreeDotsIcon, UserCircleIcons } from '../ui/Icons'
import BookMarkButton from './recipes/BookMarkButton'
import LikeButton from './recipes/LikeButton'
import CommentButton from './recipes/CommentButton'

export default function Recipe({ history, recipe }) {

    /* FORMAT DATE */
    const formatDate = str => moment(str).format('DD/MM/YYYY')

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
                {/* ACTIONS */}
                <div className="my-3">
                    <LikeButton recipe={recipe} />
                    <CommentButton recipe={recipe} history={history} />
                    <BookMarkButton recipe={recipe} />
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
