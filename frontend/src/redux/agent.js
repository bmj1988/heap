/// ACTIONS

/// ACTION CREATORS

/// THUNKS

/// SELECTORS

/// REDUCER

const initialState = { agent: null }
const agentReducer = ({ state = initialState, action }) => {
    const newState = { ...state }
    switch (action.type) {
        case UPDATE: {
            return newState
        }
        default: {
            return newState
        }
    }
}
