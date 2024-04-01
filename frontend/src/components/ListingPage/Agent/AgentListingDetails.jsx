import ListingDetail from '../ListingDetail';
import '../listing.css'

const AcceptedAgentListingDetailsDiv = ({ listing }) => {
    const shop = listing?.Shop;
    const acceptedOn = new Date(listing.updatedAt).toLocaleDateString()

    return (
        <div className="slpDetails">
            {shop.phone ? <ListingDetail css={"slpDetail"} text={"Phone:"} value={shop.phone} /> : null}
            <ListingDetail css={"slpDetail"} text={"Accepted on:"} value={`${acceptedOn}`} />
            <ListingDetail css={"slpDetail"} text={"Location: "} value={`${shop.address}, ${shop.city}, ${shop.state}`} />
            <ListingDetail css={"slpDetail"} text={"Your bid: "} value={`$${listing.highest}`} />
            <ListingDetail css={"slpDetail slpIndie"} text={"Description:"} value={listing.description} />
        </div>
    )
}

export default AcceptedAgentListingDetailsDiv;
