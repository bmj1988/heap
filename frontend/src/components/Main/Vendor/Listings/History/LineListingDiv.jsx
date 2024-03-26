import '../../../main.css'

const LineListingDiv = ({ listing }) => {
    const listedDate = new Date(listing.listedOn).toLocaleDateString()
    const soldDate = new Date(listing.createdAt).toLocaleDateString()

    return (
        <div className={'lldMain textmark'} onClick={() => goToListing()}>
            <p className="">{`Listed: ${listedDate}`}</p>
            <p className="">{`Sold: ${soldDate}`}</p>
            <p className="end" >{`Winning bid: ${listing.winningBid ? '$' + listing.winningBid : 'Unrecorded'}`}</p>
        </div>
    )
}

export default LineListingDiv
