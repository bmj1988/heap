import { useModal } from "../../context/Modal";
import MessageHistoryModal from "../Modals/MessageHistory";
import './message.css'

const InboxMessageDiv = ({ message }) => {
    const sent = new Date(message.createdAt)
    const { setModalContent, closeModal } = useModal();
    const messageExpand = () => {
        setModalContent(<MessageHistoryModal bidId={message.bidId} toId={message.toId} close={closeModal} />)
    }

    return (
        <div className={'imdMain textmark'} onClick={() => messageExpand()}>
            <p className={message.seen ? "" : "boldFont"}>{`${sent.getMonth()}/${sent.getDate()}, ${sent.getHours() > 12 ? sent.getHours() - 12 : sent.getHours()}:${sent.getMinutes() < 10 ? "0" + sent.getMinutes() : sent.getMinutes()} ${sent.getHours() < 12 ? "AM" : "PM"}`}</p>
            <p className={message.seen ? "" : "boldFont"}>{`Bid no.${message.bidId}`}</p>
            <p className={message.seen ? "messageText" : "messageText boldFont"}>{message.content}</p>
        </div>
    )
}

export default InboxMessageDiv;
