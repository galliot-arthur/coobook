import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { deleteStep, editStep } from "../../services/recipeSlice"
import { EditIcons } from '../../ui/Icons'

export default function EditSteps({ recipeData }) {

    return <>
        <div>
            {recipeData.steps.map((step, key) => <Step step={step} key={key} number={key} recipeData={recipeData} />)}
        </div>
        <hr />
    </>
}

const Step = ({ step, number, recipeData }) => {

    const dispatch = useDispatch()
    const [stepData, setStep] = useState(step)

    const [edit, setEdit] = useState(false)

    const handleClick = (e) => {
        e.detail == 2 && setEdit(true)
    }
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setStep({ ...stepData, [name]: value })
    }

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) setEdit(false)
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const recipe = { ...recipeData }
        if (stepData.content === '') {
            recipe.steps = recipe.steps
                .filter(s => s.id !== stepData.id)
            dispatch(deleteStep({
                id: stepData.id, recipe: recipe
            }))
        } else {
            recipe.steps = recipe.steps
                .map(s => s.id == stepData.id ? stepData : s)
            dispatch(editStep({
                id: stepData.id, step: stepData, recipe: recipe
            }))
        }
        setEdit(false)
    }
    return <div className='mb-4'>
        <b className='h6 text-primary me-1'>
            {
                edit
                    ? <button onClick={() => setEdit(false)}><EditIcons size={12} /> Annuler</button>
                    : number + 1
            }
        </b>
        {
            edit
                ? <form className='fade-left' onSubmit={handleSubmit}>
                    <textarea
                        className="form-control"
                        id={number}
                        name='content'
                        onChange={handleChange}
                        value={stepData.content}
                    />
                    <button type="submit" className='text-primary mt-2'>Enregistrer</button>
                </form>
                : <>
                    <span onClick={handleClick}>{step.content}</span>
                    <button onClick={() => setEdit(true)} className="text-muted ms-1"><EditIcons size={12} /></button>
                </>
        }

    </div>
}
