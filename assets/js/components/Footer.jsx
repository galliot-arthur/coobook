import React from 'react'
import { NavLink } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Footer() {

    const { height, width } = useWindowDimensions()

    return (
        <div className={width > 992 ? 'mt-auto' : "container w-100 mt-auto"}>
            <footer className={'d-flex ' + (width > 992 ? 'flex-column justify-content-center' : "flex-wrap justify-content-md-center justify-content-md-between align-items-center py-3 mt-2")}>
                <div className={width > 992 ? 'text-center' : "col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start"}>
                    <a href="#" className="me-2 text-muted text-decoration-none lh-1 maru">
                        CooBook
                    </a>{width > 992 && <br />}
                    <span className="text-muted small">TM 2021</span>
                </div>
                <ul className={'list-unstyled ms-0 text-center mb-0 ' + (width > 992 ? '' : "nav col-12 col-md-4 justify-content-center justify-content-md-end d-flex")}>
                    <NavLink to="/a-propos">A propos</NavLink>
                    {width > 992 && <br />}
                    <NavLink to="/contact" className={width > 992 ? '' : "ms-3"}>Contact</NavLink>
                </ul>
            </footer>
        </div>
    )
}
