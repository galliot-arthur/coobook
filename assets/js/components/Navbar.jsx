import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import authAPI from '../services/authAPI'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify'
import { AddFileIcons, BookMarkFilledIcon, DoorIcons, HomeIcons, SearchIcons, UserCircleIcons } from '../ui/Icons'

export const NavBar = ({ history }) => {
    const { connected, setConnected } = useContext(AuthContext)

    const handleLogOut = () => {
        authAPI.logout()
        setConnected(false)
        toast.info('Vous êtes désormais déconnecté.')
        history.push('/login')
    }
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h2 className="display-3 maru text-danger">CooBook</h2>
                </NavLink>
                <nav >
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center justify-content-md-end mb-md-0">
                        {
                            !connected ?
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="btn">
                                            Connexion
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-1">
                                        <NavLink to="/register" className="btn btn-danger">
                                            Inscription
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink className="nav-link text-black-50" to="/">
                                            <HomeIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink className="nav-link text-black-50" to="/rechercher">
                                            <SearchIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink className="nav-link text-black-50" to="/enregistrer-recette/nouveau">
                                            <AddFileIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink className="nav-link text-black-50" to={"/profil/" + window.localStorage.getItem('authId')}>
                                            <UserCircleIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink className="nav-link text-black-50" to="/marques-pages">
                                            <BookMarkFilledIcon size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <button
                                            className="nav-link text-black-50 d-inline"
                                            onClick={handleLogOut}
                                        >
                                            <DoorIcons size="20" />
                                        </button>
                                    </li>
                                </>
                        }
                    </ul>

                </nav>
            </header>
        </div>
    )
}