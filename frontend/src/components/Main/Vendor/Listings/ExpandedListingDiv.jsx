import { FaCheck, FaTimesCircle, FaEdit, FaImage } from "react-icons/fa"
import React, { Suspense, useEffect, useState } from 'react';
import '../../main.css'
import { useModal } from "../../../../context/Modal";
import ConfirmAcceptModal from "./Modals/ConfirmAcceptModal";
import NoBidsModal from "./Modals/NoBidsModal";
import EditListingModal from "./Modals/EditListingModal";
import { useNavigate } from "react-router-dom";
import BinaryChoiceModal from '../../../Modals/BinaryChoiceModal'
import NotAcceptedButtons from '../../../ListingPage/NotAcceptedButtons'

const ExpandedListingDiv = ({ listing }) => {
    const navigate = useNavigate();
    const dateString = new Date(listing.createdAt).toLocaleDateString()
    const bids = listing.Bids
    const accepted = bids?.find((bid) => bid.accepted === true)
    const highest = bids?.find((bid) => bid.offer === listing.highest)
    const [revokeAllowed, setRevokeAllowed] = useState(false)

    useEffect(() => {
        (new Date() - new Date(accepted?.acceptedOn)) / 1000 / 60 / 60 > 2 ? setRevokeAllowed(true) : setRevokeAllowed(false)
    }, [accepted])

    const status = () => {
        if (accepted) {
            return "Bid accepted, awaiting pickup"
        }
        else if (listing.open) return "Open"
        else return "Closed"
    }

    return (
        <div className="eldMain textmark">
            <div className="expandedListingDiv cursor-pointer" onClick={() => navigate(`/listings/${listing.id}`)}>
                <div>
                    {listing.image ? <img className="eldImg" src={listing.image} alt="Picture for listing" /> : <FaImage className="eldImgLogo" />}
                </div>
                <div className="eldDetails">
                    <p className="listingP noMargin"><span className="boldFont">Posted:</span>{dateString}</p>
                    <p className="listingP noMargin"><span className="boldFont">Location:</span>{listing.Shop?.name || listing.Shop?.address}</p>
                    <p className="listingP noMargin"><span className="boldFont">Current bids:</span>{bids?.length}</p>
                    <p className="listingP noMargin"><span className="boldFont">Highest bid:</span>{listing.highest ? `$${listing.highest}` : `No bids yet.`}</p>
                    <p className="listingP noMargin"><span className="boldFont">Description:</span>{listing.description}</p>
                </div>
            </div>
            <Suspense fallback={'Loading...'}>
                {accepted ? <AcceptedBidDiv bid={accepted} revokeAllowed={revokeAllowed} /> : null}
                {!accepted ? <NotAcceptedButtons bid={listing.highest} listing={listing} /> : <AcceptedButtonsDiv bid={accepted} revokeAllowed={revokeAllowed} />}
            </Suspense>
        </div>
    )
}

export default ExpandedListingDiv
