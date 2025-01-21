import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder.jsx";
import Footer from "./components/footer/Footer.jsx";
import LoginPopup from "./components/loginPopup/LoginPopup.jsx";
import { useState } from "react";

const App = () => {
const [showLogin , setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
