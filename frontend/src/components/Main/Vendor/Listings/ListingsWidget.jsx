import { useSelector } from "react-redux"
import ListingDiv from "./ListingDiv"
import { listingsArray } from "../../../../redux/owner"
import { useEffect, useState } from "react"
import { FaCaretDown } from 'react-icons/fa'


const ListingsWidget = () => {
    const listings = useSelector(listingsArray)
    const [displayed, setDisplayed] = useState(listings.slice(0, 5))
    const [more, setMore] = useState(false)

    useEffect(() => {
        const lastDisplayed = displayed[displayed.length - 1]
        const lastMessage = listings[listings.length - 1]
        if (lastDisplayed === lastMessage) setMore(false)
        else setMore(true)
    }, [displayed, listings])

    const showMore = () => {
        const indexOfLastInDisplayed = listings.indexOf(displayed[displayed.length - 1])
        if (listings.length > indexOfLastInDisplayed + 1) {
            const lastIndex = listings[indexOfLastInDisplayed + 5] ? indexOfLastInDisplayed + 5 : listings.length
            setDisplayed(listings.slice(indexOfLastInDisplayed + 1, lastIndex))
        }
    }

    return (
        <div className="listingWidget">
            {listings.map((listing) => {
                return (<ListingDiv listing={listing} key={listing.id} />)
            })}
            {more && <FaCaretDown onClick={() => showMore()} className="messagesDownArrow" />}
        </div>

    )
}

export default ListingsWidget;
