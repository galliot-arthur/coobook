import API from "./API";

const apiDelete = (monitor, user, likes) => {
    likes.forEach(like => {
        if (like.user.id == parseInt(user)) {
            API.deleteById(like.id, monitor)
        }
    })
}

/**
 * 
 * @param {boolean} state 
 * @param {string} monitor Like or BookMark
 * @param {number} recipe Recipe's Id
 * @param {number} user User's Id
 * @param {array} likes Represents all the likes
 */
const toggleAffiliation = (state, monitor, recipe, likes) => {
    let data = {
        recipe: "api/recipes/" + recipe,
        user: "api/users/" + window.localStorage.getItem('authId'),
    }
    if (!state) {
        API.post(data, monitor)
    } else {
        apiDelete(monitor, window.localStorage.getItem('authId'), likes)
    }
}

/**
 * 
 * @param {number} user Current User ID
 * @param {array} likes A collection of all current recipes' like 
 * @returns boolean
 */
const isUserLike = (likes) => {
    let rez
    likes.forEach(like => {
        if (like.user.id == parseInt(window.localStorage.getItem('authId'))) {
            rez = true
            return rez
        }
        rez = false
    })
    return rez
}

export default {
    toggleAffiliation,
    isUserLike,
}