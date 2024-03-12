import { useSelector } from "react-redux"
import { messagesArray } from "../../../../redux/owner"
import SingleMessageDiv from "./SingleMessageDiv"

const MessagesWidget = () => {
    const messages = useSelector(messagesArray)

    return (
        <div>
            {messages && messages.map((message) => {
                return (<SingleMessageDiv message={message} key={message.id} />)
            })}
        </div>
    )
}

export default MessagesWidget;
