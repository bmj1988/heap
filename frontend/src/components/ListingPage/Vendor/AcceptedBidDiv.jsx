import { FaCommentsDollar, FaUndoAlt, FaUser } from "react-icons/fa";
import MessageHistoryModal from "../../Modals/MessageHistory";
import { useModal } from "../../../context/Modal";
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal";
import { thunkRevokeBid } from "../../../redux/listing";
import { useDispatch } from "react-redux";

const AcceptedBidDiv = ({ bid, revokeAllowed }) => {
    const dispatch = useDispatch();
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
        if (revokeAllowed) {
            const confirm = () => {
                dispatch(thunkRevokeBid(bid.id))
            }
            setModalContent(<BinaryChoiceModal confirmFunc={confirm} topic={'Revoke'} text={"You are about to revoke a previously accepted bid! Once the bid is revoked, you may accept another bid, but the agent may still have the address linked to the listing."} />)
        }
        else return
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
