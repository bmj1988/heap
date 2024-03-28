import { createSelector } from "reselect"
import { csrfFetch } from "./csrf"

/// ACTIONS
const UPDATE = 'agent/UPDATE'
const AGENT_HOME = 'agent/HOME'
const LOAD_AGENT_FEED = 'agent/LOAD'
const CLEAR = 'agent/CLEAR'
/// ACTION CREATORS

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
/// SELECTORS

export const agentFeedArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.feed.listings) return Object.values(agentInfo.feed.listings)
    else return []
})

export const agentMessagesArray = createSelector((state) => state.agent, (agentInfo) => {
    if (agentInfo.messages) return Object.values(agentInfo.messages)
    else return []
})

/// REDUCER

const initialState = { agent: null, feed: { listings: {}, details: {} }, messages: {}, accepted: {} }
export const agentReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case AGENT_HOME: {
            console.log(action.payload)
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
            action.payload.listings.forEach((listing) => {
                newState.feed.listings[listing.id] = listing
            })
            newState.details = action.payload.details

            return newState
        }
        case UPDATE: {
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
