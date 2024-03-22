import { FaCommentDollar, FaCheck } from "react-icons/fa"
import '../listing.css'
import { useModal } from '../../../context/Modal'
import NewMessageModal from "../../Modals/NewMessageModal"
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal"

const SingleBid = ({ bid }) => {
    const agent = bid.Agent
    const { setModalContent, closeModal } = useModal();

    const message = () => {
        setModalContent(<NewMessageModal close={closeModal} toId={agent.userId} bidId={bid.id} />)
        return
    }

    const accept = () => {
        const confirm = async () => {
            dispatch(thunkAcceptBid(bid.id))
            closeModal()
        }
        setModalContent(<BinaryChoiceModal confirmFunc={confirm} text={`By accepting this bid of ${bid.offer} you will give the agent the location information for the bid and the ability to message you about it. This will also close the listing for all new bids. Make sure to review the agent information before accepting.`} topic={"Accept Bid"}/>)
        return
    }

    return (
        <div className="sbMain textmark">
            <div className="sbDetails">
                <p><span>Bid: </span>{`$${bid.offer}`}</p>
                <p><span>Agent Rating: </span>{agent.avgRating || "No ratings yet"}</p>
                <p className="message"><span>Comments: </span>{bid.message || "No comments"}</p>
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
