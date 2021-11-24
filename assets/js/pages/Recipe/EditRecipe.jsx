import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Field from '../../components/forms/Field'
import TextArea from '../../components/forms/TextArea'
import API from '../../services/API'

export default function EditRecipe({ match, history }) {
    const [recipe, setRecipe] = useState({
        title: "",
        intro: "",
        updatedAt: new Date(),
        User: [],
        outro: "",
        author: "",
        steps: [],
        ingredients: [],
    })
    const id = match.params.id

    /* GET RECIPE */
    const fetchRecipe = async (id) => {
        try {
            const recipe = await API.get(id, 'recipes')
            setRecipe(recipe)
            if (recipe.User.id !== window.localStorage.getItem('authId')) {
                toast.warning('Erreur, element inconnu')
                history.replace('/')
            }
        } catch (e) {
            toast.warning('Erreur, element inconnu')
            history.replace('/')
        }
    }
    useEffect(() => {
        fetchRecipe(id)
    }, [])

    const handleChange = () => {

    }
    return (
        <div>
            <Field
                name="title"
                label="Titre"
                value={recipe.title}
                onChange={handleChange}
                placeholder="Baba Ganoush"
                type="text"
                minLength="5"
            />
            <TextArea
                name="intro"
                label="Introduction"
                value={recipe.intro}
                onChange={handleChange}
                placeholder="Un plat traditionnel qui réchauffe les coeurs."
                minLength="5"
            />
            <TextArea
                name="outro"
                label="Note de fin"
                value={recipe.outro}
                onChange={handleChange}
                placeholder="Un plat traditionnel qui réchauffe les coeurs."
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
    )
}
