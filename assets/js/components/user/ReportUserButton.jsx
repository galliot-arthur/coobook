import React from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { WarningIcon } from '../../ui/Icons'

export default function ReportUserButton({ user }) {

    const handleReport = async () => {
        try {
            const roles = { roles: ["ROLE_REPORTED"] }
            await API.put(
                user.id,
                roles,
                'users'
            )
            toast.info(user.firstName + " à été signalé.é.")
        } catch (e) {
            console.log(e)
            toast.warning('Erreur, merci de réessayer.')
        }
    }
    return (
        <button onClick={handleReport} className="dropdown-item">
            Signaler {user.firstName}
            <span className="text-muted ms-2">
                <WarningIcon />
            </span>
        </button>
    )
}
