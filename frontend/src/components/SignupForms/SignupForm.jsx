import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { thunkSignup } from "../../redux/session"
import './signup.css'

const SignupForm = () => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setPhone] = useState(null)
    const [type, setType] = useState('owner')
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState('MD')
    const [license, setLicense] = useState(null)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (user) navigate('/')
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors({password: "The passwords you entered do not match."})
            return
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            phone,
            profileImg: '',
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

        const response = await dispatch(thunkSignup(newUser))
        if (response) setErrors(response.errors)
        else navigate('/')
    }


    return (
        <div className="textmark">
            <form className="signup" onSubmit={(e) => submit(e)}>
                <h1>Account signup</h1>
                <fieldset>
                    <label>First name</label>
                    {errors.firstName ? <span className="errors"> {errors.firstName} </span> : null}
                    <input type="text" className="signup" onChange={(e) => setFirstName(e.target.value)} />
                    <label>Last name</label>
                    {errors.lastName ? <span className="errors"> {errors.lastName} </span> : null}
                    <input type="text" className="signup" onChange={(e) => setLastName(e.target.value)} />
                    <label>Email address</label>
                    {errors.email ? <span className="errors"> {errors.email} </span> : null}
                    <input type="email" className="signup" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    {errors.password ? <span className="errors"> {errors.password} </span> : null}
                    <input type="password" className="signup" onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm password</label>
                    <input type="password" className="signup" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label>Cell number (optional)</label>
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
                    {errors.city ? <span className="errors"> {errors.city} </span> : null}
                    <input type='text' className="signup" onChange={(e) => setCity(e.target.value)} />
                    <label>State</label>
                    {errors.state ? <span className="errors"> {errors.state} </span> : null}
                    <div>
                        <select className="state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value='MD'>MD</option>
                            <option value='DC'>DC</option>
                            <option value='VA'>VA</option>
                        </select>
                    </div>
                    <label>Agent License #</label>
                    {errors.license ? <span className="errors"> {errors.license} </span> : null}
                    <input type='text' className="signup" onChange={(e) => setLicense(e.target.value)} />
                </fieldset>}
                <button type="submit" className={"signupSubmit textmark"}>Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;
