import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'
import { MinusIcons, PlusIcons, TrashIcons } from '../../ui/Icons'

export default function ShowRecipe({ match, history }) {
    const [recipe, setRecipe] = useState([])
    const [steps, setSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = match.params
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


    const handleDelete = async () => {
        try {
            await API.deleteById(id, 'recipes')
            toast.info('Cette recette à bien été supprimée')
            history.replace('/mes-recettes')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }
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
                        <div className="card">
                            <RecipeImage recipe={recipe} />
                            <div className="card-body">


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
                            </div>
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

const RecipeImage = ({ recipe }) => {

    if (recipe.recipesImages == undefined) {
        return (
            <img
                className="card-img-top"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault" />
        )
    } else if (recipe.recipesImages[0] == undefined) {
        return (
            <img
                className="card-img-top"
                src={"images/recipes/default-placeholder.png"}
                alt="illustration recette par défault" />
        )
    } else {
        return (
            <img
                className="card-img-top"
                src={"images/recipes/" + recipe.recipesImages[0].path}
                alt={recipe.slug} />
        )
    }
}

const Ingredients = ({ ingredients }) => {
    /* HANDLE EMPTY INGREDIENTS OR UNINITIALIZED VALUE */
    if (ingredients.length == 0) return <></>

    const handleInputChange = () => {
        alert('still a thing to do')
    }

    return (<>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="lead">Ingrédients :</div>
            <div>
                <button className="" onClick={() => handleInputChange(+1)}>
                    <PlusIcons />
                </button>
                <button className="" onClick={() => handleInputChange(-1)}>
                    <MinusIcons />
                </button>
            </div>
        </div>
        <ul className="list-group mb-3">
            {
                ingredients.map(ingredient => <li className="list-group-item" key={ingredient.id} >
                    {ingredient.amount} {ingredient.name}
                </li>)
            }
        </ul>
    </>)

}

