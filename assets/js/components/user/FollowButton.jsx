
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../config'

export default function FollowButton({ target, user }) {

    const [follow, setFollow] = useState(false)
    const getFollow = (user) => {
        user.follows.map(sources => {
            sources.id == window.localStorage.getItem('authId')
                && setFollow(true)
        })
    }
    const toggleFollow = () => setFollow(!follow)

    useEffect(() => getFollow(user), [user])

    const handleFollow = async () => {
        try {
            const response = follow ?
                await axios.post(
                    `${API_URL}api/users/${target}/unfollow`
                )
                :
                await axios.post(
                    `${API_URL}api/users/${target}/follow`
                )
            toggleFollow()
        } catch (e) { }
    }
    return (
        <button onClick={handleFollow} className={`btn btn${follow ? '-outline' : ''}-dark`}>
            {follow ? 'Ne plus suivre' : 'Suivre'}
        </button>
    )
}
