import { FaImage } from "react-icons/fa"
import { Suspense, useEffect, useState, lazy } from 'react';
import '../../main.css'
import { useNavigate } from "react-router-dom";
import VendorListingDetails from '../../../ListingPage/Vendor/VendorListingDetails'

const NotAcceptedButtons = lazy(() => import('../../../ListingPage/Vendor/NotAcceptedButtons'))
const AcceptedButtonsDiv = lazy(() => import('../../../ListingPage/Vendor/AcceptedButtonsDiv'))

const ExpandedListingDiv = ({ listing }) => {
    const navigate = useNavigate();
    const bids = listing.Bids
    const accepted = bids?.find((bid) => bid.accepted === true)
    const highest = bids?.find((bid) => bid.offer === listing.highest)
    const [revokeAllowed, setRevokeAllowed] = useState(false)

    useEffect(() => {
        (new Date() - new Date(accepted?.acceptedOn)) / 1000 / 60 / 60 > 2 ? setRevokeAllowed(true) : setRevokeAllowed(false)
    }, [accepted])

    return (
        <div className="eldMain textmark">
            <div className="expandedListingDiv cursor-pointer" onClick={() => navigate(`/listings/${listing.id}`)}>
                <div>
                    {(listing.Images && listing.Images.length > 0) ? <img className="eldImg" src={listing.Images[0]['url']} alt="Picture for listing" /> : <FaImage className="eldImgLogo" />}
                </div>
                <VendorListingDetails listing={listing} bids={bids} accepted={accepted} cube={true} />
            </div>
            <Suspense fallback={'Loading...'}>
                {!accepted ? <NotAcceptedButtons bid={highest} listing={listing} /> : <AcceptedButtonsDiv bid={accepted} revokeAllowed={revokeAllowed} />}
            </Suspense>
        </div>
    )
}

export default ExpandedListingDiv
