import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThreeDots from '../../components/ThreeDots'
import FollowButton from '../../components/user/FollowButton'
import MessageButton from '../../components/user/MessageButton'
import API from '../../services/API'
import { UserCircleIcons } from '../../ui/Icons'

import { Loader } from '../../ui/Loader'

export default function Profile({ match, history }) {

    const [loading, setLoading] = useState(false)
    /* FETCH RECIPES */
    const [recipes, setRecipes] = useState([])

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        website: "",
        bio: "",
        follows: [],
    })
    const fetchRecipesAndUser = async () => {
        setLoading(true)
        try {
            const dataR = await API.findAll('users/' + match.params.id + '/recipes')
            setRecipes(dataR)
            const dataU = await API.get(match.params.id, 'users')
            setUser({
                firstName: dataU.firstName,
                lastName: dataU.lastName,
                website: dataU.website,
                bio: dataU.bio,
                follows: dataU.follows,
            })
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }
    //useEffect(() => { fetchRecipesAndUser() }, [])
    useEffect(() => { fetchRecipesAndUser() }, [match.params.id])

    return (
        <div>
            {loading ?
                <Loader />
                :
                <>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>
                                <span className="me-2">
                                    <UserCircleIcons />
                                </span>
                                {user.firstName}
                            </strong>
                            <h1 className="display-4 mt-2">
                                {user.lastName}
                            </h1>
                            <div >
                                {user.bio} <br />
                                <a href={user.website} target="_blank">{user.website}</a>
                            </div>
                            {
                                match.params.id != window.localStorage.getItem('authId') &&
                                <div className="mt-3">
                                    <FollowButton target={match.params.id} user={user} />
                                    <MessageButton />
                                </div>
                            }
                        </div>
                        <ThreeDots>
                            <h6 className="mx-3">{user.firstName}</h6>
                            {match.params.id == window.localStorage.getItem('authId')
                                ?
                                <>
                                    <NavLink to='/editer-mon-profil' className="dropdown-item">Editer mon profil</NavLink>
                                    <NavLink to='/' className="dropdown-item">Paramêtres du compte</NavLink>
                                    <NavLink to='/' className="dropdown-item">Statistiques</NavLink>
                                </>
                                :
                                <>
                                    <NavLink to='/editer-mon-profil' className="dropdown-item">Signaler ce profil</NavLink>
                                </>}
                        </ThreeDots>
                    </div>
                    <hr className="my-4" />

                    {/* THEN */}
                    <div className="container mb-5">
                        {
                            recipes.length == 0 ?
                                <div>
                                    Vous n'avez pas encore ajouté de recette.
                                </div> :

                                recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)
                        }
                    </div>
                </>
            }

        </div>
    )
}

const Recipe = ({ recipe }) => {

    const formatDate = str => moment(str).format('DD/MM/YYYY')

    return (
        <div key={recipe.id} className="row align-items-center fade-start">
            <div className="col-6 align-items-center">
                <div>
                    <NavLink
                        to={"/recette/" + recipe.id}
                        className="lead text-decoration-none"
                    >{recipe.title}</NavLink>
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
            </div>
            <hr className="mt-1" />
        </div>
    )

}
