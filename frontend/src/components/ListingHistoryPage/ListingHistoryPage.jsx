import { useDispatch, useSelector } from "react-redux"
import { listingHistoryArray, thunkListingHistory } from "../../redux/listing"
import { useEffect } from "react"
import LineListingDiv from "../Main/Vendor/Listings/History/LineListingDiv"
import './history.css'
const ListingHistoryPage = () => {
    const listingHistory = useSelector(listingHistoryArray)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkListingHistory())
    }, [dispatch])
    return (
        <div className="lhp">
            <h2>Listing history</h2>
            {listingHistory.length > 0 && <div className="lhpListings">
                {listingHistory.map((listing) => {
                    return <LineListingDiv key={listing.id} listing={listing} />
                })}
            </div>}
            {!listingHistory.length > 0 && <div>
                <p>{`You have no listings in your history.`}</p>
                </div>}
        </div>
    )
}

export default ListingHistoryPage;
