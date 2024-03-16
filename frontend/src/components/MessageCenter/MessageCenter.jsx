import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { inboxArray, outboxArray, thunkGetMessages } from "../../redux/message";
import Inbox from "./Inbox";
import './message.css'
import Outbox from "./Outbox";

const MessageCenter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetMessages())
    }, [dispatch])
    const inbox = useSelector(inboxArray)
    const outbox = useSelector(outboxArray)


    return (
        <div>
            <Inbox inbox={inbox} />
            <Outbox outbox={outbox} />
        </div>
    )
}

export default MessageCenter
