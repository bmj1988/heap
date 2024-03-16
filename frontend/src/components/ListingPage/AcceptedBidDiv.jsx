import { FaCommentsDollar, FaUndoAlt, FaUser } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import MessageHistoryModal from "../Modals/MessageHistory";
import ConfirmRevokeModal from "../Modals/ConfirmRevokeModal";

const AcceptedBidDiv = ({ bid, revokeAllowed }) => {
    const agent = bid.Agent;
    const acceptedOn = new Date(bid.acceptedOn)
    const { setModalContent, closeModal } = useModal();

    const message = () => {
        setModalContent(<MessageHistoryModal close={closeModal} bidId={bid.id} toId={agent.userId} />)
        return
    }

    const userProfile = () => {
        // navigate(`/agents/${agent.id}`)
        // setModalContent(<AgentProfilePreview id={agent.id} close={closeModal}/>)
    }

    const revoke = () => {
        revokeAllowed ? setModalContent(<ConfirmRevokeModal bidId={bid.id}/>) : null
    }

    return (
        <div>
            <h3>Accepted Bid: </h3>
            <div className="sbMain textmark">
                <div className="sbDetails">
                <p><span>Agent: </span>{`${agent.name}`}</p>
                    <p><span>Bid: </span>{`$${bid.offer}`}</p>
                    <p><span>Accepted: </span>{`${acceptedOn.getMonth()}/${acceptedOn.getDate()}, ${acceptedOn.getHours()}: ${acceptedOn.getMinutes()}`}</p>
                    <p><span>Agent Rating: </span>{agent.avgRating || "No ratings yet"}</p>
                    <p><span>Comments: </span>{bid.message || "No comments"}</p>
                </div>
                <div className="sbButtonGroup">
                <div className="sbButton tooltipDiv">
                        <FaUser className="eldAccept messageIcon buttonizer" />
                        <span className="tooltipText">Check agent profile</span>
                    </div>
                    <div className="sbButton tooltipDiv" onClick={() => message()}>
                        <FaCommentsDollar className="eldAccept messageIcon buttonizer" />
                        <span className="tooltipText">View message history</span>
                    </div>
                    <div className="sbButton tooltipDiv" onClick={() => revoke()}>
                        <FaUndoAlt className={revokeAllowed ? "iconRevoke" : "grayedOut"} />
                        <span className="tooltipText">{revokeAllowed ? "Revoke bid" : "Cannot revoke bid before 2 hours have passed"}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AcceptedBidDiv;
