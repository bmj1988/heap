import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../Spinner";
import './agent.css'
import PurpleOutlineDiv from "../BoxDiv";
import { FaCube, FaIdCard, FaTruck } from "react-icons/fa";
import MessagesWidget from "../Vendor/Messages/MessagesWidget";
import { agentMessagesArray, thunkAgentHome } from "../../../redux/agent";
import AgentListingsFeed from "./Widgets/ListingFeed/AgentListingsFeed";
import AgentProfileWidget from "./Widgets/Profile/AgentProfileWidget";
import AcceptedBidsWidget from "./Widgets/AcceptedBids/AcceptedBidsWidget"

const AgentMain = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkAgentHome()).then(() => setLoaded(true))
    }, [])
    const messages = useSelector(agentMessagesArray)

    if (!loaded) return (<Spinner />)

    return (
        <div className="mpd">
            <PurpleOutlineDiv boldText={'Messages'} smallText={""} logo={<FaCube className='cube heapPurple' />} css={'purpleOutlineDiv colorDiv firstDiv flex-start'} clicker={() => navigate('/messages')} widget={<MessagesWidget messages={messages} />} />
            <AgentListingsFeed />
            <PurpleOutlineDiv boldText={'Accepted Bids'} smallText={""} logo={<FaTruck className='cube heapPurple' />} css={"purpleOutlineDiv colorDiv lastDiv flex-start"} clicker={() => alert('Feature coming soon')} widget={<AcceptedBidsWidget />} />
        </div>
    )
}

export default AgentMain
