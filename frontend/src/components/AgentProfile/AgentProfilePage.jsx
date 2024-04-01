import { useDispatch, useSelector } from "react-redux"
import { thunkAgentProfile } from "../../redux/agent"
import AgentDetails from "./AgentDetails"
import { FaCommentDollar, FaComments, FaImage } from "react-icons/fa"

const AgentProfilePage = ({ agentId }) => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const agentCheck = user.agent
    const ownPage = agentCheck ? user.Agent.id === agentId : false

    useEffect(() => {
        const asyncDispatch = async () => dispatch(thunkAgentProfile(agentId))
        asyncDispatch();
    }, [agentId, dispatch])

    const agent = useSelector((state) => state.agent.profile)

    return (
        <div>
            <div id="agentImage">
                {agent['User.profileImg'] ? <img src={agent['User.profileImg']} className="agentImage" /> : <FaImage className="agentImage" />}
            </div>
            <AgentDetails agent={agent} />
            {!agentCheck ? <div id="contact/review" className="profileContactButtons">
                <FaComments className="heapPurple agentCommentButton" />
                <FaCommentDollar className="heapPurple agentMessageButton" />
            </div> : null}
        </div>
    )
}

return AgentProfilePage;
