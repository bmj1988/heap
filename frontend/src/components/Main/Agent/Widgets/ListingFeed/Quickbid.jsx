import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa"

const Quickbid = ({ listingId, placeBid }) => {
    const [offer, setOffer] = useState(0);

    return (
        <div className="qbMain">
            <h4>Quick Bid</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="bid">Bid: </label>
                <input id="bid" type="number" max={999} min={0} step={20} onChange={(e) => setOffer(e.target.value)} />
            </div>
            <button disabled={offer < 1} className={offer < 1 ? "not-allowed" : "cursor-pointer"} onClick={() => placeBid(listingId, offer)} >
                <FaAngleDoubleRight className={offer < 1 ? "grayedOut" : "accept"} />
            </button>
        </div>
    )
}

export default Quickbid;
