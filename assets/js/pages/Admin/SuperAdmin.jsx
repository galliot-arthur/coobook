import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { CheckIcon } from '../../ui/Icons'
import { Loader } from '../../ui/Loader'

export default function SuperAdmin({ users }) {

    if (users.length < 1) return <Loader />

    return <>
        <h2>SUPER ADMIN</h2>
        {users.map(u => <User user={u} key={u.id} />)}
    </>

}

const User = ({ user }) => {
    const [role, setRole] = useState([])

    console.log(role)
    const handleChange = ({ currentTarget }) => {
        setRole(currentTarget.value)
    }
    const handleSubmit = async (e) => {
        /* e.preventDefault()
        try {
            const roles = { roles: role }
            const res = await API.put(
                localStorage.getItem('authId'),
                roles,
                'users'
            )
        } catch (e) {
            console.log(e)
            toast.warning('ERROR')
        } */
    }

    return <li className='d-flex justify-content-between align-items-center my-1'>
        <h6 className='text-primary'>
            {user.firstName}
        </h6>
        <div>{user.roles[0]}</div>
        <form onSubmit={handleSubmit}>
            <select onChange={handleChange} value={role} className='form-control' multiple={false}>
                <option value={[]}>USER</option>
                <option value={["ROLE_ADMIN"]}>ADMIN</option>
                <option value={["ROLE_SUPERADMIN"]}>SUPER ADMIN</option>
                <option value={["ROLE_BANNED"]}>BANNED</option>
            </select>
            <button type="submit" className='btn btn-success'><CheckIcon /> </button>
        </form>
    </li>
}