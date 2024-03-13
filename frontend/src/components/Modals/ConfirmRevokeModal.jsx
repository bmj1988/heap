import { thunkRevokeBid } from "../../redux/listing";
import BinaryChoiceModal from "./BinaryChoiceModal";

const ConfirmRevokeModal = ({ bidId }) => {

    const confirm = () => {
        dispatch(thunkRevokeBid(bidId))
    }

    return (
        <BinaryChoiceModal confirmFunc={confirm} topic={'Revoke'} text={"You are about to revoke a previously accepted bid! Once the bid is revoked, you may accept another bid, but the agent may still have the address linked to the listing, and will be able to leave a review."} />
    )
}

export default ConfirmRevokeModal;
