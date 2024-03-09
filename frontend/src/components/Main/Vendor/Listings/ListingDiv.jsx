import { useNavigate } from "react-router-dom"
import '../../main.css'

const ListingDiv = ({ listing }) => {
    const navigate = useNavigate();

    const clicker = (e) => {
        e.preventDefault();
        navigate(`/listings/${listing.id}`)
    }

    const dateListed = new Date(listing.createdAt).toLocaleDateString()

    return (
        <div className="listingDiv textmark" >
            <fieldset onClick={(e) => clicker(e)}>
                <legend>{`no.${listing.id}`}</legend>
                {/* {listing.image ? <img src={listing.image} className="listingDivImg" alt="Listing Image" /> : null} */}
                <div className="listingSection">
                    <div className='pDiv'>
                        <p className="listingP boldFont">Date listed:</p><p className='listingP'>{dateListed} </p>
                    </div>
                    <div className='pDiv'>
                        <p className="listingP boldFont">Description:</p><p className='listingP'> {listing.description}</p>
                    </div>
                    <div className='pDiv'>
                        <p className="listingP boldFont">Asking price:</p><p className='listingP'> {listing.price}</p>
                    </div>
                    <div className='pDiv'>
                        <p className="listingP boldFont">Highest bid: </p><p className='listingP'>{listing.highest ? `$${listing.highest}` : 'No bids yet'}</p>
                    </div>

                </div>
            </fieldset>
        </div>
    )
}

export default ListingDiv
