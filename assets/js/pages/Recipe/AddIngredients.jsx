import React from 'react'
import RawField from '../../components/forms/RawField'
import useFields from '../../hooks/useFields'
import { MinusIcons, PlusIcons } from '../../ui/Icons'


export default function AddIngredients() {

    const {
        formValues,
        handleChange,
        addFormField,
        removeFormField,
        handleSubmit, } = useFields();

    return (
        <div className='fade-left'>
            <h1 className="display-4">Ajouter les ingrédients</h1>
            <p className="lead">Des poireaux, du lard, de la crème...</p>
            <hr className="my-4" />
            {/* THEN */}
            <div className="d-flex flex-column justify-content-center align-items-center">

                <form onSubmit={handleSubmit} className="form-group d-flex flex-column">
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
                                    <button className="btn btn-outline-dark" onClick={() => removeFormField(index)}>
                                        <MinusIcons />
                                    </button>
                                    : null
                            }
                        </div>
                    ))}


                    <button
                        className="btn btn-outline-dark my-2 mx-auto"
                        type="button"
                        onClick={() => addFormField()}
                    >
                        <PlusIcons /> <small>Ajouter un ingrédient</small>
                    </button>
                    <br />
                    < button className="btn btn-danger mx-auto" type="submit" > Enregistrer</button>
                </form>
            </div>
        </div>
    )
}
