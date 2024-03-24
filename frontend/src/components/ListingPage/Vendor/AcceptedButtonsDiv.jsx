import { FaCheckSquare, FaUndoAlt } from "react-icons/fa"
import { useModal } from "../../../context/Modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkCloseListing } from "../../../redux/owner";
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal";
import { thunkRevokeBid } from "../../../redux/listing";

const AcceptedButtonsDiv = ({ bid, revokeAllowed }) => {
    const { setModalContent } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const revoke = () => {
        if (revokeAllowed) {
            const confirm = () => {
                dispatch(thunkRevokeBid(bid.id))
            }
            setModalContent(<BinaryChoiceModal confirmFunc={confirm} topic={'Revoke'} text={"You are about to revoke a previously accepted bid! Once the bid is revoked, you may accept another bid, but the agent may still have the address linked to the listing."} />)
        }
        else return
    }

    const closeListing = () => {
        const confirm = async () => {
            dispatch(thunkCloseListing(bid.listingId)).then(() => navigate('/'))
        }
        setModalContent(<BinaryChoiceModal confirmFunc={confirm} topic={'Close listing'} text={"This will close the listing, deleting all bids and messages and removing your listing from the listing feed permanently. Only do this if you have concluded business with the agent whose bid you accepted. If you wish to revoke the listing and choose another bid, please go back and choose 'Revoke'."} />)
    }

    return (
        <div className="eldButtonGroup">
            <div className={revokeAllowed ? "eldSeparateButtons tooltipDiv" : "eldSeparateButtons notAllowed tooltipDiv"} disabled={!revokeAllowed} onClick={() => revoke()}>
                <FaUndoAlt className={revokeAllowed ? "iconRevoke" : "grayedOut"} />
                <span className="tooltipText">{revokeAllowed ? "Revoke this bid to accept another offer" : "You cannot revoke less than 2 hours after accepting a bid"}</span>
            </div>
            <div className="eldSeparateButtons tooltipDiv" onClick={() => closeListing()}>
                <FaCheckSquare className={"eldAccept"} />
                <span className="tooltipText">Mark this listing as sold</span>
            </div>
        </div>
    )
}

export default AcceptedButtonsDiv;
