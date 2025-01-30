import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContexts } from "../../contexts/StoreContexts";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContexts);
  const [currState, setCurrState] = useState("login"); // Tracks if we're logging in or signing up
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For displaying errors

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Clear errors

    // Basic validation
    if (currState === "sign up" && !data.name.trim()) {
      setError("Name is required for sign up.");
      return;
    }
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Set API endpoint based on state
    const endpoint = `${url}/api/user/${
      currState === "login" ? "login" : "register"
    }`;

    try {
      const response = await axios.post(endpoint, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close popup on success
      } else {
        setError(
          response.data.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState === "login" ? "Log In" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {/* Render 'name' input only if signing up */}
          {currState === "sign up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Error message */}
        <button type="submit">
          {currState === "sign up" ? "Create Account" : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            By continuing, I accept all terms and conditions.
          </label>
        </div>
        {/* Toggle between login and sign up */}
        {currState === "login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("sign up")}>Sign Up Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("login")}>Log In Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
