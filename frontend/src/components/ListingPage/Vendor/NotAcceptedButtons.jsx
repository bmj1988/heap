import { FaCheck, FaEdit, FaTimesCircle } from "react-icons/fa";
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal";
import EditListingModal from "../../Main/Vendor/Listings/Modals/EditListingModal";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkRemoveListing } from "../../../redux/owner";
import { useNavigate } from "react-router-dom";
import { thunkAcceptBid } from "../../../redux/listing";

const NotAcceptedButtons = ({ listing, bid }) => {
    const { closeModal, setModalContent } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const acceptHighest = () => {
        const accept = async () => {
            dispatch(thunkAcceptBid(bid.id))
            closeModal()
        }

        bid ? setModalContent(<BinaryChoiceModal confirmFunc={accept}
            text={`By accepting this bid of ${bid.offer} you will give the agent the location information for the bid and the ability to message you about it. This will also close the listing for all new bids. Make sure to review the agent information before accepting.`}
            topic={"Accept Bid"} />)
            : setModalContent(<BinaryChoiceModal text={"This listing currently has no bids to accept."} topic={"No bids"} noConfirm={true} />)
    }

    const removeListing = () => {
        const accept = () => {
            dispatch(thunkRemoveListing(listing.id))
        }
        setModalContent(<BinaryChoiceModal confirmFunc={accept} text={"Are you sure you wish to delete this listing?"} topic={"Delete listing"} />)
    }

    const editListing = () => {
        setModalContent(<EditListingModal listing={listing} closeModal={closeModal} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} setModal={setModalContent} />)
    }

    return (
        <div className="eldButtonGroup">
            <div className="eldSeparateButtons" onClick={(e) => editListing(e)}>
                <p className="eldButtonText">Edit</p>
                <FaEdit className="eldEdit" />
            </div>
            <div className="eldSeparateButtons" onClick={() => removeListing()}>
                <p className="eldButtonText">Remove</p>
                <FaTimesCircle className="eldDelete" />
            </div>
            <div className="eldSeparateButtons" onClick={(e) => acceptHighest(e)}>
                <p className={bid ? "eldButtonText" : "eldButtonText grayedIcon"}>Accept Highest Bid</p>
                <FaCheck className={bid ? "eldAccept" : "eldAccept grayedIcon"} />
            </div>
        </div>
    )
}

export default NotAcceptedButtons;
