import { FaEllipsisV } from 'react-icons/fa';
import '../../../main.css'
import { useEffect, useRef, useState } from 'react';
import { useModal } from '../../../../../context/Modal';
import EditShopModal from './modals/EditShopModal';
import DeleteShopModal from './modals/DeleteShopModal';

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

    const edit = (e) => {
        setModalContent(<EditShopModal shop={shop} close={closeModal} update={storeUpdateFunc} />)
        setShowMenu(!showMenu)
    }

    const deleteShop =  (e) => {
        setModalContent(<DeleteShopModal closeModal={closeModal} shopId={shop.id} func={storeUpdateFunc}/>)
    }

    return (
        <div className="sscMain textmark">
            <h1>{shop.name ? shop.name : shop.address}</h1>
            <section>
                <div className="sccDetails">
                    <p className="listingP noMargin"><span className="boldFont">Address:</span>{`${shop.address}, ${shop.city}, ${shop.state}`}</p>
                    <p className="listingP noMargin"><span className="boldFont">Phone #:</span>{shop.phone ? shop.phone : "No number listed."}</p>
                    <p className="listingP noMargin"><span className="boldFont">Current Listings:</span>{shop.Listings?.length}</p>
                </div>
                <FaEllipsisV className='sccIcon' onClick={toggleMenu} />
            </section>
            <div className='sscMenuContainer'>
                {showMenu && (
                    <div className='shopMenu-dropdown' ref={shopMenuRef}>
                        <div className="profileOptions" onClick={(e) => edit(e)}>
                            {`Edit shop information`}
                        </div>
                        <div className="profileOptions" onClick={(e) => deleteShop(e)}>
                            {`Delete location`}
                        </div>
                        <div className="profileOptions">
                            {`View listings`}
                        </div>
                    </div>
                )}</div>

        </div>
    )
}

export default ShopCube;
