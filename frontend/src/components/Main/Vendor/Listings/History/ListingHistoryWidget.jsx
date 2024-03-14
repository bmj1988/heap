import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import LineListingDiv from "./LineListingDiv";

const ListingHistoryWidget = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkListingHistory())
    }, [])

    const history = useSelector(listingHistory)

    return (
        <div>
            {history && history.map((oldListing) => {
                return <LineListingDiv listing={oldListing} />
            })}
        </div>
    )
}
export default ListingHistoryWidget
