import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { deleteStep, editIngredient } from "../../services/recipeSlice"
import { EditIcons } from '../../ui/Icons'

export default function EditIngredient({ recipeData, ingredient, onEdit }) {

    const dispatch = useDispatch()

    const [ingredientData, setIngredient] = useState(ingredient)

    const [edit, setEdit] = useState(false)

    if (edit) onEdit()

    const handleClick = (e) => {
        e.detail == 2 && setEdit(true)
    }

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setIngredient({ ...ingredientData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const recipe = { ...recipeData }

        if (ingredientData.amount == '' && ingredientData.name == '') {
            recipe.steps = recipe.steps
                .filter(s => s.id !== ingredientData.id)
            dispatch(deleteStep({
                id: ingredientData.id, recipe: recipe
            }))
        } else {
            console.log(ingredient)
            recipe.ingredients = recipe.ingredients
                .map(i => i.id == ingredientData.id ? ingredientData : i)
            dispatch(editIngredient({
                id: ingredientData.id, ingredient: ingredientData, recipe: recipe
            }))
        }
        setEdit(false)
    }
    return <>
        {
            edit
                ? <li className="list-group-item fade-start" >
                    <button onClick={() => setEdit(false)}><EditIcons size={12} /> Annuler</button>
                    <form className='fade-left' onSubmit={handleSubmit}>
                        <input
                            type='number'
                            className="form-ingredient-input"
                            name='amount'
                            onChange={handleChange}
                            value={ingredientData.amount}
                        />
                        <input
                            className="form-ingredient-input"
                            name='name'
                            onChange={handleChange}
                            value={ingredientData.name}
                        />
                        <button type="submit" className='text-primary mt-2'>Enregistrer</button>
                    </form>
                </li>
                : <li className="list-group-item fade-start" onClick={handleClick}>
                    <b>{ingredient.tempAmount}</b> {ingredient.name} <button onClick={() => setEdit(true)} className="text-muted ms-1"><EditIcons size={12} /></button>
                </li>
        }
    </>
}
