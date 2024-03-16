import { useSelector } from "react-redux"
import { messagesArray } from "../../../../redux/owner"
import SingleMessageDiv from "./SingleMessageDiv"
import { FaCaretDown } from 'react-icons/fa'
import { useEffect, useState } from "react"

const MessagesWidget = () => {
    const messages = useSelector(messagesArray)
    const [displayed, setDisplayed] = useState(messages.slice(0, 5))
    const [more, setMore] = useState(false)
    const lastDisplayed = displayed[displayed.length - 1]
    const lastMessage = messages[messages.length - 1]


    useEffect(() => {
        if (!lastDisplayed || lastDisplayed.id === lastMessage.id) setMore(false)
        else setMore(true)
    }, [displayed, messages])

    const showMore = () => {
        const indexedMessage = messages?.find((message) => message.id === lastDisplayed.id)
        const indexOfLastInDisplayed = messages.indexOf(indexedMessage)
        if (messages.length > indexOfLastInDisplayed + 1) {
            const lastIndex = messages[indexOfLastInDisplayed + 5] ? indexOfLastInDisplayed + 5 : messages.length
            setDisplayed(messages.slice(indexOfLastInDisplayed + 1, lastIndex))
        }
    }

    return (
        <div>
            {messages && displayed.map((message) => {
                return (<SingleMessageDiv message={message} key={message.id} />)
            })}
            {more ? <FaCaretDown onClick={() => showMore()} className="messagesDownArrow" /> : null}
        </div>
    )
}

export default MessagesWidget;
