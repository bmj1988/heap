import ListingDetail from '../ListingDetail';
import '../listing.css'

const AgentListingDetailsDiv = ({ bid }) => {
    const listing = bid.Listing
    const shop = listing?.Shop;

    return (
        <div className="slpDetails">
            {shop.phone ? <ListingDetail css={"slpDetail"} text={"Phone:"} value={dateListed} /> : null}
            <ListingDetail css={"slpDetail"} text={"Location: "} value={`${shop?.address}`} />
            <ListingDetail css={"slpDetail"} text={"Highest bid: "} value={listing.highest ? "$" + listing.highest : "No bids yet"} />
            <ListingDetail css={"slpDetail"} text={"Description:"} value={listing.description} />
        </div>
    )
}

export default AgentListingDetailsDiv;
