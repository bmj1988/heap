import { useDispatch } from 'react-redux';
import '../../../main.css'
import { thunkAcceptBid } from '../../../../../redux/listing';

const ConfirmAcceptModal = ({ closeModal, bid, confirmIcon, cancelIcon }) => {
    const dispatch = useDispatch();

    const cancel = (e) => {
        e.preventDefault();
        closeModal()
    }
    const accept = async () => {
        dispatch(thunkAcceptBid(bid.id))
        closeModal()
    }
    return (
        <div className='camMain textmark'>
            <header>Accept Bid</header>
            <p>By accepting this bid of ${bid.offer} you will give the agent the location information for the bid and the ability to message you about it. This will also close the listing for all new bids. Make sure to review the agent information before accepting.</p>
            <div className='eldButtonGroup'>
                <div className='eldSeparateButtons' onClick={(e) => cancel(e)}>
                    <p className='eldButtonText'>Cancel</p>
                    {cancelIcon}
                </div>
                <div className='eldSeparateButtons' onClick={() => accept()}>
                    <p className='eldButtonText'>Accept Bid</p>
                    {confirmIcon}
                </div>
            </div>
        </div>
    )
}

export default ConfirmAcceptModal;
