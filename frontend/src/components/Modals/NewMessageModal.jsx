import { useDispatch } from "react-redux"
import { thunkSend } from "../../redux/message";
import { useState } from "react";
import './modal.css'
import { FaEnvelope } from "react-icons/fa";

const NewMessageModal = ({ toId, bidId, close }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            toId,
            bidId,
            content
        }
        const response = await dispatch(thunkSend(message))
        if (response.errors) {
            setErrors(response.errors)
        }
        else {
            close()
        }
    }

    return (
        <div className="nmmMain textmark">
            <h1>Message</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="nmmForm">
                {Object.values(errors).length ? <p className="errors">{errors}</p> : null}
                <textarea rows='8' className="nmmText" maxLength={750} placeholder="Write your message" autoFocus onChange={(e) => setContent(e.target.value)} />
                <button disabled={content.length < 1}><FaEnvelope className="bcmSubmit" /></button>
            </form>
        </div >
    )
}

export default NewMessageModal;
