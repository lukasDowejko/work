import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorPanel, setErrorPanel] = useState(false);

  async function login(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
      };

      await axios
        .post("http://localhost:3000/auth/login", registerData)
        .then((response) => {
          if (response.status === 200) {
            return (window.location.href = "http://localhost:5173/");
          }
        });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errorMessage);
        setErrorPanel(true);
      }
    }
  }
  return (
    <>
    <div className="relative z-10">
      <div className="login rounded-md w-96 max-md:w-8/12 max-md:mt-32 m-20 p-5 relative z-10">
        <h1>
          <b>Log in</b>
        </h1>
        <p>
          If you don’t have an account register. You can register
          <Link to="/register">
            {" "}
            <b>Here!</b>
          </Link>
        </p>
        <form onSubmit={login}>
          <label htmlFor="emailInput">Email</label>
          <br />
          <input
            type="email"
            id="emailInput"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
            required
          />
          <br />
          <label htmlFor="passwordInput">Password</label>
          <br />
          <input
            type="password"
            id="passwordInput"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
            required
          />
          <br />
          <button
            type="submit"
            className="bg-[#000] text-white my-5 w-1/2 h-9 rounded-md"
          >
            logIn
          </button>
        </form>
      </div>

        <div
          className={`error-panel w-96 max-md:w-8/12 top-0 left-20 p-5 rounded-md absolute ${
            errorPanel ? "active" : ""}`}>
            {errorMessage}
        </div>
      </div>
    </>
  );
}

export default Login;
