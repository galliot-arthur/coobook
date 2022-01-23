import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { API_URL } from '../../config'
import { selectDeactivateRecipes, selectReportedRecipes } from '../../services/recipeSlice'
import { AddFileIcons, UserIcons } from '../../ui/Icons'
import { Loader } from '../../ui/Loader'
import DeactivateRecipes from './DeactivateRecipes'
import DeactivateUsers from './DeactivateUsers'
import ReportedRecipes from './ReportedRecipes'
import ReportedUsers from './ReportedUsers'
import SuperAdmin from './SuperAdmin'

let AdminIndex = () => {
    const [page, setPage] = useState('R-R')
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('userState'))
    const admin = user.roles[0] === 'ROLE_ADMIN' || 'ROLE_SUPERADMIN'
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get(API_URL + 'api/users').then(r => setUsers(r.data))
    }, [])

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
            render = <ReportedUsers users={users} />
            break;
        case 'U-D':
            render = <DeactivateUsers users={users} />
            break;
        case 'S-P':
            render = <SuperAdmin users={users} />
            break;
        default:
            render = <ReportedRecipes recipes={reported} />
            break;
    }

    return <div className='fade-left'>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Admin</h1>
            <button className="btn" onClick={() => setPage('S-P')}>
                SUPER ADMIN
            </button>
        </div>
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

export default AdminIndex = React.memo(AdminIndex)