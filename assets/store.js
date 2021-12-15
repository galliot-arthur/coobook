import { configureStore } from "@reduxjs/toolkit";
import authReducer from './js/services/authSlice'
import recipesReducer from './js/services/recipeSlice'
import bookmarkReducer from './js/services/bookMarkSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer,
        bookmarks: bookmarkReducer,
    }
})