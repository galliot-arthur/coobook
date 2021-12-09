import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toto: 10,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.toto += 1
        },
        decrement: (state) => {
            state.toto -= 1
        },
        incrementByAmount: (state, action) => {
            state.toto += action.payload
        },
    },
})

export const {
    increment,
    decrement,
    incrementByAmount } = counterSlice.actions

export default counterSlice.reducer