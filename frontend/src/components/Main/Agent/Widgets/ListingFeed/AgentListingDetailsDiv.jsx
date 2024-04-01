import ListingDetail from "../../../../ListingPage/ListingDetail"

const AgentListingDetails = ({ listing, page }) => {
    const dateOfListing = new Date(listing.createdAt).toLocaleDateString();
    return (
        <div id="details" className="asfl-details">
            <ListingDetail css={"slpDetail"} text={"Listed on:"} value={dateOfListing} />
            <ListingDetail css={"slpDetail"} text={"Location:"} value={`${listing["Shop.city"] || listing?.Shop?.city}, ${listing["Shop.state"] || listing.Shop.state}`} />
            <ListingDetail css={"slpDetail"} text={"Asking Price:"} value={listing.price === 'Best offer' ? listing.price : `$${listing.price}`} />
            <ListingDetail css={"slpDetail"} text={"Shop rating:"} value={listing["Shop.avgRating"] || "NEW"} />
            <ListingDetail css={page ? "slpDetail slpIndie" : "slpDetail"} text={"Description:"} value={listing["description"]} />
        </div>
    )
}

export default AgentListingDetails;
