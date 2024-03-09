import { useDispatch } from 'react-redux';
import '../../../main.css'
import { thunkRemoveListing } from '../../../../../redux/owner';

const ConfirmDeleteModal = ({ closeModal, listingId, confirmIcon, cancelIcon, func }) => {
    const dispatch = useDispatch();

    const cancel = (e) => {
        e.preventDefault();
        closeModal()
    }
    const accept = async (e) => {
        e.preventDefault();
        try {
            dispatch(thunkRemoveListing(listingId))
        }
        catch (e) {
            console.log(e)
        }
        func(false)
        closeModal()
    }

    return (
        <div className='camMain textmark'>
            <header>Delete listing</header>
            <p>Are you sure you wish to delete this listing?</p>
            <div className='eldButtonGroup'>
                <div className='eldSeparateButtons' onClick={(e) => cancel(e)}>
                    <p className='eldButtonText'>Cancel</p>
                    {cancelIcon}
                </div>
                <div className='eldSeparateButtons' onClick={(e) => accept(e)}>
                    <p className='eldButtonText'>Delete Listing</p>
                    {confirmIcon}
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal;
