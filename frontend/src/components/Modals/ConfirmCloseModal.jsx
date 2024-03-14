import BinaryChoiceModal from "./BinaryChoiceModal";
import { useNavigate } from 'react-router-dom'

const ConfirmCloseModal = ({ listingId }) => {
    const navigate = useNavigate();

    const confirm = async () => {
        try {
            const response = await csrfFetch(`/api/listings/${listingId}/close`, {
                method: 'DELETE'
            })
            if (response.ok) {
                navigate('/')
            }
        }
        catch (e) {
            const err = await e.json()
            return err
        }
    }

    return (
        <BinaryChoiceModal confirmFunc={confirm} topic={'Close listing'} text={"This will close the listing, deleting all bids and messages and removing your listing from the listing feed permanently. Only do this if the agent has already picked up your listing. If you wish to revoke the listing and choose another bid, please go back and choose 'Revoke'."} />
    )
}

export default ConfirmCloseModal;
