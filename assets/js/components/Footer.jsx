import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { isConnected } from '../services/authSlice'

export default function Footer() {

    const [admin, setAdmin] = useState(false)
    const connected = useSelector(isConnected)
    const user = JSON.parse(localStorage.getItem('userState'))

    useEffect(() => {
        if (connected && user) {
            if (user.roles[0] == 'ROLE_ADMIN' || user.roles[0] == 'ROLE_SUPERADMIN') setAdmin(true)
            else setAdmin(false)
        } else setAdmin(false)
    }, [connected])

    const { width } = useWindowDimensions()

    return (
        <div className={width > 992 ? 'mt-auto ps-35' : "container w-100 mt-auto"}>
            <footer className={'d-flex ' + (width > 992 ? 'flex-column justify-content-start align-items-start' : "flex-wrap justify-content-md-center justify-content-md-between align-items-center py-3 mt-2")}>
                <div className={width > 992 ? 'text-center' : "col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start"}>
                    <a href="#" className="me-2 text-muted text-decoration-none lh-1 maru">
                        CooBook
                    </a>
                    <span className="text-muted small">TM 2021</span>
                </div>
                <ul className={'list-unstyled ms-0 ' + (width > 992 ? 'mb-3' : " mb-0 nav col-12 col-md-4 justify-content-center justify-content-md-end d-flex text-center")}>
                    <NavLink to="/a-propos">A propos</NavLink>
                    <NavLink to="/contact" className={width > 992 ? 'ms-2' : "ms-3"}>Contact</NavLink>
                    <br />
                    <NavLink to="/rgpd" className={width > 992 ? '' : "ms-3"}>R.G.P.D</NavLink>
                    <NavLink to="/coobook-cgu" className={width > 992 ? 'ms-2' : "ms-3"}>C.G.U</NavLink>
                    <br />
                    <NavLink to="/mentions-legales" className={width > 992 ? '' : "ms-3"}>Mentions légales</NavLink>
                    <br />
                    {admin && <NavLink to="/admin" className={width > 992 ? '' : "ms-3"}>Admin</NavLink>}

                </ul>
            </footer>
        </div>
    )
}
