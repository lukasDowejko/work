import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterFrom() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorPanel, setErrorPanel] = useState(false);

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        userName,
        password,
        passwordVerify,
      };

      await axios
        .post("http://localhost:3000/auth/register", registerData)
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
        <div className="register relative z-10 rounded-md w-96 m-20 p-5 max-md:w-8/12 max-md:mt-32">
          <h1>
            <b>Sign up</b>
          </h1>
          <p>
            If you have an account. You can login
            <Link to="/login">
              <b> Here!</b>
            </Link>
          </p>
          <form onSubmit={register}>
            <label htmlFor="emailInput">Email</label>
            <br />
            <input
              type="email"
              id="emailInput"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              required
            />
            <br />
            <label htmlFor="userNameInput">User name</label>
            <br />
            <input
              type="text"
              id="userNameInput"
              className="registerInput"
              onChange={(e) => setUserName(e.target.value)}
              defaultValue={userName}
              required
            />
            <br />
            <label htmlFor="passwordInput">Password</label>
            <br />
            <input
              type="password"
              id="passwordInput"
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
              required
            />
            <br />
            <label htmlFor="passwordConfirmInput">Confrim Password</label>
            <br />
            <input
              type="password"
              id="passwordConfirmInput"
              className="registerInput"
              onChange={(e) => setPasswordVerify(e.target.value)}
              defaultValue={passwordVerify}
              required
            />
            <br />
            <button
              type="submit"
              className="bg-[#000] text-white my-5 w-1/2 h-9 rounded-md"
            >
              Register
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

export default RegisterFrom;
