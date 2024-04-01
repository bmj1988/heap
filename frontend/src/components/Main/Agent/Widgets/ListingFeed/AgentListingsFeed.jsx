import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FeedDisplay from "./FeedDisplay"
import { agentFeedArray, thunkGetAgentListings } from "../../../../../redux/agent"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

const AgentListingsFeed = () => {
    const dispatch = useDispatch();
    const agentFeed = useSelector(agentFeedArray)
    const details = useSelector((state) => state.agent.feed.details)
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(5);
    const [less, setLess] = useState(false);
    const [more, setMore] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAgentListings(size, page))
    }, [page, size, dispatch])

    useEffect(() => {
        if (details.count && page && details.count > details.page * details.size) {
            setPage(parseInt(details.page))
            setSize(parseInt(details.size))
            setMore(true)}
        else setMore(false)
    }, [details, setMore])

    useEffect(() => {
        if (page > 1) setLess(true)
        else setLess(false)
    }, [page, setLess])

    return (
        <div className="alfMain textmark">
            {agentFeed.length > 0 ? <FeedDisplay listings={agentFeed} /> : <h2>There are no new listings to display at this time</h2>}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {less && <FaCaretUp className="messagesDownArrow" onClick={() => setPage(page - 1)} />}
                {more && <FaCaretDown className="messagesDownArrow" onClick={() => setPage(page + 1)} />}
            </div>
        </div>
    )
}

export default AgentListingsFeed;
