import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { API_URL } from "../config"

export const authLogin = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        return await axios
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
    }
)

export const authLogout = createAsyncThunk(
    'auth/logout',
    async () => {
        return await axios
            .post(API_URL + 'api/' + 'logout')
            .then(r => {
                window.localStorage.removeItem('authToken')
                delete axios.defaults.headers['Authorization']
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
            .addCase(authLogin.fulfilled, (state, action) => {
                state.connected = true
            })
            .addCase(authLogin.rejected, (state, action) => {
                console.log('rejected', action.error.message)
                state.error = action.error.message
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                console.log('stateSliceLogout', state.auth)
                state.connected = false
            })
    }
})


export const isConnected = state => state.auth

export default authSlice.reducer