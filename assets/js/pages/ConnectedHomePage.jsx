import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../ui/Loader'
import Recipe from '../components/Recipe'
import { useFeed } from '../hooks/feedReducer'
import FeedContext from '../context/FeedContext'
export default function ConnectedHomePage({ history }) {

    const { feedCxt, setFeed } = useContext(FeedContext)

    const {
        feed,
        fetchFeed,
    } = useFeed()

    const setData = async () => {
        const cxt = await fetchFeed(feedCxt)
        setFeed(cxt)
    }
    useEffect(() => {
        setData()
    }, [])

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