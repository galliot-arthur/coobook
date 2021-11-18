import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Field from '../../components/forms/Field'
import TextArea from '../../components/forms/TextArea'
import AddRecipeContext from '../../context/AddRecipeContext'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'

export default function AddRecipe({ history }) {

    /* INITIALIZE RECIPE */
    const [ingredient, setRecipe] = useState({
        title: "",
        intro: "",
        outro: "",
        author: "",
    })

    /* HANDLE LOADING */
    const [loading, setLoading] = useState(false)

    /* HANDLE ERROR */
    const [error, setError] = useState(false)

    /* HANDLE FORM CHANGES */
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setRecipe({ ...ingredient, [name]: value })
    }

    /* GET CONTEXT */
    const { setIRI } = useContext(AddRecipeContext);

    /* HANDLE SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { id } = await API.post(ingredient, 'recipes')
            setIRI(id)
            window.localStorage.setItem('IRI', id)
            setLoading(false)
            history.replace('/ajout-ingredients')
        } catch (e) {
            toast.warning("Erreur ! Merci d'essayer à nouveau.")
            setLoading(false)
        }
    }


    return (
        <div>
            <h1 className="display-4">Enregistrer une recette</h1>
            <p className="lead">Un bon ragout, ou peut être une magnifique salade ?</p>
            <hr className="my-4" />
            {/* THEN */}
            {
                loading ?
                    <Loader />
                    :
                    <form onSubmit={handleSubmit} className="form-group">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Field
                            name="title"
                            label="Titre"
                            value={ingredient.title}
                            onChange={handleChange}
                            placeholder="Baba Ganoush"
                            type="text"
                            minLength="5"
                        />
                        <TextArea
                            name="intro"
                            label="Introduction"
                            value={ingredient.intro}
                            onChange={handleChange}
                            placeholder="Un plat traditionnel qui réchauffe les coeurs."
                            minLength="5"
                        />
                        <TextArea
                            name="outro"
                            label="Note de fin"
                            value={ingredient.outro}
                            onChange={handleChange}
                            placeholder="Bon apétit !"
                            minLength="5"
                            required={false}
                        />
                        <Field
                            name="author"
                            label="Auteur"
                            value={ingredient.author}
                            onChange={handleChange}
                            placeholder="Préciser si la recette vient de quelqu'un d'autre !"
                            type="text"
                            minLength="2"
                            required={false}
                        />

                        <div className="form-group mt-3">
                            <button className={"btn btn-primary " + (loading && "disabled")}>
                                Enregistrer
                            </button>
                        </div>
                    </form>
            }
        </div>
    )
}
