import { useSelector } from "react-redux"
import AcceptedBidDiv from "./AcceptedBidLineDiv"
import { acceptedBidsArray } from "../../../../../redux/agent"

const AcceptedBidsWidget = () => {
    const acceptedBids = useSelector(acceptedBidsArray)

    return (
        <div>
            {acceptedBids.map((bid) => {
                return (<AcceptedBidDiv bid={bid} key={bid.id} />)
            })}
        </div>
    )
}

export default AcceptedBidsWidget
