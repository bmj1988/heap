import { Link } from "react-router-dom"

const CurrentBid = ({ bid }) => {
    const bidDate = new Date(bid.updatedAt)


    return (
        <tr>
            <td>{`${bidDate.getMonth()}/${bidDate.getDate()}, ${bidDate.getHours() > 12 ? bidDate.getHours() - 12 : bidDate.getHours()}:${bidDate.getMinutes() < 10 ? "0" + bidDate.getMinutes() : bidDate.getMinutes()} ${bidDate.getHours() < 12 ? "AM" : "PM"}`}</td>
            <td>{bid['Listing.price']}</td>
            <td>{bid.offer}</td>
            <td>{`${bid['Listing.Shop.city']}, ${bid['Listing.Shop.state']}`}</td>
            <td><Link to={`/listings/${bid.listingId}`}>{`Listing no. ${bid.listingId}`}</Link></td>
        </tr>
    )
}

export default CurrentBid;
