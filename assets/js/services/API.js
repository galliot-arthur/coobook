import Axios from 'axios'
import Cache from './cache'
import { API_URL } from '../config'

/**
 * @param {string} entity The name of the ORM entity
 */
async function findAll(entity) {
    /* avoid request if we already get it via cache */
    const cachedData = await Cache.get(entity)
    if (cachedData) return cachedData
        /* if not */
    return Axios
        .get(API_URL + entity + '?order%5BcreatedAt%5D=desc')
        .then(response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
function deleteById(id, entity) {
    return Axios
        .delete(API_URL + entity + '/' + id)
        .then(async response => response.data)
}

/**
 * @param {*} data Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const post = (data, entity) => {
    return Axios
        .post(API_URL + entity, data)
        .then(async response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {*} data The data to modify
 * @param {string} entity The name of the ORM entity
 */
const put = async(id, data, entity) => {
    return Axios
        .put(API_URL + entity + '/' + id, data)
        .then(response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const get = (id, entity) => {
    return Axios
        .get(API_URL + entity + '/' + id)
        .then(response => response.data)
}

const findMarkedRecipes = async(id) => {
    const cachedData = await Cache.get('recipes')

    if (cachedData) return cachedData

    return Axios
        .get(API_URL + id + '/rec?order%5BcreatedAt%5D=desc')
        .then(response => response.data)
}

export default {
    findAll,
    deleteById,
    post,
    put,
    get,
    findMarkedRecipes,
}