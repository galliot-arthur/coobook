import moment from 'moment'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { UserCircleIcons } from '../ui/Icons'

let RecipeSmall = ({ recipe }) => {

    const formatDate = str => moment(str).locale('fr').fromNow(true)
    const { height, width } = useWindowDimensions()


    return (
        <div key={recipe.id} className="row align-items-center fade-left">
            <div className="col-6 align-items-center">
                <div>
                    <NavLink
                        to={"/recette/" + recipe.id}
                        className="h5"
                    >
                        {recipe.title}
                    </NavLink>
                </div>
                {width > 500 &&
                    <div>
                        {recipe.intro.substring(0, 150)}... <Link to={"/recette/" + recipe.id} >Lire plus</Link>
                    </div>
                }
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

export default RecipeSmall = React.memo(RecipeSmall)