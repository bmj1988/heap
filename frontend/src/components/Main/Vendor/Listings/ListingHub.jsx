import { useDispatch, useSelector } from "react-redux"
import { listingsArray, thunkLoadListings } from "../../../../redux/owner"
import { useEffect } from "react";
import ExpandedListingDiv from "./ExpandedListingDiv";
import { useNavigate } from "react-router-dom";

const ListingHub = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listings = useSelector(listingsArray)

    useEffect(() => {
        dispatch(thunkLoadListings())
    }, [dispatch])

    const toNewListingForm = () => {
        navigate('/listings/new')
    }

    return (
        <div className="textmark">
            <h1>Your open listings</h1>
            {listings.length > 0 ? listings.map((listing) => {
                return (
                    <ExpandedListingDiv listing={listing} key={listing.id} />
                )
            }) : <h2>You currently have no open listings. <span className="linkDupeSpan" onClick={(e) => toNewListingForm(e)}>Create a listing now.</span></h2>}
        </div>
    )
}

export default ListingHub
