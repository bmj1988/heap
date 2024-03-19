import { useState } from "react"
import WidgetLabel from "../../NewListing/WidgetLabelInputs"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import '../../../main.css'
import { useDispatch } from "react-redux"
import { thunkEditListing, thunkEditListingAWS } from "../../../../../redux/listing"
import ListingImageDiv from "./ListingImageDiv"

const EditListingModal = ({ closeModal, listing }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(listing.image)
    const [address, setAddress] = useState(listing.Shop.address)
    const [city, setCity] = useState(listing.Shop.city)
    const [state, setState] = useState(listing.Shop.state)
    const [price, setPrice] = useState(listing.price)
    const [description, setDescription] = useState(listing.description)
    const [imgUrl, setImgUrl] = useState("")

    const cancel = (e) => {
        e.preventDefault();
        closeModal()
    }

    const accept = async (e) => {
        e.preventDefault();
        const listingInfo = {
            id: listing.id,
            address,
            city,
            state,
            price,
            description
        }

        try {
            await dispatch(thunkEditListingAWS(listingInfo, { imgUrl }))
            closeModal()
        }
        catch (e) {
            return e
        }
    }


    return (
        <div className="camMain elmMain textmark">
            <header>Edit Listing</header>
            <div style={{backgroundColor: "white"}}>
                <ListingImageDiv image={image} setImage={setImage} uploadImageUrl={setImgUrl} />
                <WidgetLabel labelText={'Price'} labelFor={'price'} inputFunc={setPrice} defaults={price} />

                <WidgetLabel labelText={'Address'} labelFor={'address'} inputFunc={setAddress} defaults={address} />
                <WidgetLabel labelText={'City'} labelFor={'city'} inputFunc={setCity} defaults={city} />
                <WidgetLabel labelText={'State'} labelFor={'state'} inputFunc={setState} defaults={state} />
                <div className="elmDesc">
                    <label className="listingP boldFont" htmlFor="description">{"Description (optional):"} </label> <textarea defaultValue={description} style={{ resize: 'none' }} cols={40} rows={5} id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="buttonDiv">
                    <button onClick={(e) => cancel(e)}><FaAngleDoubleLeft className="bcmGoBack" /></button>
                    <button onClick={(e) => accept(e)}><FaAngleDoubleRight className="bcmSubmit" /></button>
                </div>
            </div>
        </div>
    )
}

export default EditListingModal;
