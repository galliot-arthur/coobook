import React, { useEffect, useState } from 'react'
import API from '../services/API'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
export default function ConnectedHomePage() {

    /* FETCHING DATA */
    const [feed, setFeed] = useState([])
    const fetchRecipes = async () => {
        let data = await API.findAll('recipes')
        setFeed(data)
    }
    useEffect(() => {
        fetchRecipes()
    }, [])

    /* RETURN PART */
    return (
        feed.length == 0 ?
            <Loader look="d-flex justify-content-center my-5" />
            :
            feed.map(recipe =>
                <Recipe recipe={recipe} key={recipe.id} />
            )
    )
}