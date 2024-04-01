import ListingDetail from "../ListingPage/ListingDetail"

const AgentDetails = ({ agent }) => {

    return (
        <div className="apdd">
            <ListingDetail text={"Location:"} value={`${agent.city}, ${agent.state}`} />
            <ListingDetail text={"Name:"} value={agent.name} />
            <ListingDetail text={"Rating:"} value={agent.avgRating || "NEW"} />
        </div>
    )

}

export default AgentDetails;
