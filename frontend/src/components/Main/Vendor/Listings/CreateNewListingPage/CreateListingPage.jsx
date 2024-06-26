import { useEffect, useState } from "react";
import { shopsArray, thunkLoadShops } from "../../../../../redux/owner";
import { useDispatch, useSelector } from "react-redux";
import WidgetLabel from "../../NewListing/WidgetLabelInputs";
import '../../../main.css'
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import LoginFormPage from "../../../../LoginFormPage/LoginFormPage";
import NewListingFormImageDiv from "./ImageDivExperimental";
import { thunkCreateListingAWS } from '../../../../../redux/listing'
import PriceInput from './PriceInput'

const CreateListingPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)
    const shops = useSelector(shopsArray)
    const [shopId, setShopId] = useState(0)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)

    useEffect(() => {
        if (!user.owner) navigate('/')
        else dispatch(thunkLoadShops())
    }, [dispatch, user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newListing;

        if (shopId === 0) {
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
                description
            }
        }

        const response = await dispatch(thunkCreateListingAWS(newListing, images))
        if (response.errors) {
            setErrors(response.errors)
        }
        else {
            navigate(`/listings/${response.id}`)
        }
    }

    if (!user) return (<LoginFormPage />)
    return (

        <div className="clpMain textmark">
            <h1>Create a new listing</h1>
            <form id="clpForm" onSubmit={(e) => handleSubmit(e)}>
                <h4>Set Location:</h4>
                <p className="clpExplain">You can choose any locations you have used for listings in the past, or just choose Set a New Location and provide an address. This address will be saved in your Shops, but you can delete it at any time from the Shop hub.</p>
                <select value={shopId} onChange={(e) => setShopId(e.target.value)}>
                    {shops.map((shop) => {
                        return (<option value={shop.id} key={shop.id}>{shop.name || shop.address}</option>)
                    })}
                    <option value={0}>Set a new location</option>
                </select>
                {shopId == 0 && <div>
                    <WidgetLabel labelText="Address:" labelFor="address" inputFunc={setAddress} placeholder={"Provide a street address"} />
                    <WidgetLabel labelText="City:" labelFor="city" inputFunc={setCity} placeholder={"Provide a city"} />
                    <WidgetLabel labelText="State:" labelFor="state" inputFunc={setState} placeholder={"Provide a state"} />
                </div>}
                <h4>Listing information</h4>
                <p className="clpExplain">Providing an image, asking price and description may help agents give you the bids more accurate bids more quickly. None of these fields are required, but they help your listings sell more quickly.</p>
                <NewListingFormImageDiv create={true} images={images} setImages={setImages} previewImages={previewImages} setPreviewImages={setPreviewImages} />
                <PriceInput setPrice={setPrice} />
                <div className="clpTextarea">
                    <label className="listingP boldFont" htmlFor="description">{"Description (optional):"} </label> <textarea style={{ resize: 'none' }} cols={40} rows={5} maxLength={750} id="description" placeholder="Provide a description of what you want to sell" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="clpButtonDiv">
                    <button type="submit" disabled={!address && shopId == 0}><FaAngleDoubleRight className={!address && shopId == 0 ? "clpSubmit grayedOut" : "clpSubmit"} /></button>
                </div>
            </form>
        </div>
    )

}

export default CreateListingPage;
