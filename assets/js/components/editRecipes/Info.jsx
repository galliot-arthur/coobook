import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { editRecipe } from "../../services/recipeSlice"
import Field from "../forms/Field"
import TextArea from "../forms/TextArea"

export const Info = ({ recipeData, onEdited }) => {

    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState(recipeData)

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setRecipe({ ...recipe, [name]: value })
    }

    const handleSubmit = () => {
        dispatch(editRecipe({ id: recipeData.id, data: recipe }))
        toast.info('Votre recette a bien été modifié.')
        onEdited(true)
    }

    return <>
        <form className='row fade-left' onSubmit={handleSubmit}>
            <div className='col-12 col-sm-5'>
                <Field
                    name="title"
                    label="Titre"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Baba Ganoush"
                    type="text"
                    minLength="5"
                />
                <Field
                    name="author"
                    label="Auteur"
                    value={recipe.author}
                    onChange={handleChange}
                    placeholder="Paul Bocuse"
                    type="text"
                    minLength="5"
                />
            </div>
            <div className="col-12 col-sm-7">
                <TextArea
                    classDiv="mb-2"
                    name="intro"
                    label="Introduction"
                    value={recipe.intro}
                    onChange={handleChange}
                    placeholder="Un plat traditionnel qui réchauffe les coeurs."
                    minLength="5"
                />
                <TextArea
                    classDiv="mb-2"
                    name="outro"
                    label="Note de fin"
                    value={recipe.outro}
                    onChange={handleChange}
                    placeholder="Un plat traditionnel qui réchauffe les coeurs."
                    minLength="5"
                />
            </div>
            <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </div>
        </form>
        <hr />
    </>
}
