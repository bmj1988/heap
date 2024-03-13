import { FaCheck, FaEdit, FaTimesCircle } from "react-icons/fa";

const NotAcceptedButtons = ({ editListing, removeListing, acceptHighest, bids }) => {

    return (
        <div className="eldButtonGroup">
            <div className="eldSeparateButtons" onClick={(e) => editListing(e)}>
                <p className="eldButtonText">Edit</p>
                <FaEdit className="eldEdit" />
            </div>
            <div className="eldSeparateButtons" onClick={(e) => removeListing(e)}>
                <p className="eldButtonText">Remove</p>
                <FaTimesCircle className="eldDelete" />
            </div>
            <div className="eldSeparateButtons" onClick={(e) => acceptHighest(e)}>
                <p className={bids ? "eldButtonText" : "eldButtonText grayedIcon"}>Accept Highest Bid</p>
                <FaCheck className={bids ? "eldAccept" : "eldAccept grayedIcon"} />
            </div>
        </div>
    )
}

export default NotAcceptedButtons;
