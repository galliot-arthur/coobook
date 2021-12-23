import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setReport } from '../../services/recipeSlice'
import { WarningIcon } from '../../ui/Icons'

export default function ReportRecipeButton({ recipe }) {

    const dispatch = useDispatch()
    const handleReport = () => {
        dispatch(setReport(recipe.id))
        toast.info("Cette recette à été signalée.")
    }
    return (
        <button onClick={handleReport} className="dropdown-item">
            Signaler
            <span className="text-muted ms-2">
                <WarningIcon />
            </span>
        </button>
    )
}
