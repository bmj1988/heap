import { useState } from "react"
import WidgetLabel from "../../NewListing/WidgetLabelInputs"
import { FaImage } from "react-icons/fa"
import '../../../main.css'
import { thunkEditListing } from "../../../../../redux/owner"
import { useDispatch } from "react-redux"

const EditListingModal = ({ listing, closeModal, confirmIcon, cancelIcon, func }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(listing.image)
    const [address, setAddress] = useState(listing.Shop.address)
    const [city, setCity] = useState(listing.Shop.city)
    const [state, setState] = useState(listing.Shop.state)
    const [price, setPrice] = useState(listing.price)
    const [description, setDescription] = useState(listing.description)

    const cancel = (e) => {
        e.preventDefault();
        closeModal()
    }
    const accept = (e) => {
        e.preventDefault();
        const listingInfo = {
            id: listing.id,
            image,
            address,
            city,
            state,
            price,
            description
        }
        console.log(listingInfo)
        try {
            dispatch(thunkEditListing(listingInfo))
            func(false)
            closeModal()
        }
        catch (e) {
            return e
        }
    }


    return (
        <div className="camMain elmMain textmark">
            <header>Edit Listing</header>
            <div className="elmPic">
                {image ? <img src={image} className="eldImg" alt={'Current image'} /> : <FaImage className="eldImg" />}
            </div>
            <WidgetLabel labelText={'Image'} labelFor={'image'} inputFunc={setImage} placeholder={image} />
            <WidgetLabel labelText={'Price'} labelFor={'price'} inputFunc={setPrice} placeholder={price} />

            <WidgetLabel labelText={'Address'} labelFor={'address'} inputFunc={setAddress} placeholder={address} />
            <WidgetLabel labelText={'City'} labelFor={'city'} inputFunc={setCity} placeholder={city} />
            <WidgetLabel labelText={'State'} labelFor={'state'} inputFunc={setState} placeholder={state} />
            <div className="elmDesc">
                <label className="listingP boldFont" htmlFor="description">{"Description (optional):"} </label> <textarea placeholder={description} style={{ resize: 'none' }} cols={40} rows={5} id="description" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='eldButtonGroup'>
                <div className='eldSeparateButtons' onClick={(e) => cancel(e)}>
                    <p className='eldButtonText'>Cancel</p>
                    {cancelIcon}
                </div>
                <div className='eldSeparateButtons' onClick={(e) => accept(e)}>
                    <p className='eldButtonText'>Confirm Edit</p>
                    {confirmIcon}
                </div>
            </div>
        </div>
    )
}

export default EditListingModal;
