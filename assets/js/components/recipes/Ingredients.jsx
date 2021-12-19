import React, { useState } from "react"
import { MinusIcons, PlusIcons } from "../../ui/Icons"
import EditIngredient from "../editRecipes/EditIngredient"

export default function Ingredients({ recipe, width }) {

    const ingredients = recipe.ingredients
    /* HANDLE EMPTY INGREDIENTS  */
    if (ingredients.length < 1) return <b className="text-primary">Cette recette est incomplete ! Merci d'ajouter la liste des ingrédients.</b>

    const [proportion, setProportion] = useState(1)

    if (proportion == 0) setProportion(0.5)

    const tempIngredients = [...ingredients]
    tempIngredients.forEach((v, k) => {
        tempIngredients[k] = { ...tempIngredients[k], tempAmount: v.amount * proportion }
    })

    return (
        <div className={width < 922 ? 'ms-md-3' : ''}>

            <div className="d-flex flex-row justify-content-between align-items-start mb-3">
                <h2>Ingrédients :</h2>

                <div className="d-flex flex-column align-items-end">
                    <span className={"text-small text-muted mb-1 text-end"}>Modifier les proportions</span>
                    <div className="d-flex">
                        <button className="rounded-btn me-1" aria-label="augmenter les proportions" onClick={() => setProportion(proportion + 0.5)}>
                            <PlusIcons />
                        </button>
                        <button className="rounded-btn" aria-label="diminuer les proportions" onClick={() => setProportion(proportion - 0.5)}>
                            <MinusIcons />
                        </button>
                    </div>
                </div>
            </div>

            <ul className="list-group">
                {
                    recipe.User.id == window.localStorage.getItem('authId')
                        ? tempIngredients.map(ingredient => <EditIngredient recipeData={recipe} ingredient={ingredient} onEdit={() => setProportion(1)} key={ingredient.id} />)
                        : tempIngredients.map(ingredient => <Ingredient ingredient={ingredient} key={ingredient.id} />)
                }
            </ul>
        </div>
    )

}

const Ingredient = ({ ingredient }) => <>
    <li className="list-group-item fade-start">
        <b>{ingredient.tempAmount}</b> {ingredient.name}
    </li>
</>