import React, { useEffect, useState } from 'react'
import reactDom from 'react-dom'
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

    return <>
        <button onClick={toggle}>
            <TreeDotsIcon size="22" />
        </button>
        {display && <PopUp children={children} toggle={toggle} />}
    </>

}

const PopUp = ({ children, toggle }) => {
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) toggle()
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const render = <div className="dropdown-context fade-start" onClick={toggle} role="button" aria-label="close" >
        <ul className="dropdown-menu fade-start">
            {children.map((child, key) => <li key={key}>{child}</li>)}
        </ul>
    </div>
    return reactDom.createPortal(render, document.querySelector('body'))
} 
