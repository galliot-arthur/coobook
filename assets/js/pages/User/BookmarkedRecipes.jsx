import React, { useEffect, useState } from 'react'
import { Loader } from '../../ui/Loader'
import { toast } from 'react-toastify'
import Recipe from '../../components/Recipe'
import API from '../../services/API'

export default function BookmarkedRecipes() {
    /* FETCHING DATA */
    const [feed, setFeed] = useState([])


    const fetchRecipes = async () => {
        try {
            let data = await API.findMarkedRecipes(window.localStorage.getItem('authId'))
            setFeed(data)
        } catch (e) {
            toast.warning('Erreur, merci de vous reconnecter.')
        }
    }
    useEffect(() => {
        fetchRecipes()
    }, [])

    /* RETURN PART */
    return (
        feed.length == 0 ?
            <Loader look="d-flex justify-content-center my-5" />
            :
            feed.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)
    )
}