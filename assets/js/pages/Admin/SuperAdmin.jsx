import React, { useState } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/API'
import { CheckIcon, SearchIcons } from '../../ui/Icons'
import { Loader } from '../../ui/Loader'

export default function SuperAdmin({ users }) {

    if (users.length < 1) return <Loader />


    /* SEARCH */
    const [search, setSearch] = useState("")
    const [arrayTerms, setArrayTerms] = useState([""])
    let filteredUsers = []

    const handleSearch = ({ currentTarget }) => {
        /* NORMALIZE SEARCH TERMS */
        const terms = currentTarget
            .value
            .normalize("NFD").replace(/\p{Diacritic}/gu, "")
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`"'~()]/g, ' ')
            .replace(/\s+/g, " ")
            .toLowerCase()
            .split(' ')
        setSearch(currentTarget.value)
        setArrayTerms(terms)
        filteredUsers = []
    }

    /* FILTERING RECIPES BY SEARCH */
    const usersCopy = users

    usersCopy.map(user => {
        user = { ...user, selected: 0 }
        arrayTerms.map(term => {
            if (
                user.firstName
                    .toLowerCase()
                    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    .includes(term)
                ||
                user.lastName
                    .toLowerCase()
                    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    .includes(term)
            ) {
                user.selected += 1
            }
        })
        if (user.selected > 0) filteredUsers.push(user)
    })

    filteredUsers.sort((a, b) => a.selected < b.selected)

    return <>
        <h2>SUPER ADMIN</h2>

        <div className="input-group mb-3">
            <label
                className="input-group-text"
                htmlFor="search">
                <SearchIcons />
            </label>
            <input
                type="text"
                id="search"
                onChange={handleSearch}
                value={search}
                className="form-control"
                placeholder="Rechercher un utilisateur..."
            />
        </div>
        {filteredUsers.map(u => <User user={u} key={u.id} />)}
    </>

}

const User = ({ user }) => {
    const [role, setRole] = useState([])

    const handleChange = ({ currentTarget }) => {
        setRole(currentTarget.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const roles = { roles: [role] }
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

    return <li className='row my-1 align-items-center mb-3'>
        <h6 className='text-primary col-4'>
            {user.firstName}
        </h6>
        <div className='col-4'>{user.roles[0]}</div>
        <form onSubmit={handleSubmit} className='col-4'>
            <div className="input-group">
                <select onChange={handleChange} className='form-control'>
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                    <option value="ROLE_SUPERADMIN">SUPER ADMIN</option>
                    <option value="ROLE_BANNED">BANNED</option>
                </select>
                <button type="submit" className='btn btn-success'><CheckIcon /> </button>
            </div>
        </form>
    </li>
}