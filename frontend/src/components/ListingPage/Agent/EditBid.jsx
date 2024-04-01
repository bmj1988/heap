import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import WidgetLabel from "../../Main/Vendor/NewListing/WidgetLabelInputs"
import { useState } from "react"

const EditBid = ({ bid, confirm, close }) => {
    const [offer, setOffer] = useState(bid.offer)
    const [comments, setComments] = useState(bid.comments || '')

    return (
        <div className="ebm textmark">
            <h2>Edit bid</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="bid">Offer: </label>
                <input id="bid" type="number" max={999} min={0} step={20} defaultValue={offer} onChange={(e) => setOffer(e.target.value)} />
            </div>
            <div className="ebmCom">
                <label htmlFor="comments">Comments: </label>
                <textarea defaultValue={comments} placeholder="(optional)" rows={8} cols={30} onChange={(e) => setComments(e.target.value)} />
            </div>
            <div style={{ display: 'flex' }}>
                <button onClick={() => close()}><FaAngleDoubleLeft className="bcmGoBack" /></button>
                <button onClick={() => confirm({ id: bid.id, offer: offer, comments: comments })}><FaAngleDoubleRight className="bcmSubmit" /></button>
            </div>
        </div>
    )
}

export default EditBid;
