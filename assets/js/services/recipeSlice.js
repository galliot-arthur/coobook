import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => await API.findAll('recipes')
)
export const addRecipe = createAsyncThunk(
    'recipes/addRecipe',
    async (data) => await API.post(data, 'recipes')
)
export const addIngredient = createAsyncThunk(
    'recipes/addIngredient',
    async (data) => await API.post(data, 'ingredients')
)
export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id) => {
        await API.deleteById(id, 'recipes')
        return id
    }
)
export const addStep = createAsyncThunk(
    'recipes/addStep',
    async (data) => await API.post(data, 'steps')
)
export const addCover = createAsyncThunk(
    'recipes/addCover',
    async (data) => data
)
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
                const serializedState = JSON.stringify(state.feed)
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
                const serializedState = JSON.stringify(state.feed)
                window.localStorage.setItem('recipesState', serializedState)
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.log('rejected :', action.error.message)
                state.error = action.error.message
            })
            /*
            ADDING INGREDIENT
            */
            .addCase(addIngredient.fulfilled, (state, action) => {
                state.feed[0] = { ...state.feed[0], ingredients: [...state.feed[0].ingredients, action.payload] }
                const serializedState = JSON.stringify(state.feed)
                window.localStorage.setItem('recipesState', serializedState)
            })
            .addCase(addIngredient.rejected, (state, action) => {
                console.log('rejected :', action.error.message)
                state.error = action.error.message
            })
            /*
            ADDING STEP
            */
            .addCase(addStep.fulfilled, (state, action) => {
                state.feed[0] = { ...state.feed[0], steps: [...state.feed[0].steps, action.payload] }
                const serializedState = JSON.stringify(state.feed)
                window.localStorage.setItem('recipesState', serializedState)
            })
            .addCase(addStep.rejected, (state, action) => {
                console.log('rejected :', action.error.message)
                state.error = action.error.message
            })
            /*
            ADDING COVER
            */
            .addCase(addCover.fulfilled, (state, action) => {
                state.feed[0] = {
                    ...state.feed[0], recipesImages: [
                        ...state.feed[0].recipesImages,
                        {
                            id: action.payload,
                            path: action.payload + '.jpg'
                        }
                    ]
                }
            })
            .addCase(addCover.rejected, (state, action) => {
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

export const { setStateLike } = recipeSlice.actions

export default recipeSlice.reducer

export const selectAllRecipes = state => state.recipes.feed

export const selectUserRecipes = (state, userId) => {
    state.recipes.feed.find(r => r.User.id == userId)
}

export const selectOneRecipeById = (state, recipeId) => state.recipes.feed.find(r => r.id == recipeId)