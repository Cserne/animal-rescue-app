import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);
  // const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      console.log("toktoktok", token)
        console.log(decoded);
      // setEmail(decoded.email);
      setLoggedin(true);
    } else {
      console.log('noToken')
    }
  };
  const openMap = () => {
    window.open('https://maps.google.com/maps?ll=47.497913,19.040236&z=8&t=m&hl=hu-HU&gl=US&mapclient=apiv3');
  }

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
      <button onClick={openMap}>Állatorvos Kereső</button>

      {loggedin && (
        <>
          <Link to="/mypage" className="navbar-btn">
            <div className="navbar-btn">
              <p>My PAGE</p>
            </div>
          </Link>
          <Link to="/helps" className="navbar-btn">
            <div className="navbar-btn">
              <p>HELPS</p>
            </div>
          </Link>
          <Link to="/showallusers" className="navbar-btn">
            <div className="navbar-btn">
              <p>ALL USERS</p>
            </div>
          </Link>
          <Link to="/searchbycity" className="navbar-btn">
            <div className="navbar-btn">
              <p>Search by city</p>
            </div>
          </Link>
        </>
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
          {/* <h6>Hi {email}, you're logged in!</h6> */}
        </>
      )
      }
    
    </div>

  );
};

export default Navbar;
