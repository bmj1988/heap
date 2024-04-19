import AgentFeedSingleListing from "./AgentFeedSingleListing"
import '../../agent.css'
import { FaCubes } from "react-icons/fa"

const FeedDisplay = ({ listings }) => {

    return (
        <div className="alfFeed">
            <div className="cld-feed"><FaCubes className="feedcube"/> </div>
            {listings.map((listing) => {
                return <AgentFeedSingleListing listing={listing} key={listing.id} />
            })}
        </div>
    )
}

export default FeedDisplay;
