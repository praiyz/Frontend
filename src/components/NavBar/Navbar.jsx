import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContexts } from "../../contexts/StoreContexts";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount} = useContext(StoreContexts);

  return (
    <div className="navbar">
      <Link to='/'>
        {" "}
        <img src={assets.logo} alt="" className="logo" /> {/* logo */}
      </Link>

      <ul className="navbar-menu">
        {/* menu */}
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>{" "}
        {/* menu items */}
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        {" "}
        {/* search, basket, sign in */}
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div> {/* basket items */}
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
