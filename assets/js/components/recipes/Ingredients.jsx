import React from "react"
import { MinusIcons, PlusIcons } from "../../ui/Icons"

export default function Ingredients({ ingredients }) {
    /* HANDLE EMPTY INGREDIENTS OR UNINITIALIZED VALUE */
    if (ingredients.length == 0) return <></>

    const handleInputChange = () => {
        alert('still a thing to do')
    }

    return (<>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="lead">Ingrédients :</div>
            <div>
                <button className="" onClick={() => handleInputChange(+1)}>
                    <PlusIcons />
                </button>
                <button className="" onClick={() => handleInputChange(-1)}>
                    <MinusIcons />
                </button>
            </div>
        </div>
        <ul className="list-group mb-3">
            {
                ingredients.map(ingredient => <li className="list-group-item" key={ingredient.id} >
                    {ingredient.amount} {ingredient.name}
                </li>)
            }
        </ul>
    </>)

}