import { createContext, useEffect, useState } from "react";
import {food_list} from '../assets/assets'

export const StoreContexts = createContext(null)

const StoreContextsProvider = (props) =>{

    const [cartItems , setCartItems] =useState({})

    const addToCart = (itemId) =>{
if(!cartItems[itemId]){
    setCartItems((prev)=> ({...prev , [itemId] :1}))
}
else{
    setCartItems((prev) =>({...prev , [itemId] :prev[itemId]+1}))
}
    }
    const removeFromCart =(itemId) =>{
setCartItems((prev) =>({...prev , [itemId] : prev[itemId]-1}) )
    }

    useEffect(() =>{
console.log(cartItems);
    },[cartItems])

    const contextsValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart
    };
    return(
        <StoreContexts.Provider value={contextsValue}>
       {props.children}
        </StoreContexts.Provider>
    )
}

export default StoreContextsProvider