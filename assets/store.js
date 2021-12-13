import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './js/features/counter/couterSlide'
import authReducer from './js/services/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})