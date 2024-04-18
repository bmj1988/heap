import { csrfFetch } from "./csrf"
import { createSelector } from 'reselect'

const MESSAGES = 'messages/all'
const LOADINBOX = 'messages/INBOX'
const DELMESSAGE = 'message/DELETE'
const SEND = 'message/SEND'
const REPLIES = 'message/REPLIES'
const CLEAR = 'message/CLEAR'

/// ACTION CREATORS

const getAllMessages = (messages) => {
    return ({
        type: MESSAGES,
        payload: messages
    })
}


const send = (message) => {
    return (
        {
            type: SEND,
            message
        }
    )
}

const addReplies = (replies) => {
    return (
        {
            type: REPLIES,
            replies
        }
    )
}

const deleteMessageFromInbox = (messageId) => {
    return (
        {
            type: DELMESSAGE,
            messageId
        }
    )
}

export const clearMessages = () => {
    return (
        { type: CLEAR }
    )
}


/// THUNKS

export const thunkGetMessages = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/messages/')
        if (response.ok) {
            const mailbox = await response.json()
            dispatch(getAllMessages(mailbox))
        }
    }

    catch (e) {
        return e
    }
}

// export const thunkLoadInbox = () => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/messages`)
//         if (response.ok) {
//             const messages = await response.json();
//             dispatch(loadInbox(messages))
//             return messages
//         }
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

export const thunkSend = (message) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    if (response.ok) {
        const reply = await response.json();
        dispatch(send(reply));
        return reply
    }
    else {
        const error = await response.json();
        return error
    }
}

export const thunkDeleteMessage = (messageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const message = await response.json();
        dispatch(deleteMessageFromInbox(messageId))
        return message
    }
    else {
        const error = await response.json();
        return error
    }
}

export const thunkGetReplies = (bidId) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/replies/${bidId}`)
    if (response.ok) {
        const bidAndMessages = await response.json();
        dispatch(addReplies(bidAndMessages))
    }
    else {
        const error = { message: 'Replies could not be loaded' }
        return error
    }
}

/// SELECTORS

export const inboxArray = createSelector((state) => state.message, (messages) => {
    if (messages.inbox) return Object.values(messages.inbox)
    else return []
})

export const outboxArray = createSelector((state) => state.message, (messages) => {
    if (messages.outbox) return Object.values(messages.outbox)
    else return []
})


export const messageByDateArray = createSelector((state) => state?.message, (messages) => {
    if (messages) return Object.values(messages).sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
    })
    else return []
})

export const repliesByIdArray = createSelector((state) => state?.message, (messages) => {
    if (messages.current) return Object.values(messages.current).sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
    })
    else return []
})


/// REDUCER

const initialState = { inbox: null, outbox: null, current: {} }
export const messageReducer = (state = initialState, action) => {
    let messageState = { ...state }
    switch (action.type) {
        case MESSAGES: {
            const newState = {}
            newState.inbox = action.payload.inbox
            newState.outbox = action.payload.outbox
            return newState
        }
        case SEND: {
            messageState.current[action.message.id] = action.message
            return messageState
        }
        case LOADINBOX: {
            action.messages.forEach((message) => {
                messageState[message.id] = message
            })
            return messageState;
        }
        case DELMESSAGE: {
            delete messageState[action.messageId]
            return messageState;
        }
        case REPLIES: {
            const messageChainId = action.replies.id;
            messageState[messageChainId] = { bid: action.replies, agent: action.agent, messages: {} }
            messageState.current = {}
            action.replies.Messages.forEach((reply) => {
                messageState.current[reply.id] = reply
            })
            return messageState
        }
        case CLEAR: {
            console.log('CLEAR POP MESSAGE')
            return initialState;
        }
        default: {
            return messageState;
        }

    }
}
