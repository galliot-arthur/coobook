import { configureStore } from "@reduxjs/toolkit";
import authReducer from './js/services/authSlice'
import recipesReducer from './js/services/recipeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer,
    }
})