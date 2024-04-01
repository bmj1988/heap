import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
/// I got mostly through pseduo-coding this until I realized I am actually looking to create
/// something different, but this would be good to swap in if I ended up expanding drag & drop
/// div boxes.

const OpenBidsWidget = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkAgentCurrentBids())
    }, [])

    const openBids = useSelector(openBidsArray)

    return (

        <div id="bidList">
            {openBids.map((bid) => {
                <Acc bid={bid} key={bid.id} />
            })}

        </div>
    )
}

export default OpenBidsWidget;
