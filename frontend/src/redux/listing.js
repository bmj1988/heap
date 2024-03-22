import { createSelector } from 'reselect';
import { csrfFetch } from './csrf';

/// ACTIONS
const ADD_LISTING = 'listing/ADD'
const REVOKE_BID = 'bid/REVOKE'
const ACCEPT_BID = 'bid/ACCEPT'
const HISTORY = 'listing/HISTORY'
const CLEAR = 'vendor/CLEAR'

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

export const acceptBid = (bidId) => {
    return {
        type: ACCEPT_BID,
        payload: bidId
    }
}

const loadHistory = (closedListings) => {
    return {
        type: HISTORY,
        payload: closedListings
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

export const thunkEditListing = (listingInfo) => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/listings/${listingInfo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listingInfo)
        })
        if (response.ok) {
            const editedListing = await response.json();
            dispatch(addListingDetails(editedListing))
        }
    }
    catch (e) {
        const err = await e.json();
        console.log(err)
        return err
    }
}

export const thunkCreateListingAWS = (listingInfo, images) => async (dispatch) => {
    try {
        const imagesArray = Object.values(images)
        const formData = new FormData();
        for (let detail in listingInfo) {
            formData.append(detail, listingInfo[detail])
        }
        for (let image of imagesArray) {
            formData.append('images', image, image.name)
        }
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }
        const response = await csrfFetch('/api/listings/new', option)
        if (response.ok) {
            const listingToAdd = await response.json()
            await dispatch(addListingDetails(listingToAdd))
            return listingToAdd
        }
        else {
            const error = await response.json()
            return error
        }
    }
    catch (e) {
        const err = await e.json();
        return err
    }
}

export const thunkEditListingAWS = (listingInfo, images, deletedImages) => async (dispatch) => {
    try {

        const formData = new FormData();
        if (images) {
            const imagesArray = Object.values(images)
            for (let image of imagesArray) {
                formData.append('images', image, image.name)
            }
        }

        if (deletedImages) {
            const deletedImagesArray = Object.values(deletedImages)
            for (let image of deletedImagesArray) {
                formData.append('deletedImages', image)
            }
        }

        for (let detail in listingInfo) {
            formData.append(detail, listingInfo[detail])
        }



        const option = {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }

        const response = await csrfFetch(`/api/listings/${listingInfo.id}`, option);
        if (response.ok) {
            const editedListing = await response.json();
            dispatch(addListingDetails(editedListing))
        }
        else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occured. Please try again.')
            }
        }
        return response;
    }
    catch (e) {
        const err = await e.json();
        console.log(err)
        return err
    }
}

export const thunkAcceptBid = (bidId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bids/${bidId}`, {
            method: 'PATCH'
        })
        if (response.ok) {
            dispatch(acceptBid(bidId))
        }
    }
    catch (e) {
        return e
    }
}

export const thunkRevokeBid = (bidId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bids/${bidId}/revoke`, {
            method: 'PATCH'
        })
        if (response.ok) {
            const newBid = await response.json()
            dispatch(revokeBid(newBid))
        }

    }
    catch (e) {
        const err = await e.json()
        return err
    }
}

export const thunkListingHistory = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/vendor/history`)
        if (response.ok) {
            const listingHistory = await response.json()
            dispatch(loadHistory(listingHistory))
        }
    }
    catch (e) {
        const err = await e.json()
        return err
    }
}


/// SELECTORS
export const bidsArray = createSelector((state) => state.listings, (listingsState) => {
    if (listingsState.bids) return Object.values(listingsState.bids)
    else return []
})

export const listingHistoryArray = createSelector((state) => state.listings, (listingState) => {
    if (listingState.history) return Object.values(listingState.history)
    else return []
})

/// REDUCER
const initialState = { listing: null, bids: null }
export const listingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ADD_LISTING: {
            newState.listing = action.payload
            newState['bids'] = {}
            if (action.payload.Bids) {
                action.payload.Bids.forEach((bid) => {
                    newState['bids'][bid.id] = bid
                })
            }
            return newState
        }
        case REVOKE_BID: {
            newState.bids[action.payload.id] = action.payload
            return newState
        }
        case ACCEPT_BID: {
            const bid = newState.bids[action.payload]
            newState.bids[action.payload] = { ...bid, accepted: true, acceptedOn: new Date() }
            return newState
        }
        case HISTORY: {
            newState.history = {}
            action.payload.History.forEach((listing) => {
                newState.history[listing.id] = listing
            })
            return newState
        }
        case CLEAR: {
            return initialState;
        }
        default: {
            return newState
        }
    }
}
