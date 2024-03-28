import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FeedDisplay from "./FeedDisplay"
import { agentFeedArray, thunkGetAgentListings } from "../../../../../redux/agent"

const AgentListingsFeed = () => {
    const dispatch = useDispatch();
    const agentFeed = useSelector(agentFeedArray)
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(thunkGetAgentListings(page))
    }, [page])

    return (
        <div className="alfMain">
            <FeedDisplay listings={agentFeed} />
        </div>
    )
}

export default AgentListingsFeed;
