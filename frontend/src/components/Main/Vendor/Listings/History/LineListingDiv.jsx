import '../../../main.css'

const LineListingDiv = ({ listing }) => {
    const listedDate = new Date(listing.createdAt)
    const soldDate = new Date(listing.updatedAt)

    return (
        <div className={'lldMain textmark'} onClick={() => goToListing()}>
            <p className="">{`Listed: ${listedDate}`}</p>
            <p className="">{`Sold: ${soldDate}`}</p>
            <p className="" >{`Winning bid: ${listing.highest || 'Unrecorded'}`}</p>
        </div>
    )
}

export default LineListingDiv
