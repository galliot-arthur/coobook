import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { API_URL } from "../config"
import API from "./API"

export const authLogin = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        return await axios
            .post(API_URL + 'api/' + 'login_check', credentials)
            .then(r => r.data.token)
            .then(async token => {
                axios.defaults.headers["Authorization"] = "Bearer " + token

                const data = jwtDecode(token)
                const userData = await API.get(data.id, 'users')
                const userRecipes = await API.findAll('users/' + data.id + '/recipes')
                window.localStorage.setItem('userRecipesState', JSON.stringify(userRecipes))
                window.localStorage.setItem('userState', JSON.stringify({ ...userData, connectedAt: new Date() }))
                window.localStorage.setItem(
                    'toto', token)
                window.localStorage.setItem(
                    'authToken', data.firstName
                )
                window.localStorage.setItem(
                    'authId', data.id
                )
                window.localStorage.setItem(
                    'sessionOpenedAt', new Date()
                )
                return userData
            })
    }
)

export const authLogout = createAsyncThunk(
    'auth/logout',
    async () => {
        window.localStorage.removeItem('authToken')
        window.localStorage.removeItem('authId')
        window.localStorage.removeItem('sessionOpenedAt')
        window.localStorage.removeItem('userState')
        return await axios
            .post(API_URL + 'api/' + 'logout')
            .then(r => {
                delete axios.defaults.headers['Authorization']
                return r.ok
            })
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: { connected: false, user: [] },
    reducers: {
        checkConnectedStatus(state, action) {
            if (
                window.localStorage.getItem('authToken') &&
                window.localStorage.getItem('authId') &&
                window.localStorage.getItem('sessionOpenedAt')
                //(window.localStorage.getItem('sessionOpenedAt') < 360000)
            ) { state.connected = true }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(authLogin.fulfilled, (state, action) => {
                state.connected = true
                state.user = action.payload
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                state.connected = false
            })
            .addCase(authLogout.rejected, (state, action) => {
                state.connected = false
            })
    }
})

export const { checkConnectedStatus } = authSlice.actions

export const isConnected = state => state.auth.connected

export const getUser = state => state.auth.user

export default authSlice.reducer