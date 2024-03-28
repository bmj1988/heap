import { useState } from "react"
import WidgetLabel from "../../../NewListing/WidgetLabelInputs"
import '../../../../main.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { thunkShopCreate } from "../../../../../../redux/owner"

const AddShopModal = ({ close }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState('')


    const accept = async () => {
        const newShop = {
            address,
            city,
            state,
            name,
            phone
        }
        const response = await dispatch(thunkShopCreate(newShop))
        if (response) {
            setErrors(response.errors)
        }
        else {
            close()
        }
    }

    return (
        <div className="esmMain textmark">
            <h2>Shop Info</h2>
            <WidgetLabel labelFor={'name'} labelText={'Name:'} inputFunc={setName} placeholder={'Provide a name (optional)'} />
            {errors.name ? <p className="errors">{errors.name}</p> : null}
            <WidgetLabel labelFor={'address'} labelText={'Street Address:'} inputFunc={setAddress} placeholder={'Street address'} />
            {errors.address ? <p className="errors">{errors.address}</p> : null}
            <WidgetLabel labelFor={'city'} labelText={'City:'} inputFunc={setCity} placeholder={'City'} />
            {errors.city ? <p className="errors">{errors.city}</p> : null}
            <WidgetLabel labelFor={'state'} labelText={'State:'} inputFunc={setState} placeholder={"State"} />
            {errors.state ? <p className="errors">{errors.state}</p> : null}
            <WidgetLabel labelFor={'phone'} labelText={'Phone #:'} inputFunc={setPhone} placeholder={"Phone number (optional)"} />
            {errors.phone ? <p className="errors">{errors.phone}</p> : null}
            <div className="esmButtonGroup">
                <FaAngleDoubleLeft className="esmButton cancel" onClick={() => close()} />
                <FaAngleDoubleRight className={address.length && city.length && state.length ? "esmButton accept" : "esmButton grayedOut"} onClick={address.length && city.length && state.length ? () => accept() : null} />

            </div>
        </div>
    )
}

export default AddShopModal;
