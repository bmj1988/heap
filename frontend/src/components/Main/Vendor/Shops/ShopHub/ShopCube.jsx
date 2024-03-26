import { FaEllipsisV } from 'react-icons/fa';
import '../../../main.css'
import { useEffect, useRef, useState } from 'react';
import { useModal } from '../../../../../context/Modal';
import EditShopModal from './modals/EditShopModal';
import DeleteShopModal from './modals/DeleteShopModal';
import BinaryChoiceModal from '../../../../Modals/BinaryChoiceModal';
import ListingsWidget from '../../Listings/ListingsWidget';
import ViewShopListingsModal from './modals/ViewListingModal';

const ShopCube = ({ shop, storeUpdateFunc }) => {
    const [showMenu, setShowMenu] = useState(false)
    const shopMenuRef = useRef();
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (shopMenuRef.current && !shopMenuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    const edit = () => {
        setModalContent(<EditShopModal shop={shop} close={closeModal} update={storeUpdateFunc} />)
        setShowMenu(!showMenu)
    }

    const deleteShop = () => {
        setModalContent(<DeleteShopModal closeModal={closeModal} shopId={shop.id} func={storeUpdateFunc} />)
    }

    const viewListings = () => {
        if (shop.Listings && shop.Listings.length > 0) {
            setModalContent(<ViewShopListingsModal listings={shop.Listings} name={shop.name || shop.address} close={closeModal} />)
        }
        else {
            setModalContent(<BinaryChoiceModal topic={"No listings"} text={"You currently have no open listings at this location"} noCancel={true} />)
        }
    }

    return (
        <div className="sscMain textmark">
            <h2>{shop.name ? shop.name : shop.address}</h2>
            <section>
                <div className="sccDetails">
                    <p className="listingP noMargin"><span className="boldFont">Address: </span>{`${shop.address}, ${shop.city}, ${shop.state}`}</p>
                    <p className="listingP noMargin"><span className="boldFont">Phone #: </span>{shop.phone ? shop.phone : "No number listed."}</p>
                    <p className="listingP noMargin"><span className="boldFont">Rating: </span>{shop.avgRating || 'NEW'}</p>
                    <p className="listingP noMargin"><span className="boldFont">Current Listings: </span>{shop.Listings?.length}</p>
                </div>
                <FaEllipsisV className='sccIcon' onClick={toggleMenu} />
            </section>
            <div className='sscMenuContainer'>
                {showMenu && (
                    <div className='shopMenu-dropdown' ref={shopMenuRef}>
                        <div className="profileOptions" onClick={() => edit()}>
                            {`Edit shop details`}
                        </div>
                        <div className="profileOptions" onClick={() => deleteShop()}>
                            {`Delete location`}
                        </div>
                        <div className="profileOptions" onClick={() => viewListings()} >
                            {`View listings`}
                        </div>
                    </div>
                )}</div>

        </div>
    )
}

export default ShopCube;
