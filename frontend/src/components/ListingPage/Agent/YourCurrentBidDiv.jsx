import { FaEdit, FaUndoAlt } from "react-icons/fa";
import { useModal } from "../../../context/Modal";
import BinaryChoiceModal from "../../Modals/BinaryChoiceModal";
import EditBid from "./EditBid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkDeleteBid, thunkEditBid } from "../../../redux/agent";

const YourCurrentBidDiv = ({ bid }) => {
    const date = new Date(bid.updatedAt)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, closeModal } = useModal();

    const deleteBid = () => {
        const confirm = async () => await dispatch(thunkDeleteBid(bid.id)).then(() => navigate('/'))
        setModalContent(<BinaryChoiceModal
            topic={'Delete bid'}
            text={'You are about to delete a bid. After deleting your bid the listing may appear in your feed again, however until you bid again you will not have a chance to win this listing. If you wish to edit your bid, please go back and choose Edit Bid.'}
            confirmFunc={confirm}
        />)
    }

    const editBid = () => {
        const confirm = async (details) => await dispatch(thunkEditBid(details)).then(() => closeModal())
        setModalContent(<EditBid bid={bid} confirm={confirm} close={closeModal} />)
    }

    return (
        <div className="yourCurrent">
            {`Your bid of $${bid.offer} was posted on ${date.getMonth()}/${date.getDate()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} ${date.getHours() < 12 ? "AM" : "PM"}`}
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '35px', marginTop: '10px' }}>
                <FaEdit className="heapPurple cursor-pointer" onClick={() => editBid()} />
                <FaUndoAlt style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteBid()} />
            </div>
        </div>
    )
}

export default YourCurrentBidDiv;
