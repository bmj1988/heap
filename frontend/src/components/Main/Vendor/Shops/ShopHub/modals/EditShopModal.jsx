import { useState } from "react"
import WidgetLabel from "../../../NewListing/WidgetLabelInputs"
import '../../../../main.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { thunkShopUpdate } from "../../../../../../redux/owner"

const EditShopModal = ({ shop, close, update }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState(shop.address)
    const [city, setCity] = useState(shop.city)
    const [state, setState] = useState(shop.state)
    const [name, setName] = useState(shop.name || '')
    const [phone, setPhone] = useState(shop.phone || '')

    const accept = () => {
        const updatedShop = {
            id: shop.id,
            address,
            city,
            state,
            name,
            phone
        }
        dispatch(thunkShopUpdate(updatedShop)).then(() => update(false)).then(() => close())
    }

    return (
        <div className="esmMain textmark">
            <h2>Edit Shop Info</h2>
            <WidgetLabel labelFor={'name'} labelText={'Name:'} inputFunc={setName} placeholder={name || 'Provide a name (optional)'} />
            <WidgetLabel labelFor={'address'} labelText={'Street Address:'} inputFunc={setAddress} placeholder={address} />
            <WidgetLabel labelFor={'city'} labelText={'City:'} inputFunc={setCity} placeholder={city} />
            <WidgetLabel labelFor={'state'} labelText={'State:'} inputFunc={setState} placeholder={state} />
            <WidgetLabel labelFor={'phone'} labelText={'Phone #:'} inputFunc={setPhone} placeholder={phone} />
            <div className="esmButtonGroup">
                <FaAngleDoubleLeft className="esmButton cancel" onClick={() => close()}/>
                <FaAngleDoubleRight className="esmButton accept" onClick={() => accept()}/>

            </div>
        </div>
    )
}

export default EditShopModal;
