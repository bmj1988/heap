import { useDispatch, useSelector } from "react-redux"
import { addListing, shopsArray } from "../../../../redux/owner"
import { useState } from "react"
import '../../main.css'
import WidgetLabel from "./WidgetLabelInputs"
import NewListingFormImageDiv from "../Listings/CreateNewListingPage/ImageDivExperimental"
import { thunkCreateListingAWS } from "../../../../redux/listing"
import PriceInput from "../Listings/CreateNewListingPage/PriceInput"

const NewListingWidget = () => {
    const dispatch = useDispatch();
    const shops = useSelector(shopsArray)
    const [shopId, setShopId] = useState(0)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newListing;

        if (shopId == 0) {
            newListing = {
                description,
                price,
                address,
                city,
                state
            }
        }
        else {
            newListing = {
                shopId,
                price,
                description,
            }
        }

        const response = await dispatch(thunkCreateListingAWS(newListing, images))
        if (response.errors) {
            console.log(response)
        }
        else {
            await dispatch(addListing(response))
            document.getElementById('newListingWidget').reset()
        }
    }

    return (

        <div className="newListingMainDiv">
            <form id="newListingWidget" onSubmit={(e) => handleSubmit(e)}>
                <h4>Location</h4>
                <select value={shopId} onChange={(e) => setShopId(e.target.value)}>
                    {shops.map((shop) => {
                        return (<option value={shop.id} key={shop.id}>{shop.name || shop.address}</option>)
                    })}
                    <option value={0}>Set a new location</option>
                </select>
                {shopId == 0 && <div>
                    <WidgetLabel labelText="Address:" labelFor="address" inputFunc={setAddress} />
                    <WidgetLabel labelText="City:" labelFor="city" inputFunc={setCity} />
                    <WidgetLabel labelText="State:" labelFor="state" inputFunc={setState} />
                </div>}
                <h4>Listing information</h4>
                <NewListingFormImageDiv images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} />
                <PriceInput setPrice={setPrice} />
                <div>
                    <label className="listingP boldFont" htmlFor="description">{"Description (optional):"} </label> <textarea style={{ resize: 'none' }} cols={40} rows={5} id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button onClick={(e) => handleSubmit(e)}>Post listing</button>
            </form>
        </div>
    )
}

export default NewListingWidget;
