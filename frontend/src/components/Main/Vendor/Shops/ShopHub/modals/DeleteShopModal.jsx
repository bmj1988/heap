import { useDispatch } from 'react-redux';
import '../../../../main.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { thunkShopDelete } from '../../../../../../redux/owner';

const DeleteShopModal = ({ closeModal, shopId, func }) => {
    const dispatch = useDispatch();

    const cancel = (e) => {
        e.preventDefault();
        closeModal()
    }
    const accept = async (e) => {
        e.preventDefault();
        await dispatch(thunkShopDelete(shopId))
        closeModal()
    }
    console.log(shopId, '!!!!!!!!!!!')
    return (
        <div className='esmMain textmark'>
            <h2>Delete shop</h2>
            <p>Are you sure you wish to delete this shop?</p>
            <div className='esmButtonGroup'>
                <FaAngleDoubleLeft className='esmButton cancel' onClick={(e) => cancel(e)} />
                <FaAngleDoubleRight className='esmButton accept' onClick={(e) => accept(e)} />
            </div>
        </div>
    )
}

export default DeleteShopModal;
