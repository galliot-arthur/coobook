import React, { useEffect } from 'react'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
import { useSelector } from 'react-redux'
import { selectAllRecipes } from '../services/recipeSlice'
import API from '../services/API'

export default function ConnectedHomePage() {

    const feed = useSelector(selectAllRecipes)

    const setSuperAdmin = async () => {
        const roles = { roles: ["ROLE_SUPERADMIN"] }
        const res = await API.put(
            localStorage.getItem('authId'),
            roles,
            'users'
        )
        console.log(res)
    }
    const setAdmin = async () => {
        const roles = { roles: ["ROLE_ADMIN"] }
        const res = await API.put(
            localStorage.getItem('authId'),
            roles,
            'users'
        )
        console.log(res)
    }

    return (<>
        <button onClick={setSuperAdmin} className='btn'>SUPER ADMIN</button>
        <button onClick={setAdmin} className='btn'>ADMIN</button>
        {
            feed.length == 0 ?
                <Loader />
                :
                feed.filter(r => r.status !== 'deactivate').map(recipe =>
                    <Recipe recipe={recipe} key={recipe.id} />
                )
        }
    </>)
}