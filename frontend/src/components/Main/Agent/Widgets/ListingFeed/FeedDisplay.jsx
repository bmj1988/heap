import AgentFeedSingleListing from "./AgentFeedSingleListing"

const FeedDisplay = ({ listings }) => {

    return (
        <div className="alfFeed">
            {listings.map((listing) => {
                return <AgentFeedSingleListing listing={listing} key={listing.id} />
            })}
        </div>
    )
}

export default FeedDisplay;
