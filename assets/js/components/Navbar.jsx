import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import authAPI from '../services/authAPI'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify'
import { AddFileIcons, BookMarkFilledIcon, DoorIcons, HomeIcons, SearchIcons, UserCircleIcons } from '../ui/Icons'


export const NavBar = ({ history }) => {
    const { connected, setConnected } = useContext(AuthContext)

    const handleLogOut = () => {
        div.remove()
        legend.remove()
        authAPI.logout()
        setConnected(false)
        toast.info('Vous êtes désormais déconnecté.')
        history.push('/login')
    }

    let div = document.createElement('div')
    div.classList.add('nav-link-animation')
    let legend = document.createElement('div')
    legend.classList.add('nav-link-legend')

    const handleMouseOver = ({ currentTarget }) => {
        currentTarget.appendChild(div)
        currentTarget.appendChild(legend)

        div.style.top = currentTarget.getBoundingClientRect().top + 50.5 + 'px'
        legend.style.top = currentTarget.getBoundingClientRect().top - 16 + 'px'
        legend.innerText = currentTarget.getAttribute("aria-label")
        legend.style.left = currentTarget.getBoundingClientRect().left + (currentTarget.getBoundingClientRect().width / 2) - (legend.getBoundingClientRect().width / 2) + 'px'
    }

    const handleMouseLeave = ({ currentTarget }) => {
        div.remove()
        legend.remove()
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h2 className="display-3 maru text-danger fade-start">CooBook</h2>
                </NavLink>
                <nav >
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center justify-content-md-end mb-md-0">
                        {
                            !connected ?
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/login"
                                            className="btn">
                                            Connexion
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-1">
                                        <NavLink
                                            to="/register"
                                            className="btn btn-danger">
                                            Inscription
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink
                                            aria-label="accueil"
                                            className="nav-link text-black-50"
                                            to="/"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <HomeIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink
                                            aria-label="rechercher"
                                            className="nav-link text-black-50"
                                            to="/rechercher"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <SearchIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink
                                            aria-label="enregistrer"
                                            className="nav-link text-black-50"
                                            to="/enregistrer-recette/nouveau"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <AddFileIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink
                                            aria-label="mon profil"
                                            className="nav-link text-black-50"
                                            to={"/profil/" + window.localStorage.getItem('authId')}
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave} onClick={handleMouseLeave}
                                        >
                                            <UserCircleIcons size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <NavLink
                                            aria-label="marques pages"
                                            className="nav-link text-black-50"
                                            to="/marques-pages"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <BookMarkFilledIcon size="20" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <button
                                            aria-label="déconnexion"
                                            className="nav-link text-black-50 d-inline"
                                            onClick={handleLogOut}
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
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