import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'
import { CommentIcon, TrashIcons } from '../../ui/Icons'
import Ingredients from '../../components/recipes/Ingredients'
import Images from '../../components/recipes/Images'
import LikeButton from '../../components/recipes/LikeButton'
import BookMarkButton from '../../components/recipes/BookMarkButton'

export default function ShowRecipe({ match, history }) {

    /* STATES AND */
    const [recipe, setRecipe] = useState([])
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])

    /* UTILITIES */
    const [loading, setLoading] = useState(false)
    const { id } = match.params

    const [commenting, setCommenting] = useState(false)
    console.log(commenting)

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

    /* HANDLE DELETE AND UPDATE */
    const handleDelete = async () => {
        try {
            await API.deleteById(id, 'recipes')
            toast.info('Cette recette à bien été supprimée')
            history.replace('/mes-recettes')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }

    const toggleComment = () => { setCommenting(!commenting) }

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

                        {/* EDIT DELETE */}
                        <div className="d-flex justify-content-end align-items-center">
                            <button onClick={() => handleDelete()}>
                                <TrashIcons />
                            </button>
                        </div>
                        <hr className="my-4" />

                        {/* THEN */}
                        <Images recipe={recipe} />

                        {/* ACTION */}
                        <div className="my-3">
                            {recipe.likes && <LikeButton recipe={recipe} />}
                            <button className="me-3">
                                <CommentIcon size="24" onClick={toggleComment} />
                            </button>
                            {recipe.bookMarks && <BookMarkButton recipe={recipe} />}
                        </div>
                        {/* COMMENT */}
                        {
                            commenting &&
                            <addComments recipe={recipe} />
                        }
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
