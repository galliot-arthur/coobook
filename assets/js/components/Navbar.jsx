import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import authAPI from '../services/authAPI'
import AuthContext from '../context/AuthContext'

export const NavBar = ({ history }) => {
    const {connected, setConnected} = useContext(AuthContext)

    const handleLogOut = () => {
        authAPI.logout()
        setConnected(false)
        history.push('/login')
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h2 className="display-6">🖊 Invox</h2>
                </NavLink>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li className="nav-item px-2">
                        <NavLink className="nav-link" to="/clients">Clients</NavLink>
                    </li>
                    <li className="nav-item px-2">
                        <NavLink className="nav-link" to="/factures">Factures</NavLink>
                    </li>
                </ul>
                <div className="col-12 col-md-5 text-center text-md-end">
                    {
                        !connected ?
                            <>
                                <NavLink to="/login" className="btn btn-outline-primary me-2">
                                    Connexion
                                </NavLink>
                                <NavLink to="/register" className="btn btn-primary">
                                    Inscription
                                </NavLink>
                            </>
                            :
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleLogOut}
                            >
                                Déconnexion
                            </button>
                    }
                </div>
            </header>
        </div>
    )
}