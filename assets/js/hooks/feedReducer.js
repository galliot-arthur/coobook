import { useReducer } from "react";
import API from '../services/API'


function reducer(state, action) {
    console.log('reduce', action)
    switch (action.type) {
        case 'FETCHING_FEED':
            return {...state, loading: true }
        case 'SET_FEED':
            return {...state, feed: action.payload, loading: false }
        case 'DELETE_ITEM':
            return {...state, feed: state.feed.filter(e => e.id !== action.payload) }
        case 'ADD_ITEM':
            return {...state, feed: [action.payload, ...state.feed] }
        case 'UPDATE_ITEM':
            return {...state, feed: state.feed.forEach(e => e.id === action.target ? action.payload : e) }
        default:
            return state
    }
}

export function useFeed() {
    const [state, dispatch] = useReducer(reducer, {
        feed: [],
        loading: false,
    })
    return {
        feed: state.feed,

        /**
         * Get all the recipes composing the feed
         * @param {Array} feedCxt 
         * @returns Return an elements' array 
         */
        fetchFeed: async(feedCxt) => {
            if (state.loading) { return }
            if (feedCxt.length > 0) {
                dispatch({ type: 'SET_FEED', payload: feedCxt })
                return feedCxt
            }

            dispatch({ type: 'FETCHING_FEED' })
            const feed = await API.findAll('recipes')
            dispatch({ type: 'SET_FEED', payload: feed })
            return feed
        },

        /**
         * Delete and element from the database AND from the context / state
         * @param {number} id ID of the element
         */
        deleteItem: async(id) => {
            await API.deleteById(id, 'recipes')
            dispatch({ type: 'DELETE_ITEM', payload: id })
        },

        /**
         * Update and element from the database AND from the context / state
         * @param {number} id ID of the element
         * @param {Object} data An object with all the data
         * @returns Returns the updated item
         */
        updateItem: async(id, data) => {
            const item = await API.put(id, data, 'recipes')
            dispatch({ type: 'UPDATE_ITEM', payload: item, target: id })
            return item
        },

        /**
         * @param {Object} data An object with all the data
         * @returns Returns the posted item
         */
        addItem: async(data) => {
            const item = await API.post(data, 'recipes')
            dispatch({ type: 'ADD_ITEM', payload: item })
            return item
        },


        updateImageItem: async(id, data) => {
            const item = await API.put(id, data, 'recipes')
            dispatch({ type: 'UPDATE_ITEM', payload: item, target: id })
            return item
        }
    }
}