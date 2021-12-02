import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextArea from '../../components/forms/TextArea'
import AddRecipeContext from '../../context/AddRecipeContext'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'

export default function AddRecipeStep({ match, history }) {

    const { IRI } = useContext(AddRecipeContext);
    const [step, setStep] = useState({
        recipe: IRI,
        content: ""
    })
    const instruction = [
        "Faire chauffer de l'eau...",
        "Epplucher les carottes",
        "Etaler la farine...",
        "Allumer le four...",
        "Vérifier l'assaisonnement...",
    ]

    const [loading, setLoading] = useState(false)

    /* HANDLE DATA */
    const handleChange = ({ currentTarget }) => {
        const { value } = currentTarget
        setStep({
            recipe: IRI,
            content: value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.post(step, 'steps')
            toast.info('Etape enregistrée.')
            setStep({ ...step, content: "" })
            setLoading(false)
        } catch (e) {
            toast.warning("Erreur ! Merci d'essayer à nouveau.")
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="display-4">Ajout d'une étape</h1>
            <p className="lead">{instruction[(Math.floor(Math.random() * 5))]}</p>
            <hr className="my-4" />
            {/* THEN */}
            {
                loading ?
                    <Loader />
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center">

                        <form onSubmit={handleSubmit} className="form-group d-flex flex-column">
                            <TextArea
                                name="content"
                                label="Dites moi tout..."
                                value={step.content}
                                onChange={handleChange}
                                placeholder="Bon apétit !"
                                minLength="5"
                                required={false}
                            />
                            <button className={"my-2 mx-auto btn btn-danger " + (loading && "disabled")}>
                                Enregistrer
                            </button>
                            <NavLink to={"/enregistrer-photo"} className="mx-auto btn">Passer à l'étape suivante</NavLink>
                        </form>
                    </div>
            }
        </div>

    )
}
