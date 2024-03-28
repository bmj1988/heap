import { useState } from "react"
import WidgetLabel from "../../../NewListing/WidgetLabelInputs"
import '../../../../main.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { thunkShopUpdate } from "../../../../../../redux/owner"

const EditShopModal = ({ shop, close }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState(shop.address)
    const [city, setCity] = useState(shop.city)
    const [state, setState] = useState(shop.state)
    const [name, setName] = useState(shop.name || '')
    const [phone, setPhone] = useState(shop.phone || '')
    const [errors, setErrors] = useState({})

    const accept = async () => {
        const updatedShop = {
            id: shop.id,
            address,
            city,
            state,
            name,
            phone
        }
        const response = await dispatch(thunkShopUpdate(updatedShop))
        if (response) {
            setErrors(response.errors)
        }

        else close()
    }

    return (
        <div className="esmMain textmark">
            <h2>Edit Shop Info</h2>
            <WidgetLabel labelFor={'name'} labelText={'Name:'} inputFunc={setName} defaults={name || 'Provide a name (optional)'} />
            {errors.name ? <p className="errors">{errors.name}</p> : null}
            <WidgetLabel labelFor={'address'} labelText={'Street Address:'} inputFunc={setAddress} defaults={address} />
            {errors.address ? <p className="errors">{errors.address}</p> : null}
            <WidgetLabel labelFor={'city'} labelText={'City:'} inputFunc={setCity} defaults={city} />
            {errors.city ? <p className="errors">{errors.city}</p> : null}
            <WidgetLabel labelFor={'state'} labelText={'State:'} inputFunc={setState} defaults={state} />
            {errors.state ? <p className="errors">{errors.state}</p> : null}
            <WidgetLabel labelFor={'phone'} labelText={'Phone #:'} inputFunc={setPhone} defaults={phone} />
            {errors.phone ? <p className="errors">{errors.phone}</p> : null}
            <div className="esmButtonGroup">
                <FaAngleDoubleLeft className="esmButton cancel" onClick={() => close()}/>
                <FaAngleDoubleRight className="esmButton accept" onClick={() => accept()}/>

            </div>
        </div>
    )
}

export default EditShopModal;
