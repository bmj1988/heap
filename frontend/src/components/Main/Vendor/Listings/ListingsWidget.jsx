import ListingDiv from "./ListingDiv"
import { useEffect, useState } from "react"
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useSelector } from "react-redux"
import { listingsArray } from "../../../../redux/owner"


const ListingsWidget = () => {
    const listings = useSelector(listingsArray)
    const [displayed, setDisplayed] = useState(listings.slice(0, 5))
    const [more, setMore] = useState(false)
    const [less, setLess] = useState(false)

    useEffect(() => {
        setDisplayed(listings.slice(0,5))
    }, [listings])

    useEffect(() => {
        const lastDisplayed = displayed[displayed.length - 1]
        const lastListing = listings[listings.length - 1]
        if (!lastDisplayed || !lastListing) setMore(false)
        else if (lastDisplayed.id === lastListing.id) setMore(false)
        else setMore(true)
    }, [displayed, listings])

    useEffect(() => {
        const firstDisplayed = displayed[0]
        const firstListing = listings[0]
        if (!firstDisplayed || !firstListing) setLess(false)
        else if (firstDisplayed.id === firstListing.id) setLess(false)
        else setLess(true)
    }, [displayed, listings])

    const showMore = () => {
        const lastDisplayed = displayed[displayed.length - 1]
        const indexedListing = listings.find((listing) => listing.id === lastDisplayed.id)
        const idx = listings.indexOf(indexedListing)
        const lastIndex = listings[idx + 5] ? idx + 6 : listings.length
        setDisplayed(listings.slice(idx + 1, lastIndex))
    }

    const showLess = () => {
        const indexOfFirstDisplayed = listings.indexOf(displayed[0])
        if (listings[indexOfFirstDisplayed - 5]) setDisplayed(listings.slice(indexOfFirstDisplayed - 5, indexOfFirstDisplayed))
        else setDisplayed(listings.slice(0, 5))
    }

    return (
        <div className="listingWidget">
            {displayed.map((listing) => {
                return (<ListingDiv listing={listing} key={listing.id} />)
            })}

            <div>
                {less ? <FaCaretUp onClick={() => showLess()} className="messagesDownArrow" /> : null}
                {more ? <FaCaretDown onClick={() => showMore()} className="messagesDownArrow" /> : null}
            </div>
        </div>

    )
}

export default ListingsWidget;
