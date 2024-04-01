import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import AlreadyBid from "./AlreadyBid";
import Quickbid from "./Quickbid";
import { useModal } from "../../../../../context/Modal";
import BinaryChoiceModal from '../../../../Modals/BinaryChoiceModal'
import { thunkPlaceBid } from "../../../../../redux/agent";
import AgentListingDetails from "./AgentListingDetailsDiv";
import AgentListingImage from "./AgentListingImage";
import PreviewImageModal from "../../../../Modals/PreviewImageModal";
import { useNavigate } from "react-router-dom";

const AgentFeedSingleListing = ({ listing }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alreadyBid, setAlreadyBid] = useState(false)
    const { setModalContent } = useModal();

    const placeBid = useCallback((listingId, offer) => {
        const confirm = () => {
            dispatch(thunkPlaceBid(listingId, offer)).then(() => setAlreadyBid(true))
        }
        setModalContent(<BinaryChoiceModal
            topic="Placing bids"
            text="You are about to place a bid on a listing. Once placed, it may be accepted by the vendor and after two hours the vendor may revoke this bid and leave you a negative rating if you do not make arrangements to pick up the items listed. You may delete or edit this bid at any time from the My Bids section before it is accepted."
            confirmFunc={confirm}
        />)
    }, [dispatch, setModalContent])

    const enlarge = useCallback((image) => {
        setModalContent(<PreviewImageModal pic={image} />)
    })

    return (
        <div>
            <fieldset className="afsl">
                <legend>{`no.${listing.id}`}</legend>
                <AgentListingImage image={listing['Images.url']} enlarge={enlarge} />
                <AgentListingDetails listing={listing} />
                <div className="breaker-listing"></div>
                <div id="quickbid" className="quickbid">
                    {alreadyBid ? <AlreadyBid /> : <Quickbid listingId={listing.id} placeBid={placeBid} />}
                </div>
            </fieldset>
        </div>
    )
}

export default AgentFeedSingleListing;
