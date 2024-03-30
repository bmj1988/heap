import { FaCheckSquare } from "react-icons/fa"

const AlreadyBid = () => {
    return (
        <div className="alreadyBid">
            <h4>Bid submitted!</h4>
            <FaCheckSquare className="accept submitted" />
        </div>
    )
}

export default AlreadyBid;
