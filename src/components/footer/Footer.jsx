import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            My name is olatunji praise a beginner in software development, i
            pray God guides me through to unlock my inner potentials
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li> Delievery</li>
            <li>Privacy policies</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+2347043208748</li>
            <li>praiseolatunji22@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ PCO.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
