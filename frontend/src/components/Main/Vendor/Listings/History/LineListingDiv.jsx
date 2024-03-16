import '../../../main.css'

const LineListingDiv = ({ listing }) => {
    const listedDate = new Date(listing.createdAt).toLocaleDateString()
    const soldDate = new Date(listing.updatedAt).toLocaleDateString()

    return (
        <div className={'lldMain textmark'} onClick={() => goToListing()}>
            <p className="">{`Listed: ${listedDate}`}</p>
            <p className="">{`Sold: ${soldDate}`}</p>
            <p className="end" >{`Winning bid: ${listing.highest ? '$' + listing.highest : 'Unrecorded'}`}</p>
        </div>
    )
}

export default LineListingDiv
