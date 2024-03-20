import ListingDetail from "../ListingDetail";

const VendorListingDetailsDiv = ({ listing, bids, accepted }) => {
    const dateListed = new Date(listing.createdAt).toLocaleDateString()
    const shop = listing?.Shop;
    const status = () => {
        if (accepted) {
            return "Bid accepted, awaiting pickup"
        }
        else if (listing.open) return "Open"
        else return "Closed"
    }
    return (
        <div className="slpDetails">
            <ListingDetail css={"slpDetail"} text={"Listed on:"} value={dateListed} />
            <ListingDetail css={"slpDetail"} text={"Status:"} value={status()} />
            <ListingDetail css={"slpDetail"} text={"Asking price:"} value={`${listing.price}`} />
            <ListingDetail css={"slpDetail"} text={"Current bids: "} value={`${bids.length}`} />
            <ListingDetail css={"slpDetail"} text={"Location: "} value={`${shop.address}`} />
            <ListingDetail css={"slpDetail"} text={"Highest bid: "} value={listing.highest ? "$" + listing.highest : "No bids yet"} />
            <ListingDetail css={"slpDetail"} text={"Description:"} value={listing.description} />
        </div>
    )
}

export default VendorListingDetailsDiv;
