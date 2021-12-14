import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { addIngredient } from "../services/recipeSlice"

export default function useFields() {

    const dispatch = useDispatch()
    const history = useHistory()


    const [formValues, setFormValues] = useState([{
        amount: 0,
        name: "",
        recipe: '',
    }])

    /**
     * Handle Change of a single field
     * @param {Number} index 
     * @param {HTMLElement} element 
     */
    const handleChange = (index, element) => {
        let newFormValues = [...formValues];
        newFormValues[index][element.target.name] = element.target.value;
        setFormValues(newFormValues);
    }

    /**
     * Add form field to the list
     * @param {Number} amount 
     * @param {String} name 
     */
    const addFormField = (amount = 0, name = "") => {
        setFormValues(
            [...formValues, { amount: amount, name: name, recipe: '' }])
    }

    /**
     * Remove a field
     * @param {Number} index 
     */
    const removeFormField = (index) => {
        let newFormValues = [...formValues];
        newFormValues.splice(index, 1);
        setFormValues(newFormValues)
    }

    /**
     * Launch every single submit request
     * @param {FormData} formValues 
     */
    const AxiosPOST = async (formValues) => {
        formValues.map(async form => {
            dispatch(addIngredient(form))
        })
    }

    /**
     * Handle general submit
     * @param {Event} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        formValues.forEach(f => f.recipe = localStorage.getItem('IRI'))
        try {
            await AxiosPOST(formValues)
            history.push('/enregistrer-etape')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }

    return {
        formValues,
        handleChange,
        addFormField,
        removeFormField,
        handleSubmit,
    }
}