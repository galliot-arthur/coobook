import Axios from 'axios'
import { API_URL } from '../config'

/**
 * @param {string} entity The name of the ORM entity
 */
const findAll = async(entity) => await Axios
    .get(API_URL + 'api/' + entity + '?order%5BcreatedAt%5D=desc')
    .then(response => response.data)


/**
 * @param {string} entity The name of the ORM entity
 * @param {number} id Id of the element 
 */
const find = async(entity, id) => await Axios
    .get(API_URL + 'api/' + entity + '/' + id)
    .then(response => response.data)


/**
 * @param {number} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const deleteById = async(id, entity) => Axios
    .delete(API_URL + 'api/' + entity + '/' + id)
    .then(async response => response.data)


/**
 * @param {Object} data Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const post = async(data, entity) => Axios
    .post(API_URL + 'api/' + entity, data)
    .then(async response => response.data)


/**
 * @param {number} id Id of the element 
 * @param {Object} data The data to modify
 * @param {string} entity The name of the ORM entity
 */
const put = async(id, data, entity) => Axios
    .put(API_URL + 'api/' + entity + '/' + id, data)
    .then(response => response.data)


/**
 * @param {number} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const get = async(id, entity) => {
    return Axios
        .get(API_URL + 'api/' + entity + '/' + id)
        .then(response => response.data)
}

const findMarkedRecipes = async(id) => {
    return Axios
        .get(API_URL + 'api/recipes/' + id + '/rec?order%5BcreatedAt%5D=desc')
        .then(response => response.data)
}

export default {
    findAll,
    find,
    deleteById,
    post,
    put,
    get,
    findMarkedRecipes,
}