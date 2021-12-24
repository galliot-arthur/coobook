import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import RecipeSmall from '../../components/RecipeSmall'
import ThreeDots from '../../components/ThreeDots'
import FollowButton from '../../components/user/FollowButton'
import MessageButton from '../../components/user/MessageButton'
import { getUser } from '../../services/authSlice'
import { selectUserRecipes } from '../../services/recipeSlice'
import { UserCircleIcons } from '../../ui/Icons'


export default function Profile({ match }) {

    const user = useSelector(getUser).length > 1
        ? useSelector(getUser)
        : JSON.parse(localStorage.getItem('userState'))



    return (
        <div className='fade-left'>
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

                        recipes.filter(r => r.status !== 'deactivate').map(recipe => <RecipeSmall recipe={recipe} key={recipe.id} />)
                }
            </div>
        </div>
    )
}