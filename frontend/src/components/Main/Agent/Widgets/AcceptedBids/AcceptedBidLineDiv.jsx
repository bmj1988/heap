import { FaCommentDollar, FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useModal } from '../../../../../context/Modal'
import BinaryChoiceModal from '../../../../Modals/BinaryChoiceModal';
import AgentListingDetailsDiv from '../../../../ListingPage/Agent/AgentListingDetails';
import MessageHistoryModal from '../../../../Modals/MessageHistory';

const AcceptedBidDiv = ({ bid }) => {
    const { setModalContent, closeModal } = useModal();
    const acceptedOn = new Date(bid.acceptedOn).toLocaleDateString()
    const address = `${bid.Listing.Shop.address}, ${bid.Listing.Shop.city}, ${bid.Listing.Shop.state}`

    const contact = () => {
        setModalContent(<BinaryChoiceModal
            noCancel={true}
            component={<AgentListingDetailsDiv bid={bid} />}
        />)
    }

    const message = () => {
        setModalContent(<MessageHistoryModal bidId={bid.id} toId={bid.Listing.ownerId} close={closeModal} />)
    }

    return (
        <div className={'abwd textmark'}>
            <fieldset>
                <legend>{`no.${bid.id}`}</legend>

                <p className=""><span className='boldFont'>Accepted on:</span>{` ${acceptedOn}`}</p>
                <p className=""><span className='boldFont'>Offer:</span>{` $${bid.offer}`}</p>
                <p className="addressWrap" ><span className='boldFont'>Address: </span>{` ${address}`}</p>
                <div className='abwd-link-div'>
                    <div className='abwd-contact-info'>
                        <Link to={`/listings/${bid.Listing.id}`}>Link to listing</Link>
                    </div>
                    <FaCommentDollar className='eldAccept messageIcon abwd-message' onClick={() => message()} />
                </div>
            </fieldset>
        </div>
    )
}

export default AcceptedBidDiv;
