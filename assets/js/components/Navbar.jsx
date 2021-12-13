import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddFileIcons, BookMarkFilledIcon, DoorIcons, HomeIcons, SearchIcons, UserCircleIcons } from '../ui/Icons'
import { useSelector } from 'react-redux'
import { isConnected, authLogout } from '../services/authSlice'
import { useDispatch } from 'react-redux'


export const NavBar = ({ history }) => {
    const { connected } = useSelector(isConnected)
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        div.remove()
        legend.remove()
        await dispatch(authLogout())
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
                <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h2 className="display-3 maru text-danger fade-start">CooBook</h2>
                </Link>
                <nav >
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center justify-content-md-end mb-md-0">
                        {
                            !connected ?
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/login"
                                            className="btn">
                                            Connexion
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1">
                                        <Link
                                            to="/register"
                                            className="btn btn-danger">
                                            Inscription
                                        </Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item px-0 px-sm-1">
                                        <Link
                                            aria-label="accueil"
                                            className="nav-link text-black-50"
                                            to="/"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <HomeIcons size="20" />
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <Link
                                            aria-label="rechercher"
                                            className="nav-link text-black-50"
                                            to="/rechercher"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <SearchIcons size="20" />
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <Link
                                            aria-label="enregistrer"
                                            className="nav-link text-black-50"
                                            to="/enregistrer-recette/nouveau"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <AddFileIcons size="20" />
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <Link
                                            aria-label="mon profil"
                                            className="nav-link text-black-50"
                                            to={"/profil/" + window.localStorage.getItem('authId')}
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave} onClick={handleMouseLeave}
                                        >
                                            <UserCircleIcons size="20" />
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1">
                                        <Link
                                            aria-label="marques pages"
                                            className="nav-link text-black-50"
                                            to="/marques-pages"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <BookMarkFilledIcon size="20" />
                                        </Link>
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