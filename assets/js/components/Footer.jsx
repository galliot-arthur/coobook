import React from 'react'

export default function Footer() {
    return (
        <div className="container mt-auto">
            <footer className="d-flex flex-wrap justify-content-md-center justify-content-md-between align-items-center py-3 my-4 border-top">
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start ">
                    <a href="#" className="me-2 text-muted text-decoration-none lh-1 maru">
                        CooBook
                    </a>
                    <span className="text-muted small">© 2021</span>
                </div>
                <ul className="nav col-12 col-md-4 justify-content-center justify-content-md-end list-unstyled d-flex">
                    <li className="ms-3">A propops</li>
                    <li className="ms-3">Contact</li>
                    <li className="ms-3">RGPD</li>
                </ul>
            </footer>
        </div>
    )
}
