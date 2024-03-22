import React, { Suspense, useEffect, useState } from 'react';
import AcceptedBidDiv from './AcceptedBidDiv';
import NotAcceptedButtons from './NotAcceptedButtons';
import AcceptedButtonsDiv from './AcceptedButtonsDiv';
import { useSelector } from 'react-redux';
import { bidsArray } from '../../../redux/listing';
import VendorListingDetails from './VendorListingDetails';
import ListingPageImageDiv from './ListingPageImageDiv';
import '../listing.css'

const BidDiv = React.lazy(() => import("./BidDiv"))

const VendorListingPage = ({ listing }) => {
    const bids = useSelector(bidsArray)
    const accepted = bids?.find((bid) => bid.accepted === true)
    const highest = bids?.find((bid) => bid.offer === listing.highest)
    const [revokeAllowed, setRevokeAllowed] = useState(false)

    useEffect(() => {
        (new Date() - new Date(accepted?.acceptedOn)) / 1000 / 60 / 60 > 2 ? setRevokeAllowed(true) : setRevokeAllowed(false)
    }, [accepted])

    return (
        <div className="slpMain textmark">
            <h2>{`Listing no.${listing.id}`}</h2>
            <ListingPageImageDiv images={listing.Images} />
            <VendorListingDetails listing={listing} bids={bids} accepted={accepted} />
            <Suspense fallback={'Loading...'}>
                {accepted ? <AcceptedBidDiv bid={accepted} revokeAllowed={revokeAllowed} /> : null}
                {!accepted && bids.length > 0 ? <BidDiv bids={bids} /> : null}
                {!accepted ? <NotAcceptedButtons bid={highest} listing={listing} /> : <AcceptedButtonsDiv bid={accepted} revokeAllowed={revokeAllowed} />}
            </Suspense>
        </div >
    )
}

export default VendorListingPage;
