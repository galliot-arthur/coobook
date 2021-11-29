import React, { useEffect, useState } from 'react'
import API from '../services/API'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
import axios from 'axios'
import { API_URL } from '../config'
export default function ConnectedHomePage({ history }) {

    /* FETCHING DATA */
    const [feed, setFeed] = useState([])
    const fetchRecipes = async () => {
        try {

            let data = await axios.get(API_URL + 'api/feed')
                .then(r => r.data)
            if (data) setFeed(data)

        } catch (e) {
            console.log(e.response)
        }
    }
    useEffect(() => {
        fetchRecipes()
    }, [])
    console.log(feed)
    /* RETURN PART */
    return (
        feed.length == 0 ?
            <Loader look="d-flex justify-content-center my-5" />
            :
            feed.map(recipe =>
                <Recipe history={history} recipe={recipe} key={recipe.id} />
            )
    )
}