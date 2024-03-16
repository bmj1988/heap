import { FaCommentDollar, FaCheck, FaTimesCircle } from "react-icons/fa"
import './listing.css'
import ConfirmAcceptModal from "../Main/Vendor/Listings/Modals/ConfirmAcceptModal"
import { useModal } from '../../context/Modal'
import NewMessageModal from "../Modals/NewMessageModal"

const SingleBid = ({ bid }) => {
    const agent = bid.Agent
    const { setModalContent, closeModal } = useModal();

    const message = () => {
        setModalContent(<NewMessageModal close={closeModal} toId={agent.userId} bidId={bid.id} />)
        return
    }

    const accept = () => {
        setModalContent(<ConfirmAcceptModal bid={bid} closeModal={closeModal} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} />)
        return
    }

    return (
        <div className="sbMain textmark">
            <div className="sbDetails">
                <p><span>Bid: </span>{`$${bid.offer}`}</p>
                <p><span>Agent Rating: </span>{agent.avgRating || "No ratings yet"}</p>
                <p><span>Comments: </span>{bid.message || "No comments"}</p>
            </div>
            <div className="sbButtonGroup">
                <div className="sbButton" onClick={() => message()}>
                    <FaCommentDollar className="eldAccept messageIcon" />
                </div>
                <div className="sbButton" onClick={() => accept()}>
                    <FaCheck className="eldAccept" />
                </div>
            </div>

        </div>
    )
}

export default SingleBid;
