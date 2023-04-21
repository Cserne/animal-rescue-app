import React, { useState } from "react";
import { sendLogin } from "../api/login";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    let resp = await sendLogin(email, password);
    let result = JSON.stringify(resp)
    localStorage.setItem("token", result);
    console.log(result);

    if (resp) {
      navigate("/");
    } else {
      window.alert("wrong email or password!");
    }
  };

  return (
      <div className="loginPage">
        <Navbar />
        {/* <h1>Login Page</h1> */}
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Log in!</label>
          <div className="inputDiv">
            <input
              type="string"
              name="email"
              placeholder="email or username"
              minLength={5}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputDiv">
            <input
              type="password"
              name="password"
              placeholder="password"
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <input type="submit" value="Login" />
          {/* <button className="reset-button" onClick={() => navigate("/reset")}>
            Forgot your password?
          </button> */}
        </form>
      </div>
  );
};

export default Login;
