import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import LineListingDiv from "./LineListingDiv";
import { listingHistoryArray, thunkListingHistory } from "../../../../../redux/listing";

const ListingHistoryWidget = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkListingHistory())
    }, [dispatch])

    const history = useSelector(listingHistoryArray)

    return (
        <div className="lhwMain textmark">
            {history && history.map((oldListing) => {
                return <LineListingDiv listing={oldListing} key={oldListing.id} />
            })}
        </div>
    )
}
export default ListingHistoryWidget
