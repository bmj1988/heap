import { useSelector } from "react-redux"
import { messagesArray } from "../../../../redux/owner"
import SingleMessageDiv from "./SingleMessageDiv"
import { FaCaretDown } from 'react-icons/fa'
import { useEffect, useState } from "react"

const MessagesWidget = () => {
    const messages = useSelector(messagesArray)
    const [displayed, setDisplayed] = useState(messages.slice(0, 5))
    const [more, setMore] = useState(false)

    useEffect(() => {
        const lastDisplayed = displayed[displayed.length - 1]
        const lastMessage = messages[messages.length - 1]
        if (lastDisplayed === lastMessage) setMore(false)
        else setMore(true)
    }, [displayed])

    const showMore = () => {
        const indexOfLastInDisplayed = messages.indexOf(displayed[displayed.length - 1])
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
            {more && <FaCaretDown onClick={() => showMore()} className="messagesDownArrow" />}
        </div>
    )
}

export default MessagesWidget;
