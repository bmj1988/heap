import { FaCheckSquare, FaUndoAlt } from "react-icons/fa"
import ConfirmRevokeModal from "../../Modals/ConfirmRevokeModal"
import { useModal } from "../../../context/Modal"
import ConfirmCloseModal from "../../Modals/ConfirmCloseModal";

const AcceptedButtonsDiv = ({ bid, revokeAllowed }) => {
    const { setModalContent } = useModal();

    const revoke = () => {
        revokeAllowed ? setModalContent(<ConfirmRevokeModal bidId={bid.id} />) : null
    }
    const closeListing = () => {
        setModalContent(<ConfirmCloseModal listingId={bid.listingId} />)
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