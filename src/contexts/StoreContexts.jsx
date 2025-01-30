import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContexts = createContext(null);

const StoreContextsProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "https://fullstack-food-delievery-app.onrender.com";

  // Add to Cart
  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: Math.max((cartItems[itemId] || 0) - 1, 0),
    };
    if (updatedCart[itemId] === 0) {
      delete updatedCart[itemId]; // Remove item if quantity is 0
    }
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error.message);
      }
    }
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems({}); // Reset cart state
    localStorage.removeItem("cartItems"); // Remove cart data from localStorage
    if (token) {
      try {
        axios.post(url + "/api/cart/clear", {}, { headers: { token } }); // Optionally clear cart from backend
      } catch (error) {
        console.error("Error clearing cart:", error.message);
      }
    }
  };

  // Get Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch Food List from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error.message);
    }
  };

  // Load Cart from Local Storage
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart)); // Rehydrate cart from localStorage
    }
  };

  // Sync Cart with Backend
  const syncCartWithBackend = async () => {
    try {
      if (token) {
        const response = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token } }
        );
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error syncing cart with backend:", error.message);
    }
  };

  // On Component Mount
  useEffect(() => {
    const initializeApp = async () => {
      loadCartFromLocalStorage(); // Load cart from localStorage
      await fetchFoodList(); // Fetch food list from API

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await syncCartWithBackend(); // Sync cart with backend
      }
    };
    initializeApp();
  }, []); // Runs only once (no StrictMode double invocation)

  const contextsValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart, // Added clearCart here
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContexts.Provider value={contextsValue}>
      {props.children}
    </StoreContexts.Provider>
  );
};

export default StoreContextsProvider;
