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
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { toast } from 'react-toastify'

export default function ShowRecipe({ match, history }) {

    /* UTILITIES */
    const { id } = match.params
    const { width } = useWindowDimensions()
    const formatDate = str => moment(str).locale('fr').fromNow(true)

    /* HANDLE RECIPE */
    let recipe
    recipe = useSelector(state => selectOneRecipeById(state, id))
        ?
        useSelector(state => selectOneRecipeById(state, id))
        :
        JSON.parse(localStorage.getItem('recipesState')).find(r => r.id == id)

    if (!recipe) {
        toast.warning('Element inconnu')
        history.replace('/')
    }
    /* HANDLE LIKE */
    const [likes, setLikes] = useState(recipe.likes.length)
    const onLike = (state) => {
        !state ? setLikes(likes + 1) : setLikes(likes - 1)
    }
    /* MUTED FUNCTION TO AVOID ERRORS */
    const onDelete = () => { }


    return (
        <div className='fade-left'>

            {/* TITLE & INTRO */}
            <div className="d-flex justify-content-between align-items-start fade-start">
                <div>
                    <h1 className="display-4">{recipe.title}</h1>
                    <p className="lead">{recipe.intro}</p>
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
                </div>
            </div>

            {/* IMAGE & ACTIONS */}
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="row">
                    <div className="col-12 col-md-6 d-flex">
                        <Images recipe={recipe} />
                    </div>
                    <div className="col-6">
                        {width >= 768 && <Ingredients ingredients={recipe.ingredients} width={width} />}
                    </div>
                </div>
                <div className="my-3 d-flex justify-content-between align-items-center">
                    <div>
                        <LikeButton recipe={recipe} onLike={onLike} />
                        <CommentButton recipe={recipe} history={history} />
                        <BookMarkButton recipe={recipe} />
                        <i className="text-muted text-small me-5">{likes} j'aime{likes > 1 && 's'}</i>
                    </div>
                </div>

            </div>



            {/* TITLE */}
            <h3 className="my-3">{recipe.title}</h3>
            {/* INGREDIENTS */}
            {width < 768 && <Ingredients ingredients={recipe.ingredients} width={width} />}

            <h4 className="lead mt-3">Instructions :</h4>
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

        </div>
    )
}

const Steps = ({ steps }) => {

    if (steps.length == 0) return <></>

    return steps.map(step => <p key={step.id}>
        {step.content}
    </p>)
}
