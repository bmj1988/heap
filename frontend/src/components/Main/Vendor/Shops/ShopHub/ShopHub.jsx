import { useDispatch, useSelector } from 'react-redux';
import '../../../main.css'
import { useEffect, useState } from 'react';
import { shopsArray, thunkShopHub } from '../../../../../redux/owner';
import ShopCube from './ShopCube';
import Spinner from '../../../../Spinner';

const ShopHub = () => {
    const dispatch = useDispatch();
    const shops = useSelector(shopsArray)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkShopHub()).then(() => setLoaded(true))
    }, [loaded])



    if (!shops) return (<Spinner />)
    return (
        <div className="shpMain">
            {shops.length > 1 && shops.map((shop) => {
                return (<ShopCube shop={shop} key={shop.id} storeUpdateFunc={setLoaded}/>)
            })}
            {shops.length < 1 && <h2>Looks like you have no shops! Create one now.</h2>}
        </div>
    )
}

export default ShopHub;
