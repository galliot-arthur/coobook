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
                <TreeDotsIcon size="22" />
            </button>
            {
                display &&
                <div className="dropdown-context fade-start" onClick={toggle}>
                    <ul className="dropdown-menu fade-start">
                        {children.map((child, key) => <li key={key}>{child}</li>)}
                    </ul>
                </div>
            }
        </>
    )
}
