import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const fetchBookMarked = createAsyncThunk(
    'bookMarks',
    async () => {
        return await API.findMarkedRecipes(window.localStorage.getItem('authId'))
    }
)

export const bookMarkSlice = createSlice({
    name: 'bookmarks',
    initialState: { recipes: [] },
    reducers: {
        removeBookmark(state, action) {
            state.recipes = state.recipes.filter(e => e.id !== action.payload)
            const serializedState = JSON.stringify(state.recipes)
            localStorage.setItem('bookmarksState', serializedState)
        },
        addBookmark(state, action) {
            state.recipes.unshift(action.payload)
            const serializedState = JSON.stringify(state.recipes)
            localStorage.setItem('bookmarksState', serializedState)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBookMarked.fulfilled, (state, action) => {
                state.recipes = action.payload
                const serializedState = JSON.stringify(state.recipes)
                localStorage.setItem('bookmarksState', serializedState)
            })
            .addCase(fetchBookMarked.rejected, (state, action) => {
                console.log(action.error)
            })

    }
})

export const { removeBookmark, addBookmark } = bookMarkSlice.actions

export default bookMarkSlice.reducer

export const selectAllBookMarked = state => state.bookmarks.recipes

export const selectBookMarkById = createSelector(
    [selectAllBookMarked, (state, id) => id],
    (recipes, id) => recipes.find(r => r.id == id)
)