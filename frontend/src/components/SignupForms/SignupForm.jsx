import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { thunkSignup } from "../../redux/session"
import './signup.css'

const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setPhone] = useState(null)
    const [img, setImg] = useState('')
    const [type, setType] = useState('owner')
    const [confirmPassword, setConfirmPassword] = useState(null)

    const submit = () => {
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            phone,
            profileImg: img,
            owner: null,
            agent: null
        }
        if (type === 'owner') newUser.owner = true
        else if (type === 'agent') newUser.agent = true
        dispatch(thunkSignup(newUser))
        navigate('/')
    }

    return (
        <div className="textmark">
            <form className="signup" onSubmit={() => submit()}>
                <h1>Account signup</h1>
                <fieldset>
                    <label>First name</label>
                    <input type="text" className="signup" onChange={(e) => setFirstName(e.target.value)} />
                    <label>Last name</label>
                    <input type="text" className="signup" onChange={(e) => setLastName(e.target.value)} />
                    <label>Email address</label>
                    <input type="text" className="signup" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="text" className="signup" onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm password</label>
                    <input type="text" className="signup" onChange={(e) => setConfirmPassword(e.target.value)} />
                    {password !== confirmPassword && <p className="errors">The passwords you entered do not match.</p>}
                    <label>Cell number</label>
                    <input type="text" className="signup" onChange={(e) => setPhone(e.target.value)} />
                </fieldset>

                <div style={{ height: '20px' }}></div>
                <fieldset className="accountType">
                    <legend>Account type</legend>
                    <div className="radio">
                        <label>Vendor</label>
                        <input type="radio" value="owner" checked={type === 'owner'} onChange={() => setType('owner')} />
                        <div>
                            <p className="explainerText">Vendor accounts allow you to post listings to Heap and are completely free.</p></div>
                    </div>

                    <div className="radio">
                        <label>Agent</label>
                        <input type="radio" value="agent" checked={type === 'agent'} onChange={() => setType('agent')} />
                        <div>
                            <p className="explainerText">Agent accounts allow you to see all the listings posted to Heap and require a subscription payment and licensure depending on the state.</p>
                        </div>
                    </div>

                </fieldset>
                <button type="submit" className="signupSubmit textmark" disabled={password !== confirmPassword}>Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;
