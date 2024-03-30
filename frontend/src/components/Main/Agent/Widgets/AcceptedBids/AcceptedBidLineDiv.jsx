import { Link } from 'react-router-dom'

const AcceptedBidDiv = ({ bid }) => {
    const acceptedOn = new Date(bid.acceptedOn).toLocaleDateString()
    const address = `${bid.Listing.Shop.address}, ${bid.Listing.Shop.city}, ${bid.Listing.Shop.state}`



    return (
        <div className={'abwd textmark'} onClick={() => goToListing()}>
            <fieldset>
                <legend>{`no.${bid.id}`}</legend>
                <p className="">{`Accepted on: ${acceptedOn}`}</p>
                <p className="">{`Offer: ${bid.offer}`}</p>
                <p className="" >{`Address: ${address}`}</p>
                <Link to={`/listings/${bid.Listing.id}`}>Link to listing</Link>
            </fieldset>
        </div>
    )
}

export default AcceptedBidDiv;
