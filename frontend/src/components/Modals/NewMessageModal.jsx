import { useDispatch } from "react-redux"
import { thunkSend } from "../../redux/message";
import { useState } from "react";
import './modal.css'

const NewMessageModal = ({ toId, bidId, close }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('')

    const handleSubmit = async () => {
        const message = {
            toId,
            bidId,
            content
        }
        const response = await dispatch(thunkSend(message))
        if (response.ok) close()
    }

    return (
        <div className="nmmMain textmark">
            <h1>Message</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="nmmForm">
                <textarea rows='8' classname="nmmText" maxLength={750} placeholder="Write your message" autoFocus onChange={(e) => setContent(e.target.value)} />
                <button disabled={content.length < 1}>Send Message</button>
            </form>
        </div >
    )
}

export default NewMessageModal;
