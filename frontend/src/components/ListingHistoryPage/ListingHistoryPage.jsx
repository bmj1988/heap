import { useDispatch, useSelector } from "react-redux"
import { listingHistoryArray, thunkAgentListingHistory, thunkListingHistory } from "../../redux/listing"
import { useEffect } from "react"
import LineListingDiv from "../Main/Vendor/Listings/History/LineListingDiv"
import './history.css'
const ListingHistoryPage = () => {
    const user = useSelector((state) => state.session.user)
    const listingHistory = useSelector(listingHistoryArray)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.vender) dispatch(thunkListingHistory())
        else if (user.agent) dispatch(thunkAgentListingHistory())
    }, [dispatch, user])
    return (
        <div className="lhp textmark">
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
