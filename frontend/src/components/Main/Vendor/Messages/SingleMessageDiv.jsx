import { useSelector } from 'react-redux'
import '../../main.css'
import { useModal } from '../../../../context/Modal'
import MessageHistoryModal from '../../../Modals/MessageHistory'


const SingleMessageDiv = ({ message }) => {
    const user = useSelector((state) => state.session.user)
    const { setModalContent, closeModal } = useModal();
    const sender = message.fromId === user.id ? 'To' : 'From'
    const receiverId = sender === 'To' ? message.toId : message.fromId
    const type = user.owner ? 'Agent' : 'Vendor'

    const clicker = () => {
        setModalContent(<MessageHistoryModal bidId={message.bidId} toId={message.toId} close={closeModal} />)
    }

    return (
        <div className="smdMain" onClick={() => clicker()}>
            <div className="listingSection">
                <div className='pDiv'>
                    <p className="listingP boldFont">{sender}:</p><p className='listingP'>{`${type} ${receiverId}`} </p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Sent:</p><p className='listingP'> {new Date(message.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Bid:</p><p className='listingP'> {`no. ${message.bidId}`}</p>
                </div>
                <div className='pDiv'>
                    <p className="listingP boldFont">Message: </p><p className='listingP message'>{message.content}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleMessageDiv;
