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
    const [city, setCity] = useState(null)
    const [state, setState] = useState('MD')
    const [license, setLicense] = useState(null)

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
        else if (type === 'agent') {
            newUser.agent = true
            newUser['city'] = city
            newUser['state'] = state
            newUser['license'] = license
        }

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
                    <input type="email" className="signup" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" className="signup" onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm password</label>
                    <input type="password" className="signup" onChange={(e) => setConfirmPassword(e.target.value)} />
                    {password !== confirmPassword && <p className="errors">The passwords you entered do not match.</p>}
                    <label>Cell number</label>
                    <input type="text" className="signup" onChange={(e) => setPhone(e.target.value)} />
                </fieldset>

                <div style={{ height: '20px' }}></div>
                <fieldset className="accountType">
                    <legend>Account type</legend>
                    <div className="radio">
                        <label htmlFor="ownerChoice">Vendor</label>
                        <input type="radio" value="owner" id="ownerChoice" checked={type === 'owner'} onChange={() => setType('owner')} />
                        <div>
                            <p className="explainerText">Vendor accounts allow you to post listings to Heap and are completely free.</p></div>
                    </div>

                    <div className="radio">
                        <label htmlFor="agentChoice">Agent</label>
                        <input type="radio" value="agent" id="agentChoice" checked={type === 'agent'} onChange={() => setType('agent')} />
                        <div>
                            <p className="explainerText">Agent accounts allow you to see all the listings posted to Heap and require a subscription payment and licensure depending on the state.</p>
                        </div>
                    </div>

                </fieldset>

                {type === 'agent' && <fieldset>
                    <legend>Agent info</legend>
                    <label>City</label>
                    <input type='text' className="signup" onChange={(e) => setCity(e.target.value)} />
                    <label>State</label>
                    <div>
                        <select className="state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value='MD'>MD</option>
                            <option value='DC'>DC</option>
                            <option value='VA'>VA</option>
                        </select>
                    </div>
                    <label>Junk Agent #</label>
                    <input type='text' className="signup" onChange={(e) => setLicense(e.target.value)} />
                </fieldset>}
                <button type="submit" className="signupSubmit textmark" disabled={password !== confirmPassword}>Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;
