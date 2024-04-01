import { csrfFetch } from './csrf'
import { createSelector } from 'reselect'

/// ACTIONS

const VENDOR_HOME = 'vendor/LOAD'
const ADD_LISTING = 'listing/ADD'
const LOAD_LISTINGS = 'listings/LOAD'
const REMOVE_LISTING = 'listing/REMOVE'
const SHOP_HUB = 'shopHub/load'
const UPDATE_SHOP = 'shop/update'
const REMOVE_SHOP = 'shop/delete'
const CLEAR = 'vendor/CLEAR'

/// ACTION CREATORS

export const clearVendor = () => {
    return {
        type: CLEAR
    }
}

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

export const thunkAddListing = (listing) => async (dispatch) => {
    const response = await csrfFetch('/api/listings/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    })
    if (response.ok) {
        const listingToAdd = await response.json()
        await dispatch(addListing(listingToAdd))
        return listingToAdd
    }
    else {
        const error = await response.json()
        return error
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
        const err = await e.json()
        return err
    }
}

export const thunkCloseListing = (listingId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/listings/${listingId}/close`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch(thunkVendorHome())
        }
    }
    catch (e) {
        const err = await e.json()
        return err
    }
}


/// SHOPS

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

export const thunkLoadShops = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/shops/ownerAll`)
        if (response.ok) {
            const allShops = await response.json()
            dispatch(loadShopHub(allShops))
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
        const err = await e.json();
        return err
    }
}

export const thunkShopCreate = (shopDetails) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/shops/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shopDetails)
        })
        if (response.ok) {
            const newShop = await response.json()
            dispatch(updateShop(newShop))
        }
    }
    catch (e) {
        const err = await e.json()
        return err
    }
}

export const thunkShopDelete = (shopId) => async (dispatch) => {
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

export const messagesArray = createSelector((state) => state.vendor, (vendorState) => {
    if (vendorState.messages) return Object.values(vendorState.messages)
    else return []
})

/// REDUCER
const initialState = { shops: {}, listings: {}, messages: {} }
export const vendorReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case VENDOR_HOME: {
            newState = initialState
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
        case UPDATE_SHOP: {
            newState.shops[action.payload.id] = action.payload
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
        case CLEAR: {
            return initialState;
        }
        default: {
            return newState
        }
    }
}
