import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="container mt-auto">
            <footer className="d-flex flex-wrap justify-content-md-center justify-content-md-between align-items-center py-3 my-4 border-top">
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start ">
                    <a href="#" className="me-2 text-muted text-decoration-none lh-1 maru">
                        CooBook
                    </a>
                    <span className="text-muted small">TM 2021</span>
                </div>
                <ul className="nav col-12 col-md-4 justify-content-center justify-content-md-end list-unstyled d-flex">
                    <NavLink to="/a-propos" className="ms-3">A propos</NavLink>
                    <NavLink to="/contact" className="ms-3">Contact</NavLink>
                </ul>
            </footer>
        </div>
    )
}
