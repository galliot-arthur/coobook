import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Field from '../../components/forms/Field'
import TextArea from '../../components/forms/TextArea'
import { addRecipe } from '../../services/recipeSlice'

export default function AddRecipe({ history }) {

    const dispatch = useDispatch()

    /* INITIALIZE RECIPE */
    const [recipeData, setRecipeData] = useState({
        title: "",
        intro: "",
        outro: "",
        author: "",
    })

    /* HANDLE FORM CHANGES */
    function handleChange({ currentTarget }) {
        const { value, name } = currentTarget
        setRecipeData({ ...recipeData, [name]: value })
    }

    /* HANDLE SUBMIT */
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(addRecipe(recipeData))
            history.push('/enregistrer-ingredients/nouveau')
        } catch (i) {
            toast.warning("Erreur ! Merci d'essayer à nouveau.")
        }
    }

    return (
        <div className='fade-left'>
            <h1 className="display-4">Enregistrer une recette</h1>
            <p className="lead">Un bon ragout, ou peut être une magnifique salade ?</p>
            <hr className="my-4" />
            {/* THEN */}

            <div className="d-flex flex-column justify-content-center align-items-center">

                <form onSubmit={handleSubmit} className="form-group d-flex flex-column">
                    <Field
                        name="title"
                        label="Titre"
                        value={recipeData.title}
                        onChange={handleChange}
                        placeholder="Baba Ganoush"
                        type="text"
                        minLength="5"
                    />
                    <TextArea
                        name="intro"
                        label="Introduction"
                        value={recipeData.intro}
                        onChange={handleChange}
                        placeholder="Un plat traditionnel qui réchauffe les coeurs."
                        minLength="5"
                    />
                    <TextArea
                        name="outro"
                        label="Note de fin"
                        value={recipeData.outro}
                        onChange={handleChange}
                        placeholder="Bon apétit !"
                        minLength="5"
                        required={false}
                    />
                    <Field
                        name="author"
                        label="Auteur"
                        value={recipeData.author}
                        onChange={handleChange}
                        placeholder="Préciser si la recette vient de quelqu'un d'autre !"
                        type="text"
                        minLength="2"
                        required={false}
                    />

                    <div className="mt-3 mx-auto">
                        <button className="btn btn-danger ">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
