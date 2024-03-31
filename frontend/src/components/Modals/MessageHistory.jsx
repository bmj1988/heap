import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { repliesByIdArray, thunkGetReplies, thunkSend } from "../../redux/message";
import ModalSingleReply from "./ModalSingleReply";
import './modal.css'
import { FaAngleDoubleLeft, FaEnvelope } from "react-icons/fa";

const MessageHistoryModal = ({ bidId, toId, close }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetReplies(bidId))
    }, [bidId, dispatch])
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({})


    const bid = useSelector((state) => state.message[bidId]?.bid)
    const replies = useSelector(repliesByIdArray)
    const agent = bid?.Agent

    const send = (e) => {
        if (content.length < 1) {
            setErrors({ content: "Did not include a message" })
            return
        }
        e.preventDefault();
        const message = {
            bidId,
            toId,
            content
        }
        dispatch(thunkSend(message))
        setContent('')
        close()
    }

    return (
        <div className="mhmMain">
            {bid && agent && replies && <div className="replyContainer">
                {replies &&
                    replies.map((reply) => {
                        return (<ModalSingleReply message={reply} agent={agent} key={reply.id} />)
                    })
                }
            </div>}
            <textarea rows={5} cols={30} placeholder="Send a message" onChange={(e) => setContent(e.target.value)} />
            {errors.content && <p className="errors">{errors.content}</p>}
            <div>
                <button onClick={() => close()}><FaAngleDoubleLeft className="bcmGoBack" /></button>
                <button onClick={(e) => send(e)}><FaEnvelope className="bcmSubmit" /></button>
            </div>
        </div>
    )
}

export default MessageHistoryModal;
