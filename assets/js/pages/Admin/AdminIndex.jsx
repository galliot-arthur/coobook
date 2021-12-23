import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectDeactivateRecipes, selectReportedRecipes } from '../../services/recipeSlice'
import { AddFileIcons, UserIcons } from '../../ui/Icons'
import { Loader } from '../../ui/Loader'
import DeactivateRecipes from './DeactivateRecipes'
import ReportedRecipes from './ReportedRecipes'

export default function AdminIndex() {
    const [page, setPage] = useState('R-R')
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('userState'))
    const admin = user.roles[0] === 'ROLE_ADMIN'

    const reported = useSelector(selectReportedRecipes)
    const deactivated = useSelector(selectDeactivateRecipes)

    if (reported.length === 0) return <Loader />
    if (!admin) history.replace('/')

    let render = <ReportedRecipes recipes={reported} />
    switch (page) {
        case 'R-R':
            render = <ReportedRecipes recipes={reported} />
            break;
        case 'R-D':
            render = <DeactivateRecipes recipes={deactivated} />
            break;
        case 'U-R':
            render = <>Still a thing to do</>
            break;
        case 'U-D':
            render = <>Still a thing to do</>
            break;
        default:
            render = <ReportedRecipes recipes={reported} />
            break;
    }

    return <div className='fade-left'>
        <h1>Admin</h1>
        <p className="lead">Page de controle du site.</p>
        <nav className="row">
            <h5 className="col-12 col-sm-6 text-center">
                <AddFileIcons /> Recettes
                <div className="btn-group ms-sm-3">
                    <button className="btn btn-outline-dark" onClick={() => setPage('R-R')}>
                        Signalées
                    </button>
                    <button className="btn btn-outline-dark" onClick={() => setPage('R-D')}>
                        Désactivées
                    </button>
                </div>
            </h5>
            <h5 className="col-12 col-sm-6 text-center">
                <UserIcons />Utilisateurs
                <div className="btn-group ms-sm-3">
                    <button className="btn btn-outline-dark" onClick={() => setPage('U-R')}>
                        Signalés
                    </button>
                    <button className="btn btn-outline-dark" onClick={() => setPage('U-D')}>
                        Désactivés
                    </button>
                </div>
            </h5>
        </nav>
        <hr />
        {render}

    </div>
}