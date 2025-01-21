import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? 
            <></>
           : 
            <input type="" placeholder="Your Name" required />
          }

          <input type="text" placeholder="Your Email" required />
          <input type="text" placeholder="Your Password" required />
        </div>
        <button>{currState === "sign up" ? "Create Account" : "Log in"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i accept all terms and conditions</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("sign up")}>Click here </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
