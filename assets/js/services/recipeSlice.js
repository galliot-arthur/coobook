import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
        return await API.findAll('recipes')
    })

export const addRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async (data) => {
        return await API.post(data, 'recipes')
    })

export const addIngredient = createAsyncThunk(
    'recipes/addIngredient',
    async (data) => {
        return await API.post(data, 'ingredients')
    })

export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id) => {
        await API.deleteById(id, 'recipes')
        return id
    })

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: { feed: [], currentUpdate: [] },
    reducers: {},
    extraReducers(builder) {
        builder
            /* 
            FETCHING
            */
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.feed = action.payload
                const serializedState = JSON.stringify([...state.feed, action.payload])
                localStorage.setItem('recipesState', serializedState)
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                console.log('rejected', action.error.message)
                state.error = action.error.message
            })
            /*
            ADDING RECIPE
            */
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.currentUpdate = action.payload
                state.feed = [action.payload, ...state.feed]
                localStorage.setItem('IRI', '/api/recipes/' + action.payload.id)
                const serializedState = JSON.stringify([action.payload, ...state.feed])
                window.localStorage.setItem('recipesState', serializedState)
                console.log('test')
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.log('rejected :', action.error.message)
                state.error = action.error.message
            })
            /*
            ADDING INGREDIENTS
            */
            .addCase(addIngredient.fulfilled, (state, action) => {
                const payload = action.payload
                state.feed = state.feed.forEach(
                    recipe => {
                        recipe.id === state.currentUpdate.id
                            ? recipe.ingredients = { ...recipe.ingredients, payload }
                            : recipe
                    }
                )
                console.log('test')
                const serializedState = JSON.stringify(state.feed)
                window.localStorage.setItem('recipesState', serializedState)
            })
            .addCase(addIngredient.rejected, (state, action) => {
                console.log('rejected :', action.error.message)
                state.error = action.error.message
            })
            /*
            DELETE RECIPE
            */
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.feed = state.feed.filter(r => r.id !== action.payload)
            })
    }
})

export default recipeSlice.reducer

export const selectAllRecipes = state => state.recipes.feed

export const selectUserRecipes = (state, userId) => state.recipes.feed.find(r => r.User.id == userId)

export const selectOneRecipeById = (state, recipeId) => state.recipes.feed.find(r => r.id == recipeId)