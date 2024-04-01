import { createSelector } from "reselect"
import { csrfFetch } from "./csrf"
import CurrentBids from "../components/AgentOnly/CurrentBids"

/// ACTIONS
const UPDATE = 'agent/UPDATE'
const AGENT_HOME = 'agent/HOME'
const LOAD_AGENT_FEED = 'agent/LOAD'
const CLEAR = 'agent/CLEAR'
const DELETE_BID = "bid/DELETE"
const EDIT_BID = "bid/EDIT"
const LOAD_CURRENT_BIDS = "bids/LOAD"
const LOAD_AGENT_PROFILE = "profile/LOAD"
/// ACTION CREATORS

export const clearAgent = () => {
    return {
        type: CLEAR
    }
}

const loadAgentHome = (agentHome) => {
    return {
        type: AGENT_HOME,
        payload: agentHome
    }
}

const loadAgentListings = (listings) => {
    return {
        type: LOAD_AGENT_FEED,
        payload: listings
    }
}

const deleteBid = (bidId) => {
    return {
        type: DELETE_BID,
        payload: bidId
    }
}

const editBid = (details) => {
    return {
        type: EDIT_BID,
        payload: details
    }
}

const loadBids = (bids) => {
    return {
        type: LOAD_CURRENT_BIDS,
        payload: bids
    }
}

const addProfile = (profile) => {
    return {
        type: LOAD_AGENT_PROFILE,
        payload: profile
    }
}
/// THUNKS

export const thunkAgentHome = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/agent/home`)
        if (response.ok) {
            const agentHome = await response.json();
            dispatch(loadAgentHome(agentHome))
            dispatch(thunkGetAgentListings())
        }
    }
    catch (e) {
        return e
    }
}

export const thunkGetAgentListings = (size, page) => async (dispatch) => {
    try {
        const query = (size && page) ? `?size=${size}&page=${page}` : ""
        const response = await csrfFetch(`/api/listings/feed${query}`)
        if (response.ok) {
            const agentListings = await response.json();
            dispatch(loadAgentListings(agentListings))
        }
    }
    catch (e) {
        return e
    }
}

export const thunkPlaceBid = (listingId, offer, message) => async (dispatch) => {
    try {
        const reqBody = {
            offer,
            message
        }
        await csrfFetch(`/api/listings/${listingId}/bids`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(reqBody)
            })
    }
    catch (e) {
        const err = await e.json();
        return err
    }
}

export const thunkDeleteBid = (bidId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bids/${bidId}`, {
            method: 'DELETE'
        })
        dispatch(deleteBid(bidId))
    }
    catch (e) {
        return e
    }
}

export const thunkEditBid = (bidDetails) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bids/${bidDetails.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ offer: bidDetails.offer, message: bidDetails.message })
        })
        if (response.ok) {
            const bid = await response.json();
            dispatch(editBid(bid))
        }
    }
    catch (e) {
        const err = await e.json();
        return err
    }
}

export const thunkCurrentBids = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`api/bids/open`)
        if (response.ok) {
            const currentBids = await response.json()
            dispatch(loadBids(currentBids))
        }
    }
    catch (e) {
        const err = await e.json();
        return err
    }
}

export const thunkAgentProfile = (agentId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`api/agent-profile/${agentId}`)
        if (response.ok) {
            const agentProfile = await response.json();
            dispatch(addProfile(agentProfile))
        }

    }
    catch (e) {
        const err = await e.json();
        return err
    }
}
/// SELECTORS

export const agentFeedArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.feed.listings) return Object.values(agentInfo.feed.listings)
    else return []
})

export const agentMessagesArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.messages) return Object.values(agentInfo.messages)
    else return []
})

export const acceptedBidsArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.accepted) return Object.values(agentInfo.accepted)
    else return []
})

export const currentBidsArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.currentBids) return Object.values(agentInfo.currentBids)
    else return []
})

/// REDUCER

const initialState = { agent: null, feed: { listings: {}, details: {} }, messages: {}, accepted: {}, currentBids: {}, profile: {} }
export const agentReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case AGENT_HOME: {
            const agentDetails = { name: action.payload.Agent.name, id: action.payload.Agent.id }
            newState.agent = agentDetails
            action.payload.Recipient.forEach((message) => {
                newState.messages[message.id] = message
            })
            action.payload.Agent.Bids.forEach((bid) => {
                newState.accepted[bid.id] = bid
            })
            return newState;
        }
        case LOAD_AGENT_FEED: {
            newState.feed.listings = {};
            action.payload.listings.forEach((listing) => {
                newState.feed.listings[listing.id] = listing
            })
            newState.feed.details = action.payload.details

            return newState
        }
        case DELETE_BID: {
            if (newState.currentBids[action.payload]) delete newState.currentBids[action.payload]
            return newState
        }
        case EDIT_BID: {
            newState.currentBids[action.payload.id] = action.payload
            return newState;
        }
        case UPDATE: {
            return newState
        }
        case LOAD_CURRENT_BIDS: {
            newState.currentBids = {}
            action.payload.forEach((bid) => {
                newState.currentBids[bid.id] = bid
            })
            return newState;

        }
        case LOAD_AGENT_PROFILE: {
            newState.profile = action.payload
            return newState
        }
        case CLEAR: {
            return initialState
        }
        default: {
            return newState
        }
    }
}
