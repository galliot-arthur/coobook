import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcons } from '../ui/Icons'

export default function RecipeSmall({ recipe }) {

    const formatDate = str => moment(str).locale('fr').fromNow(true)

    return (
        <div key={recipe.id} className="row align-items-center fade-start">
            <div className="col-6 align-items-center">
                <div>
                    <NavLink
                        to={"/recette/" + recipe.id}
                        className="display-6"
                    >
                        {recipe.title}
                    </NavLink>
                </div>
            </div>

            <div className="col-6">
                <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="ps-1">
                        <NavLink to={"/recette/" + recipe.id} >
                            {
                                recipe.recipesImages[0] ?
                                    <img className="img-thumbnail-small" src={"images/recipes/" + recipe.recipesImages[0].path} alt={recipe.slug} />
                                    :
                                    <img className="img-thumbnail-small" src={"images/recipes/default-placeholder.png"} alt="illustration recette par défault" />
                            }
                        </NavLink>
                    </div>
                </div>
                <div className="text-end">
                    {
                        recipe.User.id != window.localStorage.getItem('authId') ?
                            <>
                                <UserCircleIcons />
                                <strong className="ms-1">{recipe.User.firstName}</strong> <br />
                            </>
                            :
                            <strong>Publié par moi <br /></strong>
                    }
                    <i className="text-muted">il y a {formatDate(recipe.createdAt)}</i>
                </div>
            </div>
            <hr className="mt-1" />
        </div>
    )
}
