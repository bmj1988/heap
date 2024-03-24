import { useSelector } from "react-redux"
import { messagesArray } from "../../../../redux/owner"
import SingleMessageDiv from "./SingleMessageDiv"
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useEffect, useState } from "react"

const MessagesWidget = () => {
    const messages = useSelector(messagesArray)
    const [displayed, setDisplayed] = useState(messages.slice(0, 5))
    const [more, setMore] = useState(false)
    const [less, setLess] = useState(false)

    useEffect(() => {
        const lastDisplayed = displayed[displayed.length - 1]
        const lastMessage = messages[messages.length - 1]
        if (!lastDisplayed || lastDisplayed.id === lastMessage.id) setMore(false)
        else setMore(true)
    }, [displayed, messages])

    useEffect(() => {
        const firstDisplayed = displayed[0]
        const firstMessage = messages[0]
        if (firstDisplayed.id === firstMessage.id) setLess(false)
        else setLess(true)
    }, [displayed, messages])

    const showMore = () => {
        const lastDisplayed = displayed[displayed.length - 1]
        const idx = messages.indexOf(lastDisplayed)
        if (messages.length > idx + 2) {
            const lastIndex = messages[idx + 5] ? idx + 5 : messages.length
            setDisplayed(messages.slice(idx + 1, lastIndex))
        }
    }

    const showLess = () => {
        const indexOfFirstDisplayed = messages.indexOf(displayed[0])
        if (messages[indexOfFirstDisplayed - 5]) setDisplayed(messages.slice(indexOfFirstDisplayed - 5, indexOfFirstDisplayed))
        else setDisplayed(messages.slice(0, 5))
    }

    return (
        <div>
            {messages && displayed.map((message) => {
                return (<SingleMessageDiv message={message} key={message.id} />)
            })}
            <div>
                {less ? <FaCaretUp onClick={() => showLess()} className="messagesDownArrow" /> : null}
                {more ? <FaCaretDown onClick={() => showMore()} className="messagesDownArrow" /> : null}
            </div>
        </div>
    )
}

export default MessagesWidget;
