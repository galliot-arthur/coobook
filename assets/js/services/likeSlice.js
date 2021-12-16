import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const fetchLikes = createAsyncThunk(
    'likes/fetchLikes',
    async () => await API.findAll('likes')
)

export const likeSlice = createSlice({
    name: 'likes',
    initialState: { recipes: [] },
    reducers: {
        setLikes(state, action) {
            state.recipes = action.payload
            localStorage.setItem('likeState', JSON.stringify(state.recipes))
        },
        addLike(state, action) {
            state.recipes.push({ recipe: action.payload })
        },
        removeLike(state, action) {
            state.recipes = state.recipes.filter(r => r.recipe != action.payload)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLikes.fulfilled, (state, action) => {
                state.recipes = action.payload
            })
            .addCase(fetchLikes.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})
export const { setLikes, addLike, removeLike } = likeSlice.actions

export default likeSlice.reducer

export const selectAllLikes = state => state.likes.recipes

export const selectLikeById = (state, id) => state.likes.recipes.find(l => l.recipe == id)