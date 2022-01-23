import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { CheckIcon, TrashIcons } from '../../ui/Icons'

export default function ReportedUsers({ users }) {
    const deactivateUsers = users.filter(u => u.roles[0] === 'ROLE_REPORTED')
    return <div className="fade-left">
        <div className="d-flex justify-content-between align-items-center">
            <h2>Utilisateurs Signalés</h2>
        </div>
        <ul>
            {deactivateUsers.map(u => <User user={u} key={u.id} />)}
        </ul>
    </div>
}

const User = ({ user }) => {

    const handleDeactivate = async () => {
        try {
            const roles = { roles: ["ROLE_BANNED"] }
            const res = await API.put(
                user.id,
                roles,
                'users'
            )
        } catch (e) {
            console.log(e)
            toast.warning('ERROR')
        }
    }
    const handleRemoveReport = async () => {
        try {
            const roles = { roles: ["ROLE_USER"] }
            const res = await API.put(
                user.id,
                roles,
                'users'
            )
        } catch (e) {
            console.log(e)
            toast.warning('ERROR')
        }
    }

    return <li className='list-group-admin'>
        <Link to={'/profil/' + user.id}>{user.firstName}</Link>
        <div>
            <button className='text-danger' onClick={handleDeactivate}>
                <TrashIcons /> Désactiver
            </button>
            <button className='text-success ms-3' onClick={handleRemoveReport}>
                <CheckIcon /> Annuler
            </button>
        </div>
        <hr />
    </li>
}
