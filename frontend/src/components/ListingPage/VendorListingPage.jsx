import React, { Suspense } from 'react';
import { FaImage, FaEdit, FaTimesCircle, FaCheck } from 'react-icons/fa'
import { useModal } from '../../context/Modal';
import ConfirmAcceptModal from '../Main/Vendor/Listings/Modals/ConfirmAcceptModal';
import ConfirmDeleteModal from '../Main/Vendor/Listings/Modals/ConfirmDeleteModal';
import EditListingModal from '../Main/Vendor/Listings/Modals/EditListingModal';
import NoBidsModal from '../Main/Vendor/Listings/Modals/NoBidsModal';
const BidDiv = React.lazy(() => import("./BidDiv"))

const VendorListingPage = ({ listing, func }) => {

    const shop = listing?.Shop;
    const { closeModal, setModalContent } = useModal();
    const dateListed = new Date(listing.createdAt).toLocaleDateString()
    const bids = listing.Bids

    const highest = bids?.find((bid) => bid.offer === listing.highest)

    const acceptHighest = () => {
        bids?.length > 0 ? setModalContent(<ConfirmAcceptModal closeModal={closeModal} bid={highest} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func} />) : setModalContent(<NoBidsModal closeModal={closeModal} />)
    }

    const removeListing = () => {
        setModalContent(<ConfirmDeleteModal closeModal={closeModal} listingId={listing.id} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func} />)
    }

    const editListing = () => {
        setModalContent(<EditListingModal listing={listing} closeModal={closeModal} confirmIcon={<FaCheck className="eldAccept" />} cancelIcon={<FaTimesCircle className="eldDelete" />} func={func} />)
    }




    return (
        <div className="slpMain textmark">
            <h2>{`Listing no.${listing.id}`}</h2>
            <div className="elmPic">
                {listing.image ? <img src={listing.image} className="eldImg" alt={'Current image'} /> : <FaImage className="defaultImg" />}
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Listed on: </p> <p>{dateListed}</p>
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Asking price: </p> <p>{`$${listing.price}`}</p>
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Current bids: </p> <p>{`${bids.length}`}</p>
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Location: </p> <p>{`${shop.address}`}</p>
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Highest bid: </p> <p>{listing.highest ? "$" + listing.highest : "No bids yet"}</p>
            </div>
            <div className="slpDesc">
                <p className='boldFont'>Description:</p> <p>{listing.description}</p>
            </div>

            <Suspense fallback={'Loading bids...'}>
                {bids.length > 0 ? <BidDiv bids={bids} /> : null}
            </Suspense>

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
                    <p className={bids?.length > 0 ? "eldButtonText" : "eldButtonText grayedIcon"}>Accept Highest Bid</p>
                    <FaCheck className={bids?.length > 0 ? "eldAccept" : "eldAccept grayedIcon"} />
                </div>
            </div>
        </div >
    )
}

export default VendorListingPage;
