import { csrfFetch } from './csrf';

/// ACTIONS
const ADD_LISTING = 'listing/ADD'
const REVOKE_BID = 'bid/REVOKE'

/// ACTION CREATORS

const addListingDetails = (details) => {
    return {
        type: ADD_LISTING,
        payload: details
    }
}

const revokeBid = (bid) => {
    return {
        type: REVOKE_BID,
        payload: bid
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

export const thunkRevokeBid = (bidId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bids/${bidId}/revoke`)
        if (response.ok) {
            const newBid = await response.json()
        }

    }
    catch (e) {
        const err = await e.json()
        return err
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
        case REVOKE_BID: {
            newState[action.payload.listingId]['Bids'][action.payload.id] = action.payload
            return newState
        }
        default: {
            return newState
        }
    }
}
