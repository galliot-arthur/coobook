import React, {useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextArea from '../../components/forms/TextArea'
import { addStep } from '../../services/recipeSlice'
import { Loader } from '../../ui/Loader'

export default function AddRecipeStep() {
    const dispatch = useDispatch()
    const IRI = localStorage.getItem('IRI')

    const [step, setStep] = useState({
        recipe: IRI,
        content: ""
    })

    const [loading, setLoading] = useState(false)

    /* HANDLE CHANGE */
    const handleChange = ({ currentTarget }) => {
        setStep({ ...step, content: currentTarget.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        dispatch(addStep(step))
        toast.info('Etape enregistrée.')
        setStep({ ...step, content: "" })
        setLoading(false)
    }

    return (
        <div className='fade-left'>
            <h1 className="display-4">Ajout d'une étape</h1>
            <p className="lead">Allumer le four...</p>
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
