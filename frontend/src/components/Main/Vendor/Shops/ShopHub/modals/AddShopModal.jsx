import { useState } from "react"
import WidgetLabel from "../../../NewListing/WidgetLabelInputs"
import '../../../../main.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { thunkShopCreate} from "../../../../../../redux/owner"

const AddShopModal = ({close, update}) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const accept = () => {
        const newShop = {
            address,
            city,
            state,
            name,
            phone
        }
        dispatch(thunkShopCreate(newShop)).then(() => update(false)).then(() => close())
    }

    return (
        <div className="esmMain textmark">
            <h2>Shop Info</h2>
            <WidgetLabel labelFor={'name'} labelText={'Name:'} inputFunc={setName} placeholder={'Provide a name (optional)'} />
            <WidgetLabel labelFor={'address'} labelText={'Street Address:'} inputFunc={setAddress} placeholder={'Street address'} />
            <WidgetLabel labelFor={'city'} labelText={'City:'} inputFunc={setCity} placeholder={'City'} />
            <WidgetLabel labelFor={'state'} labelText={'State:'} inputFunc={setState} placeholder={"State"} />
            <WidgetLabel labelFor={'phone'} labelText={'Phone #:'} inputFunc={setPhone} placeholder={"Phone number (optional)"} />
            <div className="esmButtonGroup">
                <FaAngleDoubleLeft className="esmButton cancel" onClick={() => close()}/>
                <FaAngleDoubleRight className={address.length && city.length && state.length ? "esmButton accept" : "esmButton grayedOut"} onClick={address.length && city.length && state.length ? () => accept() : null}/>

            </div>
        </div>
    )
}

export default AddShopModal;
