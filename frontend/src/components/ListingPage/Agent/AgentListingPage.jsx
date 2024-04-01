import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { bidsArray } from '../../../redux/listing';
import '../listing.css'
import YourCurrentBidDiv from './YourCurrentBidDiv';
import PlaceBidDiv from './AgentListingPagePlaceBidDiv';
import ListingPageImageDiv from '../Vendor/ListingPageImageDiv';

const AcceptedAgentListingDetailsDiv = lazy(() => import('./AgentListingDetails'))
const AgentListingDetails = lazy(() => import('../../Main/Agent/Widgets/ListingFeed/AgentListingDetailsDiv'))

const AgentListingPage = ({ listing, agentId }) => {
    const bids = useSelector(bidsArray)
    const haveBid = bids.find((bid) => bid.agentId === agentId)
    const won = haveBid ? haveBid.accepted : false

    return (
        <div className="slpMain textmark">
            <h2>{`Listing no.${listing.id}`}</h2>
            <ListingPageImageDiv images={listing.Images} />
            <Suspense fallback={'Loading details...'}>
                {won ? <AcceptedAgentListingDetailsDiv listing={listing} /> : <AgentListingDetails listing={listing} page={true} />}
                {haveBid && !won ? <YourCurrentBidDiv bid={haveBid} /> : null }
                {!haveBid ? <PlaceBidDiv listingId={listing.id} /> : null}
            </Suspense>
        </div >
    )
}

export default AgentListingPage;
