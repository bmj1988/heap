import { csrfFetch } from './csrf';

/// ACTIONS
const ADD_LISTING = 'listing/ADD'

/// ACTION CREATORS

const addListingDetails = (details) => {
    return {
        type: ADD_LISTING,
        payload: details
    }
}

/// THUNKS

export const thunkListingDetails = (listingId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/listings/${listingId}`)
        if (response.ok) {
            const listingDetails = await response.json()
            dispatch(addListingDetails(listingDetails))
        }
    }
    catch (e) {
        return e
    }
}

/// SELECTORS


/// REDUCER
const initialState = {}
export const listingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ADD_LISTING: {
            newState[action.payload.id] = action.payload
            return newState
        }

        default: {
            return newState
        }
    }
}
