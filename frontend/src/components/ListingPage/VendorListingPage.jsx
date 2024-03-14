import React, { Suspense } from 'react';
import { FaImage, FaEdit, FaTimesCircle, FaCheck, FaCheckSquare } from 'react-icons/fa'
import { useModal } from '../../context/Modal';
import ConfirmAcceptModal from '../Main/Vendor/Listings/Modals/ConfirmAcceptModal';
import ConfirmDeleteModal from '../Main/Vendor/Listings/Modals/ConfirmDeleteModal';
import EditListingModal from '../Main/Vendor/Listings/Modals/EditListingModal';
import NoBidsModal from '../Main/Vendor/Listings/Modals/NoBidsModal';
import AcceptedBidDiv from './AcceptedBidDiv';
import NotAcceptedButtons from './NotAcceptedButtons';
import AcceptedButtonsDiv from './AcceptedButtonsDiv';
import { useSelector } from 'react-redux';
import { bidsArray } from '../../redux/listing';
const BidDiv = React.lazy(() => import("./BidDiv"))

const VendorListingPage = ({ listing, func }) => {

    const shop = listing?.Shop;
    const { closeModal, setModalContent } = useModal();
    const dateListed = new Date(listing.createdAt).toLocaleDateString()
    const bids = useSelector(bidsArray)
    const accepted = bids?.find((bid) => bid.accepted === true)
    const highest = bids?.find((bid) => bid.offer === listing.highest)

    const status = () => {
        if (accepted) {
            return "Bid accepted, awaiting pickup"
        }
        else if (listing.open) return "Open"
        else return "Closed"
    }

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
                <p className='boldFont'>Status: </p> <p>{status()}</p>
            </div>
            <div className='slpDetail'>
                <p className='boldFont'>Asking price: </p> <p>{`${listing.price}`}</p>
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
                {accepted ? <AcceptedBidDiv bid={accepted} /> : null}
                {!accepted  && bids.length > 0 ? <BidDiv bids={bids} /> : null}
                {!accepted ? <NotAcceptedButtons acceptHighest={acceptHighest} removeListing={removeListing} editListing={editListing} bids={bids.length > 0} /> : <AcceptedButtonsDiv bid={accepted} /> }
            </Suspense>
        </div >
    )
}

export default VendorListingPage;
