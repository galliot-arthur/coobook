import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'
import { ShareIcon, TrashIcons, TreeDotsIcon } from '../../ui/Icons'
import Ingredients from '../../components/recipes/Ingredients'
import Images from '../../components/recipes/Images'
import LikeButton from '../../components/recipes/LikeButton'
import BookMarkButton from '../../components/recipes/BookMarkButton'
import CommentButton from '../../components/recipes/CommentButton'
import Comments from '../Comment/Comments'
import ThreeDots from '../../components/ThreeDots'
import DeleteButton from '../../components/recipes/DeleteButton'
import { NavLink } from 'react-router-dom'


export default function ShowRecipe({ match, history }) {

    /* STATES AND */
    const [recipe, setRecipe] = useState([])
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])

    /* UTILITIES */
    const [loading, setLoading] = useState(false)
    const { id } = match.params

    /* GET THE RECIPE */
    const fetchRecipe = async id => {
        try {
            setLoading(true)
            const data = await API.get(id, 'recipes')
            setRecipe(data)
            setSteps(data.steps)
            setIngredients(data.ingredients)
            setLoading(false)
        } catch (e) {
            toast.warning('Element inconnu')
            history.push('/')
            setLoading(false)
        }
    }

    useEffect(() => { fetchRecipe(id) }, [])

    return (
        <div>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h1 className="display-4">{recipe.title}</h1>
                                <p className="lead">{recipe.intro}</p>
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
                                {/* <NavLink to='/' className="dropdown-item">
                                    Partager
                                    <span className="text-muted ms-2">
                                        <ShareIcon />
                                    </span>
                                </NavLink> */}
                                {
                                    ((recipe.User) && (recipe.User.id == window.localStorage.getItem('authId'))) &&
                                    <>
                                        <DeleteButton id={recipe.id} history={history} />
                                    </>
                                }
                            </ThreeDots>
                        </div>


                        {/* TITLE */}
                        <h3 className="mt-3">{recipe.title}</h3>
                        {/* INGREDIENTS */}
                        <Ingredients ingredients={ingredients} />

                        <p className="lead">Instructions :</p>
                        <Steps steps={steps} />
                        {
                            recipe.outro &&
                            <>
                                <p className="lead">Le mot de la fin :</p>
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
