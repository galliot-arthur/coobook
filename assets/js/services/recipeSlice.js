import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async(_, { getState }) => {
        const feed = selectAllRecipes(getState())
        return feed.length < 1 ? await API.findAll('recipes') : feed
    }
)

/* 
ADD PART
*/
export const addRecipe = createAsyncThunk('recipes/addRecipe',
    async(data) => await API.post(data, 'recipes')
)
export const addIngredient = createAsyncThunk('recipes/addIngredient',
    async(data) => await API.post(data, 'ingredients')
)
export const addStep = createAsyncThunk(
    'recipes/addStep',
    async(data) => await API.post(data, 'steps')
)
export const addCover = createAsyncThunk(
    'recipes/addCover',
    async(data) => data
)

/*
DELETE PART
*/
export const deleteRecipe = createAsyncThunk('recipes/deleteRecipe',
    async(id) => {
        await API.deleteById(id, 'recipes')
        return id
    }
)
export const deleteStep = createAsyncThunk('recipes/deleteStep',
    async({ id, recipe }) => {
        await API.deleteById(id, 'steps')
        return recipe
    }
)

/*
EDIT PART
*/
export const editRecipe = createAsyncThunk('recipes/editRecipe',
    async({ id, data }) => {
        const recipe = {
            title: data.title,
            intro: data.intro,
            author: data.author,
            outro: data.outro,
        }
        return await API.put(id, recipe, 'recipes')
    }
)
export const editStep = createAsyncThunk('recipes/editStep',
    async({ id, step, recipe }) => {
        await API.put(id, step, 'steps')
        return recipe
    }
)
export const editIngredient = createAsyncThunk('recipes/editIngredient',
    async({ id, ingredient, recipe }) => {
        //ingredient.amount = toString(ingredient.amount)
        await API.put(id, ingredient, 'ingredients')
        return recipe
    }
)

export const setReport = createAsyncThunk('recipes/setReport',
    async(id) => {
        const recipeData = { status: "reported" }
        return await API.put(id, recipeData, 'recipes')
    }
)
export const cancelReport = createAsyncThunk('recipes/cancelReport',
    async(id) => {
        const recipeData = { status: "" }
        return await API.put(id, recipeData, 'recipes')
    }
)
export const deactivate = createAsyncThunk('recipes/deactivate',
    async(id) => {
        const recipeData = { status: "deactivate" }
        return await API.put(id, recipeData, 'recipes')
    }
)

export const reactivate = createAsyncThunk('recipes/reactivate',
    async(id) => {
        const recipeData = { status: "" }
        return await API.put(id, recipeData, 'recipes')
    }
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
            .addCase(fetchRecipes.rejected, (state, action) => { console.log('rejected', action.error.message) })

        /*
        RECIPE
        */

        // ADD
        .addCase(addRecipe.fulfilled, (state, action) => {
                state.currentUpdate = action.payload
                state.feed = [action.payload, ...state.feed]
                localStorage.setItem('IRI', '/api/recipes/' + action.payload.id)
            })
            .addCase(addRecipe.rejected, (state, action) => { console.log('rejected :', action.error.message) })

        // EDIT
        .addCase(editRecipe.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            .addCase(editRecipe.rejected, (state, action) => console.log(action.error))


        /*
        INGREDIENT
        */
        // ADD
        .addCase(addIngredient.fulfilled, (state, action) => {
                state.feed[0] = {...state.feed[0], ingredients: [...state.feed[0].ingredients, action.payload] }
            })
            .addCase(addIngredient.rejected, (state, action) => { console.log('rejected :', action.error.message) })
            // EDIT
            .addCase(editIngredient.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })

        /*
        STEP
        */
        // ADD
        .addCase(addStep.fulfilled, (state, action) => {
                state.feed[0] = {...state.feed[0], steps: [...state.feed[0].steps, action.payload] }
            })
            .addCase(addStep.rejected, (state, action) => { state.error = action.error.message })
            // EDIT
            .addCase(editStep.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            // DELETE
            .addCase(deleteStep.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })

        /*
        COVER
        */
        .addCase(addCover.fulfilled, (state, action) => {
                state.feed[0] = {
                    ...state.feed[0],
                    recipesImages: [
                        ...state.feed[0].recipesImages,
                        {
                            id: action.payload,
                            path: action.payload + '.jpg'
                        }
                    ]
                }
            })
            .addCase(addCover.rejected, (state, action) => state.error = action.error.message)


        /*
        DELETE RECIPE
        */
        .addCase(deleteRecipe.fulfilled, (state, action) => {
            state.feed = state.feed.filter(r => r.id !== action.payload)
        })

        /* REPORT */
        .addCase(setReport.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            .addCase(setReport.rejected, (state, action) => console.log(action.error.message))
            .addCase(cancelReport.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            .addCase(cancelReport.rejected, (state, action) => console.log(action.error.message))
            /* DEACTIVATE */
            .addCase(deactivate.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            .addCase(deactivate.rejected, (state, action) => console.log(action.error.message))
            /* REACTIVATE */
            .addCase(reactivate.fulfilled, (state, action) => {
                state.feed = state.feed.map(r => r.id == action.payload.id ? action.payload : r)
            })
            .addCase(reactivate.rejected, (state, action) => console.log(action.error.message))
    }
})

export const { setStateLike } = recipeSlice.actions

export default recipeSlice.reducer

export const selectAllRecipes = state => state.recipes.feed

export const selectUserRecipes = (state, userId) => state.recipes.feed
    .filter(r => r.User.id == userId)

export const selectReportedRecipes = state => state.recipes.feed
    .filter(r => r.status == 'reported')

export const selectDeactivateRecipes = state => state.recipes.feed
    .filter(r => r.status == 'deactivate')

export const selectOneRecipeById = (state, recipeId) => state.recipes.feed
    .find(r => r.id == recipeId)