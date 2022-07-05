import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    console.log("toktoktok", token)
    const decoded = jwt_decode(token);
    if (token) {
        console.log(decoded);
      setEmail(decoded.email);
      setLoggedin(true);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="navbar">
      <Link to="/" className="navbar-btn">
        <div>
          <p>HOMEPAGE</p>
        </div>
      </Link>

      {loggedin && (
        <Link to="/mypage" className="navbar-btn">
          <div className="navbar-btn">
            <p>My PAGE</p>
          </div>
        </Link>
      )}
      {loggedin && (
        <Link to="/helps" className="navbar-btn">
          <div className="navbar-btn">
            <p>HELPS</p>
          </div>
        </Link>
      )}
      {loggedin && (
        <Link to="/showallusers" className="navbar-btn">
          <div className="navbar-btn">
            <p>ALL USERS</p>
          </div>
        </Link>
      )}
      {!loggedin ? (
        <>
          <Link to="/register" className="navbar-btn">
            <div>
              <p>REGISTER</p>
            </div>
          </Link>
          <Link to="/login" className="navbar-btn">
            <div className="navbar-btn">
              <p>LOGIN</p>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/"
            onClick={() => {
              localStorage.clear();
              setLoggedin(false);
              navigate("/");
            }}
            className="navbar-btn"
          >
            <div className="navbar-btn">
              <p>LOGOUT</p>
            </div>
          </Link>
          <h6>Hi {email}, you're logged in!</h6>
        </>
      )}
    </div>
  );
};

export default Navbar;
