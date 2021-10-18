import "./Components.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../App";

const Login = (props) => {
  const token = props.token;
  const setToken = props.setToken;
  const setIsLoggedIn = props.setIsLoggedIn;
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const info = await response.json();

    if (info.error) {
      console.log(info.error);
      return setErrorMessage(info.error);
    }

    localStorage.setItem("token", info.token);
    setIsLoggedIn(true);
    setToken(info.token);
    history.push("/my-routines");
  };

  return (
    <>
      <h1 className="page_title">Login</h1>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            className="login_input"
            placeholder="Enter username"
            minLength={6}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <br></br>
          <input
            className="login_input"
            type="password"
            min={8}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <br></br>
          <button className="login_button">Login</button>
          <p className="errorMessage">{errorMessage}</p>
        </form>
        <br></br>
        <Link to="/register">
          Don't have an account? Click here to sign up.
        </Link>
      </div>
    </>
  );
};

export default Login;
