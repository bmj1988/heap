import ListingDiv from "../../../Listings/ListingDiv";

const ViewShopListingsModal = ({ listings, name }) => {

    return (
        <div className="vslmMain textmark">
            <h3>{`Current listings at ${name}`}</h3>
            <div className="vslmListings">
                {listings.map((listing) => {
                    return <ListingDiv listing={listing} />
                })}
            </div>
        </div>
    )
}

export default ViewShopListingsModal;
