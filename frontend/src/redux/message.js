import { csrfFetch } from "./csrf"
import { createSelector } from 'reselect'

const MESSAGES = 'messages/all'
const LOADINBOX = 'messages/INBOX'
const DELMESSAGE = 'message/DELETE'
const SEND = 'message/SEND'
const REPLIES = 'message/REPLIES'

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



/// THUNKS

export const thunkGetMessages = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/messages/home')
        if (response.ok) {
            const mailbox = await response.json()
            dispatch(getAllMessages(mailbox))
        }
    }

    catch (e) {
        return e
    }
}

export const thunkLoadInbox = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/messages`)
        if (response.ok) {
            const messages = await response.json();
            dispatch(loadInbox(messages))
            return messages
        }
    }
    catch (e) {
        console.log(e)
    }
}

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

export const thunkGetReplies = (messageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/replies/${messageId}`)
    if (response.ok) {
        const replies = await response.json();
        dispatch(addReplies(replies))
        return replies
    }
    else {
        const error = { message: 'Replies could not be loaded' }
        return error
    }
}

/// SELECTORS

export const messageByDateArray = createSelector((state) => state?.messages, (messages) => {
    if (messages) return Object.values(messages).sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
    })
    else return []
})

/// REDUCER

const initialState = { inbox: null, outbox: null }
export const messageReducer = (state = initialState, action) => {
    let messageState = { ...state }
    switch (action.type) {
        case MESSAGES: {
            newState.inbox = action.payload.inbox
            newState.outbox = action.payload.outbox
            return newState
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
            if (action.replies.length > 0) {
                const replyId = action.replies[0].replyId || action.replies[0].id
                console.log(replyId, action.replies)
                messageState[replyId].replies = action.replies
                return messageState
            }
        }
        default: {
            return messageState;
        }

    }
}
