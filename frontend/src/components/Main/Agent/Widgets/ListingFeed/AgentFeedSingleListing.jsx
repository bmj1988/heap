import ListingDetail from "../../../../ListingPage/ListingDetail"

const AgentFeedSingleListing = ({ listing }) => {

    const shop = listing.Shop;
    const images = listing.Images
    const dateOfListing = new Date(listing.createdAt).toLocaleDateString();


    return (
        <div className="afsl">
            {images ? <div id="pic">
                <img src={images[0]} />
            </div> : null}
            <div id="details">
                <ListingDetail css={"slpDetail"} text={"Listed on:"} value={dateOfListing} />
                <ListingDetail css={"slpDetail"} text={"Location:"} value={`${shop.city}, ${shop.state}`} />
                <ListingDetail css={"slpDetail"} text={"Asking Price:"} value={listing.price} />
                <ListingDetail css={"slpDetail"} text={"Shop rating:"} value={shop.avgRating} />
                <ListingDetail css={"slpDetail"} text={"Description:"} value={listing.description} />
            </div>
            <div id="quickbid">

            </div>
        </div>
    )
}

export default AgentFeedSingleListing;
