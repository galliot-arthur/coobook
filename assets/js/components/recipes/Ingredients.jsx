import React, { useEffect, useState } from "react"
import { MinusIcons, PlusIcons } from "../../ui/Icons"

export default function Ingredients({ ingredients }) {
    /* HANDLE EMPTY INGREDIENTS OR UNINITIALIZED VALUE */
    if (ingredients.length == 0) return <></>

    const [proportion, setProportion] = useState(1)
    /* STILL HAVE SOME ISSUES WITH THE VALUE ON MOUNTED COMPONENT. ADDED TO TODO LIST */
    useEffect(() => { setProportion(1.5) }, [])

    if (proportion == 0) setProportion(0.5)

    useEffect(() => {
        ingredients.map((v, k) => {
            ingredients[k] = { ...ingredients[k], tempAmount: v.amount * proportion }
        })
    }, [proportion])


    return (<>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="lead">Ingrédients :</div>
            <div>
                <button className="" onClick={() => setProportion(proportion + 0.5)}>
                    <PlusIcons />
                </button>
                <button onClick={() => setProportion(proportion - 0.5)}>
                    <MinusIcons />
                </button>
            </div>
        </div>
        <ul className="list-group mb-3">
            {
                ingredients.map(i =>
                    <li className="list-group-item fade-start" key={i.id} >
                        {i.tempAmount} {i.name}
                    </li>
                )
            }
        </ul>
    </>)

}