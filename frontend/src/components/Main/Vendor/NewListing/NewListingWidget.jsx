import { useDispatch, useSelector } from "react-redux"
import { addListing, shopsArray } from "../../../../redux/owner"
import { useState } from "react"
import '../../main.css'
import WidgetLabel from "./WidgetLabelInputs"
import { csrfFetch } from "../../../../redux/csrf"

const NewListingWidget = () => {
    const dispatch = useDispatch();
    const shops = useSelector(shopsArray)
    const [shopId, setShopId] = useState(0)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [image, setImage] = useState('')
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
                image,
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
                image,
            }
        }
        console.log(newListing)
        const response = await csrfFetch('/api/listings/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newListing)
        })
        if (response.ok) {
            const listingToAdd = await response.json()

            await dispatch(addListing(listingToAdd))
            document.getElementById('newListingWidget').reset()
        }
        else {
            const error = await response.json()
            console.log(error)
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
                <WidgetLabel labelText="Image:" labelFor={"image"} inputFunc={setImage} />
                <WidgetLabel labelText={'Price:'} labelFor={'price'} inputFunc={setPrice} />
                <div>
                    <label className="listingP boldFont" htmlFor="description">{"Description (optional):"} </label> <textarea style={{resize: 'none'}} cols={40} rows={5} id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button type="submit">Post listing</button>
            </form>
        </div>
    )
}

export default NewListingWidget;
