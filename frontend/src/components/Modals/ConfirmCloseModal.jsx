import { useDispatch } from "react-redux";
import { thunkCloseListing, thunkVendorHome } from "../../redux/owner";
import BinaryChoiceModal from "./BinaryChoiceModal";
import { useNavigate } from 'react-router-dom'

const ConfirmCloseModal = ({ listingId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const confirm = async () => {
        dispatch(thunkCloseListing(listingId)).then(() => navigate('/'))
    }


    return (
        <BinaryChoiceModal confirmFunc={confirm} topic={'Close listing'} text={"This will close the listing, deleting all bids and messages and removing your listing from the listing feed permanently. Only do this if the agent has already picked up your listing. If you wish to revoke the listing and choose another bid, please go back and choose 'Revoke'."} />
    )
}

export default ConfirmCloseModal;
