import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { currentBidsArray, thunkCurrentBids } from "../../redux/agent";
import CurrentBid from "./CurrentBid";
import './current.css'
import { useNavigate } from "react-router-dom";

const CurrentBids = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!user.agent) navigate('/')
    }, [user, navigate])

    useEffect(() => {
        const asyncDispatch = async () => dispatch(thunkCurrentBids())
        asyncDispatch();
    }, [])
    const currentBids = useSelector(currentBidsArray)

    return (
        <div className="acbm textmark">
            <table rules="all">
                <caption>
                    Current Bids
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Bid placed</th>
                        <th scope="col">Asking price</th>
                        <th scope="col">Offer</th>
                        <th scope="col">Location</th>
                        <th scope="col">Listing info</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBids.map((bid) => {
                        return <CurrentBid bid={bid} key={bid.id} />
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" colSpan="4">Open bids</th>
                        <td>{currentBids.length}</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
export default CurrentBids;
