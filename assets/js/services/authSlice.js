import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { API_URL } from "../config"

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const response = await axios
            .post(API_URL + 'api/' + 'login_check', credentials)
            .then(r => r.data.token)
            .then(token => {
                axios.defaults.headers["Authorization"] = "Bearer " + token
                if (token) {
                    const data = jwtDecode(token)
                    window.localStorage.setItem(
                        'authToken', data.firstName
                    )
                    window.localStorage.setItem(
                        'authId', data.id
                    )
                    window.localStorage.setItem(
                        'sessionOpenedAt', new Date()
                    )
                }
            })
        console.log(response)
        return response
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return axios
            .post(API_URL + 'api/' + 'logout')
            .then(r => {
                window.localStorage.removeItem('authToken')
                delete Axios.defaults.headers['Authorization']
                window.localStorage.clear()
                return r.ok
            })
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: { connected: false },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.auth = action.payload
            })
    }
})




export default authSlice.reducer