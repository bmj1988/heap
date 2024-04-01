import { useState, useEffect } from "react"
import WidgetLabel from "../../NewListing/WidgetLabelInputs"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import '../../../main.css'
import { useDispatch } from "react-redux"
import { thunkEditListingAWS } from "../../../../../redux/listing"
import ListingPageImageDiv from "../../../../ListingPage/Vendor/ListingPageImageDiv"
import NewListingFormImageDiv from "../CreateNewListingPage/ImageDivExperimental"

const EditListingModal = ({ closeModal, listing }) => {
    const dispatch = useDispatch();
    const [previewImages, setPreviewImages] = useState(listing.Images)
    const [originalImages, setOriginalImages] = useState([])
    const [images, setImages] = useState([])
    const [deletedImages, setDeletedImages] = useState([])
    const [address, setAddress] = useState(listing.Shop.address)
    const [city, setCity] = useState(listing.Shop.city)
    const [state, setState] = useState(listing.Shop.state)
    const [price, setPrice] = useState(listing.price)
    const [description, setDescription] = useState(listing.description)

    useEffect(() => {
        const urlsOnly = listing.Images.map((img) => img.url)
        setOriginalImages(urlsOnly)
    }, [listing])

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
            description,
            deletedImages
        }
        console.log(deletedImages)
        try {
            await dispatch(thunkEditListingAWS(listingInfo, images, deletedImages))
            closeModal()
        }
        catch (e) {
            return e
        }
    }

    return (
        <div className="camMain elmMain textmark">
            <header>Edit Listing</header>
            <div style={{ backgroundColor: "white" }}>
                <ListingPageImageDiv images={previewImages} noEnhance={true} />
                <NewListingFormImageDiv images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} deletedImages={deletedImages} setDeletedImages={setDeletedImages} originalImages={originalImages} />
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
