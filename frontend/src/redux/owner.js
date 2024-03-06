import { csrfFetch } from './csrf'
import { createSelector } from 'reselect'
/// ACTIONS

const VENDOR_HOME = 'vendor/LOAD'
const ADD_LISTING = 'listing/ADD'

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

/// THUNKS

export const thunkVendorHome = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/shops/home')
        if (response.ok) {
            const shopInfo = await response.json()
            dispatch(loadVendorHome(shopInfo))
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
const initialState = { shops: {}, listings: {} }
export const vendorReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case VENDOR_HOME: {
            action.payload.Shops.forEach((shop) => {
                newState.shops[shop.id] = shop
                shop.Listings.forEach((listing) => {
                    newState.listings[listing.id] = listing
                })
            })
            return newState
        }
        case ADD_LISTING: {
            console.log(action.payload)
            newState.listings[action.payload.id] = action.payload
            return newState
        }
        default: {
            return newState
        }
    }
}
