import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "./API";

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ comment, recipeId }) => {
        const user = JSON.parse(localStorage.getItem('userState'))
        const data = await API.post(comment, 'comments')
        return { ...data, user: user, recipeId }
    }
)

export const editComment = createAsyncThunk(
    'comments/editComment',
    async ({ id, data, comment }) => {
        const { content } = await API.put(id, data, 'comments')
        const editedComment = { ...comment, content: content }
        return editedComment
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (id) => {
        await API.deleteById(id, 'comments')
        return id
    }
)

const commentSlice = createSlice({
    name: 'comments',
    initialState: { comments: [] },
    reducers: {
        loadComments(state, action) {
            state.comments = action.payload
        }
    },
    extraReducers(builder) {
        builder
            /* ADD */
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments = state.comments.push(action.payload)
            })
            .addCase(addComment.rejected, (state, action) => console.log('rejected :', action.error))
            /* EDIT */
            .addCase(editComment.fulfilled, (state, action) => state.comments = state.comments.map(
                comment => comment.id == action.payload.id
                    ? action.payload
                    : comment
            ))
            .addCase(editComment.rejected, (state, action) => console.log('rejected :', action.error))
            /* DELETE */
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(c => c.id != action.payload)
            })
            .addCase(deleteComment.rejected, (state, action) => console.log('rejected :', action.error))
    }
})

export const { loadComments } = commentSlice.actions
export default commentSlice.reducer

export const getAllComments = state => state.comments.comments
export const getCommentsByRecipe = (state, id) => state.comments.comments.filter(c => c.recipeId == id)