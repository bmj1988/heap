import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { FaAngleDoubleRight } from "react-icons/fa";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  const loginDemoOwner = async () => {
    await dispatch(
      thunkLogin({
        email: 'demo@user.io',
        password: 'password'
      })
    )

    closeModal();
  }

  const loginDemoAgent = async () => {
    await dispatch(
      thunkLogin({
        email: 'user1@user.io',
        password: 'password'
      })
    )

    closeModal();
  }

  return (
    <div className="lfmMain textmark" >
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="lfmButtonDiv">
        <button type="submit" className="loginButton"><FaAngleDoubleRight className="clpSubmit"/></button>
        </div>
      </form>
      <button onClick={() => loginDemoOwner()}>Log In Demo User: Vendor</button>
      <button onClick={() => loginDemoAgent()}>Log In Demo User: Agent</button>
    </div >
  );
}

export default LoginFormModal;
