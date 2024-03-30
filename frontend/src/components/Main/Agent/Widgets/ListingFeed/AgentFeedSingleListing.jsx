import { FaImages } from "react-icons/fa";
import ListingDetail from "../../../../ListingPage/ListingDetail"
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlreadyBid from "./AlreadyBid";
import Quickbid from "./Quickbid";
import { useModal } from "../../../../../context/Modal";
import BinaryChoiceModal from '../../../../Modals/BinaryChoiceModal'
import { thunkPlaceBid } from "../../../../../redux/agent";
const AgentFeedSingleListing = ({ listing }) => {
    const dispatch = useDispatch();
    const shop = listing.Shop;
    const images = listing.Images
    const dateOfListing = new Date(listing.createdAt).toLocaleDateString();
    const [alreadyBid, setAlreadyBid] = useState(false)
    const { setModalContent } = useModal();

    const placeBid = (listingId, offer) => {
        const confirm = () => {
            dispatch(thunkPlaceBid(listingId, offer)).then(() => setAlreadyBid(true))
        }
        setModalContent(<BinaryChoiceModal
            topic="Placing bids"
            text="You are about to place a bid on a listing. Once placed, it may be accepted by the vendor and after two hours the vendor may revoke this bid and leave you a negative rating if you do not make arrangements to pick up the items listed. You may delete or edit this bid at any time from the My Bids section before it is accepted."
            confirmFunc={confirm}
        />)

    }

    return (
        <div>
            <fieldset className="afsl">
                <legend>{`no.${listing.id}`}</legend>
                {images.length > 0 ? <div id="pic">
                    <img src={images[0].url} />
                </div> : <FaImages className="afsl-image" />}
                <div id="details" className="asfl-details">
                    <ListingDetail css={"slpDetail"} text={"Listed on:"} value={dateOfListing} />
                    <ListingDetail css={"slpDetail"} text={"Location:"} value={`${shop.city}, ${shop.state}`} />
                    <ListingDetail css={"slpDetail"} text={"Asking Price:"} value={listing.price === 'Best offer' ? listing.price : `$${listing.price}`} />
                    <ListingDetail css={"slpDetail"} text={"Shop rating:"} value={shop.avgRating || "NEW"} />
                    <ListingDetail css={"slpDetail"} text={"Description:"} value={listing.description} />
                </div>
                <div className="breaker-listing"></div>
                <div id="quickbid" className="quickbid">
                    {alreadyBid ? <AlreadyBid /> : <Quickbid listingId={listing.id} placeBid={placeBid} />}
                </div>
            </fieldset>
        </div>
    )
}

export default AgentFeedSingleListing;
