import React, { useEffect, useState } from "react"
import { MinusIcons, PlusIcons } from "../../ui/Icons"
import { persistState } from '../../services/authAPI'
import { useSelector } from "react-redux"

export default function Ingredients({ ingredients }) {
    /* HANDLE EMPTY INGREDIENTS OR UNINITIALIZED VALUE */
    if (ingredients.length < 1) return <></>

    const [proportion, setProportion] = useState(1)

    if (proportion == 0) setProportion(0.5)

    const tempIngredients = [...ingredients]
    tempIngredients.forEach((v, k) => {
        tempIngredients[k] = { ...tempIngredients[k], tempAmount: v.amount * proportion }
    })

    return (<div className="d-flex flex-column flex-sm-row justify-content-between mt-3">
        <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center justify-content-sm-start align-items-sm-start mb-3 my-sm-0 me-sm-3">
            <h4 className="lead">Ingrédients :</h4>
            <div className="d-flex">
                <span className="text-small text-muted me-2">Modifier les proportions</span>
                <button className="rounded-btn me-2" aria-label="augmenter les proportions" onClick={() => setProportion(proportion + 0.5)}>
                    <PlusIcons />
                </button>
                <button className="rounded-btn" aria-label="diminuer les proportions" onClick={() => setProportion(proportion - 0.5)}>
                    <MinusIcons />
                </button>
            </div>
        </div>
        <ul className="list-group mb-3 w-sm-50">
            {
                tempIngredients.map(i =>
                    <li className="list-group-item fade-start" key={i.id}>
                        {i.tempAmount} {i.name}
                    </li>
                )
            }
        </ul>
    </div>)

}