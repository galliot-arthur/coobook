import Axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";

/**
 * 
 * @param {Array} credentials 
 * @returns Boolean || Void
 */
const authenticate = async (credentials) => {
    return Axios
        .post(API_URL + 'api/' + 'login_check', credentials)
        .then(r => r.data.token)
        .then(token => {
            if (token) {
                Axios.defaults.headers["Authorization"] = "Bearer " + token
                const data = jwtDecode(token)
                window.localStorage.setItem(
                    'toto', token)
                window.localStorage.setItem(
                    'authToken', data.firstName
                )
                window.localStorage.setItem(
                    'authId', data.id
                )
            }
        }).then(() => {
            return true
        })
}

/**
 * 
 * @param {Array} user 
 * @returns Void
 */
const register = async (user) => {
    return Axios
        .post(API_URL + 'api/' + 'register', user)
        .then(r => r)
}

const logout = () => {
    Axios
        .post(API_URL + 'api/' + 'logout')
        .then(r => {
            window.localStorage.removeItem('authToken')
            delete Axios.defaults.headers['Authorization']
            return r.ok
        })
}

const setUp = () => {
    return window.localStorage.getItem('authToken')
}

/**
 * 
 * @param {number} id 
 * @param {Array} roles 
 * @returns Promise
 */
const updateRole = async (id, roles) => await API.put(
    id,
    roles,
    'users'
)

export default { authenticate, logout, setUp, register, updateRole }




//window.localStorage.setItem("authToken", token)