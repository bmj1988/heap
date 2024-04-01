import { useDispatch } from "react-redux";
import AlreadyBid from "../../Main/Agent/Widgets/ListingFeed/AlreadyBid";
import { useState } from "react";
import { thunkPlaceBid } from "../../../redux/agent";
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useModal } from "../../../context/Modal";

const PlaceBidDiv = ({ listingId }) => {
    const dispatch = useDispatch();
    const [offer, setOffer] = useState(0);
    const [comments, setComments] = useState('')
    const [alreadyBid, setAlreadyBid] = useState(false)
    const {setModalContent} = useModal();

    const placeBid = () => {
        const confirm = () => {
            dispatch(thunkPlaceBid(listingId, offer, comments)).then(() => setAlreadyBid(true))
        }
        setModalContent(<BinaryChoiceModal
            topic="Placing bids"
            text="You are about to place a bid on a listing. Once placed, it may be accepted by the vendor and after two hours the vendor may revoke this bid and leave you a negative rating if you do not make arrangements to pick up the items listed. You may delete or edit this bid at any time from the My Bids section before it is accepted."
            confirmFunc={confirm}
        />)
    }

    if (alreadyBid) return (<AlreadyBid />)

    return (
        <div className="alpb textmark">
            <h4>Place a bid</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="bid">Offer: </label>
                <input id="bid" type="number" max={999} min={0} step={20} onChange={(e) => setOffer(e.target.value)} />
            </div>
            <div className="ebmCom">
                <label htmlFor="comments">Comments:</label>
                <textarea id="comments" rows={4} cols={36} placeholder="Let the vendor know any important details" onChange={() => setComments(e.target.value)} />
            </div>
            <button disabled={offer < 1} className={offer < 1 ? "not-allowed" : "cursor-pointer"} onClick={() => placeBid(listingId, offer)} >
                <FaAngleDoubleRight className={offer < 1 ? "grayedOut" : "bcmSubmit"} />
            </button>
        </div>
    )
}

export default PlaceBidDiv;
