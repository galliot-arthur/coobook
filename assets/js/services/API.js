import Axios from "axios";

/**
 * @param {string} entity The name of the ORM entity
 */
function findAll(entity) {
    return Axios
        .get('http://127.0.0.1:8000/api/' + entity + '?order%5BcreatedAt%5D=desc')
        .then(response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
function deleteById(id, entity) {
    return Axios
        .delete('http://127.0.0.1:8000/api/' + entity + '/' + id)
}

/**
 * @param {*} data Id of the element 
 * @param {string} entity The name of the ORM entity
 */
function post(data, entity) {
    return Axios
        .post('http://127.0.0.1:8000/api/' + entity, data)
        .then(response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {*} data The data to modify
 * @param {string} entity The name of the ORM entity
 */
const put = (id, data, entity) => {
    return Axios
        .put('http://127.0.0.1:8000/api/' + entity + '/' + id, data)
        .then(response => response.data)
}

/**
 * @param {int} id Id of the element 
 * @param {string} entity The name of the ORM entity
 */
const get = (id, entity) => {
    return Axios
        .get('http://127.0.0.1:8000/api/' + entity + '/' + id)
        .then(response => response.data)
}

const findMarkedRecipes = (id) => {
    return Axios
        .get('http://127.0.0.1:8000/api/recipes/' + id + '/rec?order%5BcreatedAt%5D=desc')
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