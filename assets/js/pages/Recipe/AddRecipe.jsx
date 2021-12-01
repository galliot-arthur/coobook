import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Field from '../../components/forms/Field'
import TextArea from '../../components/forms/TextArea'
import AddRecipeContext from '../../context/AddRecipeContext'
import FeedContext from '../../context/FeedContext'
import { useFeed } from '../../hooks/feedReducer'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'

export default function AddRecipe({ match, history }) {
    const [editing, setEditing] = useState(false)

    /* ADDING OR EDITING ? */
    const id = match.params.id

    /* INITIALIZE RECIPE */
    const [recipeData, setRecipeData] = useState({
        title: "",
        intro: "",
        outro: "",
        author: "",
    })

    /* HANDLE LOADING */
    const [loading, setLoading] = useState(false)

    /* IF EDIT MODE, GET RECIPE */
    const fetchRecipe = async (id) => {
        try {
            setLoading(true)
            const recipe = await API.get(id, 'recipes')
            const User = '/api/users/' + recipe.User.id
            setRecipeData({
                title: recipe.title,
                intro: recipe.intro,
                outro: recipe.outro,
                author: recipe.author,
                User: User,
            })
            setLoading(false)
            if (recipe.User.id != window.localStorage.getItem('authId')) {
                toast.warning('Erreur, element inconnu')
                history.replace('/')
            }
        } catch (e) {
            toast.warning('Erreur, element inconnu')
            setLoading(false)
            history.replace('/')
        }
    }
    useEffect(() => {
        if (id != 'nouveau') {
            setEditing(true)
            fetchRecipe(id)
        }
    }, [])

    /* HANDLE FORM CHANGES */
    function handleChange({ currentTarget }) {
        const { value, name } = currentTarget
        setRecipeData({ ...recipeData, [name]: value })
    }

    /* SET THE ADDING RECIPE CONTEXT */
    const { setIRI } = useContext(AddRecipeContext)

    /* HANDLE REDUCER & CONTEXT MANIPULATION  */
    const { updateItem, addItem } = useFeed()
    const { feedCxt, setFeed } = useContext(FeedContext)

    /* HANDLE SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!editing) {
                const { id } = await addItem(recipeData, 'recipes')
                /* FORCE FEED TO REFETCH DATA */
                setFeed([])
                /* SET IRI RECIPE SAVE POINT WITH CONTEXT AND COOKIE */
                setIRI(id)
                window.localStorage.setItem('IRI', id)
                history.replace('/enregistrer-ingredients/nouveau')
                setLoading(false)
            } else {
                const item = await updateItem(id, recipeData, 'recipes')
                setFeed(feedCxt.map(e => e.id == id ? item : e))
                setLoading(false)
                history.replace('/recette/' + id)
            }
        } catch (i) {
            console.log(i)
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

                        <div className="form-group mt-3">
                            <button className={"btn btn-danger " + (loading && "disabled")}>
                                Enregistrer
                            </button>
                        </div>
                    </form>
            }
        </div>
    )
}
