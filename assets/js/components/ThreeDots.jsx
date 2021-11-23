import React, { useState } from 'react'
import { TreeDotsIcon } from '../ui/Icons'

/**
 * Display a modal with links. For style, set dropdown-item into each NavLink.
 * @param {HTMLElement} param0 
 * @returns 
 */
export default function ThreeDots({ children }) {

    const [display, setDisplay] = useState(false)

    const toggle = () => {
        setDisplay(!display)

    }
    return (
        <>
            <button onClick={toggle}>
                <TreeDotsIcon size="24" />
            </button>
            {
                display &&
                <button className="dropdown-context fade-start" onClick={toggle}>
                    <ul className="dropdown-menu fade-start">
                        {children.map(child => <li>{child}</li>)}
                    </ul>
                </button>
            }
        </>
    )
}
