import { FaCheck, FaTimesCircle, FaEdit, FaImage } from "react-icons/fa"
import '../../main.css'
import { useModal } from "../../../../context/Modal";
import ConfirmAcceptModal from "./Modals/ConfirmAcceptModal";
import NoBidsModal from "./Modals/NoBidsModal";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import EditListingModal from "./Modals/EditListingModal";
const ExpandedListingDiv = ({ listing, func }) => {
    const { closeModal, setModalContent } = useModal();
    const dateString = new Date(listing.createdAt).toLocaleDateString()
    const bids = listing.Bids

    const highest = bids?.find((bid) => bid.offer === listing.highest)

    const acceptHighest = () => {
        bids?.length > 0 ? setModalContent(<ConfirmAcceptModal closeModal={closeModal} bid={highest} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func}/>) : setModalContent(<NoBidsModal closeModal={closeModal} />)
    }

    const removeListing = () => {
        setModalContent(<ConfirmDeleteModal closeModal={closeModal} listingId={listing.id} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func} />)
    }

    const editListing = () => {
        setModalContent(<EditListingModal listing={listing} closeModal={closeModal} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func}/>)
    }

    return (
        <div className="eldMain textmark">
            <div className="expandedListingDiv">
                <div>
                    {listing.img ? <img className="eldImg" src={listing.image} alt="Picture for listing" /> : <FaImage className="eldImg" />}
                </div>
                <div className="eldDetails">
                    <p className="listingP noMargin"><span className="boldFont">Posted:</span>{dateString}</p>
                    <p className="listingP noMargin"><span className="boldFont">Location:</span>{listing.Shop?.name || listing.Shop?.address}</p>
                    <p className="listingP noMargin"><span className="boldFont">Current bids:</span>{bids?.length}</p>
                    <p className="listingP noMargin"><span className="boldFont">Highest bid:</span>{listing.highest ? `$${listing.highest}` : `No bids yet.`}</p>
                    <p className="listingP noMargin"><span className="boldFont">Description:</span>{listing.description}</p>
                </div>
            </div>
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
                    <p className={bids?.length > 0 ? "eldButtonText" : "eldButtonText grayedIcon"}>Accept Highest</p>
                    <FaCheck className={bids?.length > 0 ? "eldAccept" : "eldAccept grayedIcon"} />
                </div>
            </div>
        </div>
    )
}

export default ExpandedListingDiv
