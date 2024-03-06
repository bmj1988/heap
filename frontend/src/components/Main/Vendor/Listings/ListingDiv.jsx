// import { useNavigate } from "react-router-dom"
import '../../main.css'

const ListingDiv = ({ listing }) => {
    // const navigate = useNavigate();

    // const clicker = () => {
    //     navigate(`/listings/${listing.id}`)
    // }
    const dateListed = new Date(listing.createdAt).toLocaleDateString()

    return (
        <div className="listingDiv textmark">
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
                    <p className="listingP boldFont">Highest bid: </p><p className='listingP'>{listing.highest ? listing.highest : 'No bids yet'}</p>
                </div>
            </div>
        </div>
    )
}

export default ListingDiv
