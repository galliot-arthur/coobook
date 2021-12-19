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
import { useEffect } from 'react'
import AddComment from '../Comment/AddComment'
import EditSteps from '../../components/editRecipes/EditSteps'

export default function ShowRecipe({ match, history }) {

    /* UTILITIES */
    const { id } = match.params
    const { width } = useWindowDimensions()
    const formatDate = str => moment(str).locale('fr').fromNow(true)

    /* HANDLE RECIPE */
    const recipe = useSelector(state => selectOneRecipeById(state, id))

    /* HANDLE LIKE */
    const [likes, setLikes] = useState(0)
    useEffect(() => { recipe && setLikes(recipe.likes.length) }, [recipe])

    const onLike = (state) => !state ? setLikes(likes + 1) : setLikes(likes - 1)

    if (!recipe) return <Loader />

    /* MUTED FUNCTION TO AVOID ERRORS */
    const onDelete = () => { }

    return (
        <div className='fade-left mb-lg-5'>

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
                                <EditButton recipe={recipe} />
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
                        {width >= 768 && <Ingredients recipe={recipe} ingredients={recipe.ingredients} width={width} />}

                    </div>
                </div>
                <div className="my-3 d-flex justify-content-between align-items-center">
                    <div>
                        <LikeButton recipe={recipe} onLike={onLike} />
                        <BookMarkButton recipe={recipe} />
                        <i className="text-muted text-small me-5">{likes} j'aime{likes > 1 && 's'}</i>
                    </div>
                </div>

            </div>

            {/* INGREDIENTS */}
            {width < 768 && <Ingredients recipe={recipe} width={width} />}

            <h2 className="mt-3">Etapes</h2>
            {
                recipe.User.id == window.localStorage.getItem('authId')
                    ? <EditSteps recipeData={recipe} />
                    : <Steps steps={recipe.steps} />
            }
            {
                recipe.outro &&
                <>
                    <h2>Pour Finir</h2>
                    <p>
                        {recipe.outro}
                    </p>
                </>
            }
            <hr />

            {/* COMMENTS */}
            <Comments recipe={recipe} />

            <div className="d-flex justify-content-end">
                <AddComment recipe={recipe} />
            </div>
        </div>
    )
}

const Steps = ({ steps }) => {

    if (steps.length == 0) return <>Cette recette est incomplète.</>

    return steps.map((step, key) => <p key={step.id}>
        <b className='h6 text-primary me-1'>{key + 1}</b>{step.content}
    </p>)
}
