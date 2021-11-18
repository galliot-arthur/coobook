import Axios from "axios";
import jwtDecode from "jwt-decode";

const authenticate = (credentials) => {
    return Axios
        .post('http://127.0.0.1:8000/api/login_check', credentials)
        .then(r => r.data.token)
        .then(token => {
            Axios.defaults.headers["Authorization"] = "Bearer " + token
            if (token) {
                const data = jwtDecode(token)
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

const register = (user) => {
    return Axios
        .post('http://127.0.0.1:8000/api/register', user)
        .then(r => r)
}

const logout = () => {
    Axios
        .post('http://127.0.0.1:8000/api/logout')
        .then(r => {
            window.localStorage.removeItem('authToken')
            delete Axios.defaults.headers['Authorization']
            return r.ok
        })
}

const setUp = () => {
    return window.localStorage.getItem('authToken')
}

export default { authenticate, logout, setUp, register }




//window.localStorage.setItem("authToken", token)