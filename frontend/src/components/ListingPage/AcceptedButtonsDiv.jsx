import { FaCheckSquare, FaUndoAlt } from "react-icons/fa"

const AcceptedButtonsDiv = ({ bid }) => {
    const revokeAllowed = (new Date() - new Date(bid.acceptedOn)) / 1000 / 60 / 60 > 2

    return (
        <div className="eldButtonGroup">
            <div className={revokeAllowed ? "eldSeparateButtons tooltipDiv": "eldSeparateButtons notAllowed tooltipDiv"} disabled={!revokeAllowed} onClick={(e) => revokeBid(e)}>
                <FaUndoAlt className={revokeAllowed ? "iconRevoke" : "grayedOut"} />
                <span className="tooltipText">{revokeAllowed ? "Revoke this bid to accept another offer" : "You cannot revoke less than 2 hours after accepting a bid" }</span>
            </div>
            <div className="eldSeparateButtons tooltipDiv" onClick={(e) => closeListing(e)}>
                <FaCheckSquare className={"eldAccept"} />
                <span className="tooltipText">Mark this listing as sold</span>
            </div>
        </div>
    )
}

export default AcceptedButtonsDiv;
