import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddFileIcons, BookMarkFilledIcon, DoorIcons, HomeIcons, SearchIcons, UserCircleIcons } from '../ui/Icons'
import { useSelector } from 'react-redux'
import { isConnected, authLogout, checkConnectedStatus } from '../services/authSlice'
import { useDispatch } from 'react-redux'
import useWindowDimensions from '../hooks/useWindowDimensions'
import Footer from './Footer'


let NavBar = ({ history }) => {



    const dispatch = useDispatch()
    dispatch(checkConnectedStatus())
    const connected = useSelector(isConnected)

    /* HANDLE USER LOG OUT */
    const handleLogOut = async () => {
        div.remove()
        legend.remove()
        dispatch(authLogout())
        toast.info('Vous êtes désormais déconnecté.')
        history.push('/login')
    }

    /* HANDLE WINDOW RESIZE */
    const { width } = useWindowDimensions()

    /* HANDLE NAV LINKS ANIMATION  */
    let div = document.createElement('div')
    div.classList.add('nav-link-animation')
    let legend = document.createElement('div')
    legend.classList.add('nav-link-legend')

    const handleMouseOver = ({ currentTarget }) => {
        if (width > 992) return null

        currentTarget.appendChild(div)
        currentTarget.appendChild(legend)

        div.style.top = currentTarget.getBoundingClientRect().top + 50.5 + 'px'
        legend.style.top = currentTarget.getBoundingClientRect().top - 16 + 'px'
        legend.innerText = currentTarget.getAttribute("aria-label")
        legend.style.left = currentTarget.getBoundingClientRect().left + (currentTarget.getBoundingClientRect().width / 2) - (legend.getBoundingClientRect().width / 2) + 'px'
    }

    const handleMouseLeave = () => {
        if (width > 992) return null

        div.remove()
        legend.remove()
    }
    return (
        <div className={width < 992 ? 'col-12 container' : 'col-2 nav-head'}>
            <header
                className={
                    "d-flex pt-3" + (
                        width > 992
                            ? ' flex-column'
                            : ' flex-wrap align-items-center justify-content-center justify-content-sm-between mb-4 border-bottom'
                    )}>
                <Link to="/" className={"mb-2 mb-sm-0 text-decoration-none" + (width > 992 ? '' : ' col-md-3')}>
                    <h2 className={"maru text-primary" + (width > 992 ? ' display-5 ps-35' : ' display-3')}>CooBook</h2>
                </Link>
                <nav >
                    <ul className={
                        width < 992
                            ? "nav col-12 col-md-auto mb-2 justify-content-center justify-content-md-end mb-md-0"
                            : 'nav flex-column justify-content-start'
                    }>
                        {
                            !connected ?
                                <>
                                    <li className="nav-item ps-lg-3 py-lg-2">
                                        <Link
                                            to="/login"
                                            className="btn">
                                            Connexion
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 ps-lg-3">
                                        <Link
                                            to="/register"
                                            className="btn btn-danger">
                                            Inscription
                                        </Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <Link
                                            aria-label="accueil"
                                            className="nav-link text-black-50"
                                            to="/"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <HomeIcons size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Accueil</span>
                                            }
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <Link
                                            aria-label="rechercher"
                                            className="nav-link text-black-50"
                                            to="/rechercher"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <SearchIcons size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Rechercher</span>
                                            }
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <Link
                                            aria-label="enregistrer"
                                            className="nav-link text-black-50"
                                            to="/enregistrer-recette/nouveau"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <AddFileIcons size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Enregistrer</span>
                                            }
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <Link
                                            aria-label="mon profil"
                                            className="nav-link text-black-50"
                                            to={"/profil/" + window.localStorage.getItem('authId')}
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave} onClick={handleMouseLeave}
                                        >
                                            <UserCircleIcons size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Mon Profil</span>
                                            }
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <Link
                                            aria-label="marques pages"
                                            className="nav-link text-black-50"
                                            to="/marques-pages"
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={handleMouseLeave}
                                        >
                                            <BookMarkFilledIcon size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Marques Pages</span>
                                            }
                                        </Link>
                                    </li>
                                    <li className="nav-item px-0 px-sm-1 fade-hover">
                                        <button
                                            aria-label="déconnexion"
                                            className="nav-link silent-button text-black-50 d-inline"
                                            onClick={handleLogOut}
                                            onMouseEnter={handleMouseOver}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <DoorIcons size="20" fadeStart={false} />
                                            {width > 992 &&
                                                <span className="nav-link-legend ms-2">Déconnexion</span>
                                            }
                                        </button>
                                    </li>
                                </>
                        }
                    </ul>

                </nav>
                {width > 992 && <Footer />}
            </header>

        </div>
    )
}

export default NavBar = React.memo(NavBar)