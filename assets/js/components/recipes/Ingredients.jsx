import React, { useEffect, useState } from "react"
import { MinusIcons, PlusIcons } from "../../ui/Icons"
import { persistState } from '../../services/authAPI'
import { useSelector } from "react-redux"

export default function Ingredients({ ingredients, width }) {
    /* HANDLE EMPTY INGREDIENTS OR UNINITIALIZED VALUE */
    if (ingredients.length < 1) return <></>

    const [proportion, setProportion] = useState(1)

    if (proportion == 0) setProportion(0.5)

    const tempIngredients = [...ingredients]
    tempIngredients.forEach((v, k) => {
        tempIngredients[k] = { ...tempIngredients[k], tempAmount: v.amount * proportion }
    })

    return (
        <div className={width < 922 ? 'ms-md-3' : ''}>

            <div className="d-flex flex-row justify-content-between align-items-start mb-3">
                <h4 className="lead">Ingrédients :</h4>

                <div className="d-flex flex-column align-items-end">
                    <span className={"text-small text-muted mb-1 text-end"}>Modifier les proportions</span>
                    <div className="d-flex">
                        <button className="rounded-btn me-1" aria-label="augmenter les proportions" onClick={() => setProportion(proportion + 0.5)}>
                            <PlusIcons />
                        </button>
                        <button className="rounded-btn" aria-label="diminuer les proportions" onClick={() => setProportion(proportion - 0.5)}>
                            <MinusIcons />
                        </button>
                    </div>
                </div>
            </div>

            <ul className="list-group">
                {
                    tempIngredients.map(i =>
                        <li className="list-group-item fade-start" key={i.id}>
                            <b>{i.tempAmount}</b> {i.name}
                        </li>
                    )
                }
            </ul>
        </div>
    )

}