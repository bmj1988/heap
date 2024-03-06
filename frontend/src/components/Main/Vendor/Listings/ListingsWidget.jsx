import { useSelector } from "react-redux"
import ListingDiv from "./ListingDiv"
import { listingsArray } from "../../../../redux/owner"


const ListingsWidget = () => {
    const listings = useSelector(listingsArray)

    return (
        <div className="listingWidget">
            {listings.map((listing) => {
                return (<ListingDiv listing={listing} key={listing.id}/>)
            })}
        </div>
    )
}

export default ListingsWidget;
