import { useDispatch, useSelector } from 'react-redux';
import '../../../main.css'
import { useEffect, useState } from 'react';
import { shopsArray, thunkShopHub } from '../../../../../redux/owner';
import ShopCube from './ShopCube';
import Spinner from '../../../../Spinner';
import { FaPlus } from 'react-icons/fa';
import AddShopModal from './modals/AddShopModal';
import { useModal } from '../../../../../context/Modal';
import { useNavigate } from 'react-router-dom';

const ShopHub = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const navigate = useNavigate();
    const shops = useSelector(shopsArray)
    const { closeModal, setModalContent } = useModal();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!user.owner) navigate('/')
        else dispatch(thunkShopHub()).then(() => setLoaded(true))
    }, [loaded, dispatch, user, navigate])

    const addShop = () => {
        setModalContent(<AddShopModal close={closeModal} />)
    }


    if (!shops) return (<Spinner />)
    return (
        <div className='slightMargin textmark'>
            <h1>Your shops</h1>
            <div className="shpMain">
                {shops.length > 0 && shops.map((shop) => {
                    return (<ShopCube shop={shop} key={shop.id} storeUpdateFunc={setLoaded} />)
                })}
                {shops.length < 1 && <h2>Looks like you have no shops! Create one now.</h2>}
                <div className='sab textmark' onClick={() => addShop()}>
                    <h2>Add a shop</h2>
                    <FaPlus className="sabIcon" />
                </div>
            </div>
        </div>
    )
}

export default ShopHub;
