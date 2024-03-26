import ListingDiv from "../../../Listings/ListingDiv";

const ViewShopListingsModal = ({ listings, name, close }) => {

    return (
        <div className="vslmMain textmark">
            <h3>{`Current listings at ${name}`}</h3>
            <div className="vslmListings">
                {listings.map((listing) => {
                    return <ListingDiv listing={listing} close={close} />
                })}
            </div>
        </div>
    )
}

export default ViewShopListingsModal;
