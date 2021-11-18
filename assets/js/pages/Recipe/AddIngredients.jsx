import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import RawField from '../../components/forms/RawField'
import AddRecipeContext from '../../context/AddRecipeContext'
import API from '../../services/API'
import { MinusIcons, PlusIcons } from '../../ui/Icons'


export default function AddIngredients({ history }) {

    const {
        formValues,
        handleChange,
        addFormFields,
        removeFormFields,
        handleSubmit, } = useField({ history });

    return (
        <>
            <h1 className="display-4">Ajouter les ingrédients</h1>
            <p className="lead">Des poireaux, du lard, de la crème...</p>
            <hr className="my-4" />
            {/* THEN */}
            <form onSubmit={handleSubmit}>
                {formValues.map((element, index) => (
                    <div className="input-group mb-1" key={index}>
                        <RawField
                            name="amount"
                            value={element.amount || 0}
                            onChange={e => handleChange(index, e)}
                            placeholder="150"
                            type="number"
                        />
                        <RawField
                            name="name"
                            value={element.name || ""}
                            onChange={e => handleChange(index, e)}
                            placeholder="gr de Farine"
                            type="text"
                        />
                        {
                            index ?
                                <button className="btn btn-outline-dark" onClick={() => removeFormFields(index)}>
                                    <MinusIcons />
                                </button>
                                : null
                        }
                    </div>
                ))}

                <div className="">
                    <button
                        className="btn btn-outline-dark me-2"
                        type="button"
                        onClick={() => addFormFields()}
                    >
                        <PlusIcons /> <small>Ajouter un ingrédient</small>
                    </button>
                    < button className="btn btn-danger" type="submit" > Submit </button>
                </div>
            </form>
        </>
    )
}

const useField = ({ history }) => {

    /* GET THE RECIPE WE ARE RECORDING */
    const { IRI } = useContext(AddRecipeContext);

    const [formValues, setFormValues] = useState([{ amount: 0, name: "", recipe: IRI }])

    const handleChange = (index, element) => {
        let newFormValues = [...formValues];
        newFormValues[index][element.target.name] = element.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues(
            [...formValues,
            { amount: 0, name: "", recipe: IRI }
            ])
    }

    const removeFormFields = (index) => {
        let newFormValues = [...formValues];
        newFormValues.splice(index, 1);
        setFormValues(newFormValues)
    }
    const AxiosPOST = async (formValues) => {
        formValues.map(async form => {
            try {
                await API.post(form, 'ingredients')
            } catch (e) {
                console.log(e.response)
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosPOST(formValues)
            history.push('/ajout-etape')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }
    return {
        formValues: formValues,
        handleChange: handleChange,
        addFormFields: addFormFields,
        removeFormFields: removeFormFields,
        handleSubmit: handleSubmit,
    }
}