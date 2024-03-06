import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
      setErrors(serverResponse);
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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>

      </form>
      <button onClick={() => loginDemoOwner()}>Log In Demo User: Owner</button>
      <button onClick={() => loginDemoAgent()}>Log In Demo User: Agent</button>
    </>
  );
}

export default LoginFormModal;
