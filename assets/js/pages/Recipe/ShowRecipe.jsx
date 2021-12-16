import React, { useState } from 'react'
import { Loader } from '../../ui/Loader'
import Ingredients from '../../components/recipes/Ingredients'
import Images from '../../components/recipes/Images'
import LikeButton from '../../components/recipes/LikeButton'
import BookMarkButton from '../../components/recipes/BookMarkButton'
import CommentButton from '../../components/recipes/CommentButton'
import Comments from '../Comment/Comments'
import ThreeDots from '../../components/ThreeDots'
import DeleteButton from '../../components/recipes/DeleteButton'
import EditButton from '../../components/recipes/EditButton'
import EditCoverButton from '../../components/recipes/EditCoverButton'
import ShareButton from '../../components/recipes/ShareButton'
import moment from 'moment'
import { UserCircleIcons } from '../../ui/Icons'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOneRecipeById } from '../../services/recipeSlice'

export default function ShowRecipe({ match, history }) {

    /* FORMAT DATE */
    const formatDate = str => moment(str).locale('fr').fromNow(true)

    /* UTILITIES */
    const [loading, setLoading] = useState(false)
    const { id } = match.params

    let recipe

    recipe = useSelector(state => selectOneRecipeById(state, id))
        ?
        useSelector(state => selectOneRecipeById(state, id))
        :
        JSON.parse(localStorage.getItem('recipesState')).find(r => r.id == id)

    if (recipe.length < 1) { return <Loader /> }

    const onDelete = () => { }
    return (
        <div className='fade-left'>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <div className="d-flex justify-content-between align-items-start fade-start">
                            <div>
                                <h1 className="display-4">{recipe.title}</h1>
                                <p className="lead">{recipe.intro}</p>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <UserCircleIcons size="24" />
                                    </div>
                                    <div className="ps-2">
                                        <NavLink to={"/profil/" + recipe.User.id} className="lead me-1">{recipe.User.firstName}</NavLink>
                                        <span className="text-small text-muted"> il y a {formatDate(recipe.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        {/* THEN */}
                        <Images recipe={recipe} />

                        {/* ACTION */}
                        <div className="my-3 d-flex justify-content-between align-items-center">
                            <div>
                                {recipe.likes && <LikeButton recipe={recipe} />}
                                <CommentButton recipe={recipe} history={history} />
                                {recipe.bookMarks && <BookMarkButton recipe={recipe} />}
                            </div>
                            <ThreeDots >
                                <ShareButton recipe={recipe} />
                                {
                                    ((recipe.User) && (recipe.User.id == window.localStorage.getItem('authId'))) &&
                                    <EditButton recipe={recipe} history={history} />
                                }
                                {
                                    ((recipe.User) && (recipe.User.id == window.localStorage.getItem('authId'))) &&
                                    <EditCoverButton recipe={recipe} history={history} />
                                }
                                {
                                    ((recipe.User) && (recipe.User.id == window.localStorage.getItem('authId'))) &&
                                    <DeleteButton id={recipe.id} onDelete={onDelete} />
                                }

                            </ThreeDots>
                        </div>


                        {/* TITLE */}
                        <h3 className="mt-3">{recipe.title}</h3>
                        {/* INGREDIENTS */}
                        <Ingredients ingredients={recipe.ingredients} />

                        <h4 className="lead">Instructions :</h4>
                        <Steps steps={recipe.steps} />
                        {
                            recipe.outro &&
                            <>
                                <h4 className="lead">Le mot de la fin :</h4>
                                <p>
                                    {recipe.outro}
                                </p>
                            </>
                        }
                        <hr />
                        {
                            recipe.comments &&
                            <Comments recipe={recipe} />

                        }
                        <div className="d-flex justify-content-end">
                            <CommentButton recipe={recipe} history={history} text="Ajouter un commentaire à cette recette" />
                        </div>
                    </>
            }
        </div>
    )
}

const Steps = ({ steps }) => {

    if (steps.length == 0) return <></>

    return steps.map(step => <p key={step.id}>
        {step.content}
    </p>)
}
