import { csrfFetch } from './csrf'
import { createSelector } from 'reselect'
/// ACTIONS

const VENDOR_HOME = 'vendor/LOAD'
const ADD_LISTING = 'listing/ADD'
const LOAD_LISTINGS = 'listings/LOAD'
const ACCEPT_BID = 'bid/ACCEPT'
const REMOVE_LISTING = 'listing/REMOVE'
const SHOP_HUB = 'shopHub/load'
const UPDATE_SHOP = 'shop/update'
const REMOVE_SHOP = 'shop/delete'

/// ACTION CREATORS

const loadVendorHome = (home) => {
    return {
        type: VENDOR_HOME,
        payload: home
    }
}

export const addListing = (listing) => {
    return {
        type: ADD_LISTING,
        payload: listing
    }
}

const loadListings = (listings) => {
    return {
        type: LOAD_LISTINGS,
        payload: listings
    }
}

const acceptBid = (bidId) => {
    return {
        type: ACCEPT_BID,
        payload: bidId
    }
}

const removeListing = (listingId) => {
    return {
        type: REMOVE_LISTING,
        payload: listingId
    }
}

const loadShopHub = (shopHub) => {
    return {
        type: SHOP_HUB,
        payload: shopHub
    }
}

const updateShop = (shopDetails) => {
    return {
        type: UPDATE_SHOP,
        payload: shopDetails
    }
}

const removeShop = (shopId) => {
    return {
        type: REMOVE_SHOP,
        payload: shopId
    }
}

/// THUNKS

export const thunkVendorHome = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/vendor/home')
        if (response.ok) {
            const shopInfo = await response.json()
            dispatch(loadVendorHome(shopInfo))
        }
    }
    catch (e) {
        return e
    }
}



export const thunkLoadListings = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/listings/open')
        if (response.ok) {
            const listings = await response.json()
            dispatch(loadListings(listings))
        }
    }

    catch (e) {
        return e
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

export const thunkRemoveListing = (listingId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/listings/${listingId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch(removeListing(listingId))
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
            dispatch(addListing(editedListing))
        }
    }
    catch (e) {
        return e
    }
}

export const thunkShopHub = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/shops/home`)
        if (response.ok) {
            const shopHub = await response.json()
            dispatch(loadShopHub(shopHub))
        }
    }
    catch (e) {
        return e
    }
}

export const thunkShopUpdate = (shopDetails) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/shops/${shopDetails.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shopDetails)
        })
        if (response.ok) {
            const updatedShop = await response.json()
            dispatch(updateShop(updatedShop))
        }
    }
    catch (e) {
        return e
    }
}

export const thunkShopDelete = (shopId) => async(dispatch) => {
    try {
        const response = await csrfFetch(`/api/shops/${shopId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch(removeShop(shopId))
        }
    }
    catch (e) {
        return e
    }
}

/// SELECTORS

export const listingsArray = createSelector((state) => state.vendor, (vendorState) => {
    if (vendorState.listings) return Object.values(vendorState.listings)
    else return []
})

export const shopsArray = createSelector((state) => state.vendor, (vendorState) => {
    if (vendorState.shops) return Object.values(vendorState.shops)
    else return []
})

/// REDUCER
const initialState = { shops: {}, listings: {}, messages: {} }
export const vendorReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case VENDOR_HOME: {
            action.payload.shops.forEach((shop) => {
                newState.shops[shop.id] = shop
            })
            action.payload.listings.forEach((listing) => {
                newState.listings[listing.id] = listing
            })
            action.payload.messages.forEach((message) => {
                newState.messages[message.id] = message
            })

            return newState
        }
        case LOAD_LISTINGS: {
            newState.listings = {}
            action.payload.forEach((listing) => {
                newState.listings[listing.id] = listing
            })
            return newState;
        }
        case SHOP_HUB: {
            action.payload.Shops.forEach((shop) => {
                newState.shops[shop.id] = shop
            })
            return newState;
        }
        case ACCEPT_BID: {
            const bid = newState.listings[action.payload]
            newState.listings[action.payload] = { ...bid, accepted: true }
            return newState
        }
        case ADD_LISTING: {
            newState.listings[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_LISTING: {
            delete newState.listings[action.payload]
            return newState
        }
        case REMOVE_SHOP: {
            delete newState.shops[action.payload]
            return newState
        }
        default: {
            return newState
        }
    }
}
