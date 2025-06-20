import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
  const currency = "₹"
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      let response = await axios.get(backendUrl + "/api/product/listProducts");
      if (response.data.success) {
        setProducts(response.data.products); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  };

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Please Select the Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    toast.success("Item added to Cart");
    setCartItems(cartData);

    if(token) {
      try{
        await axios.post(backendUrl + "/api/cart/add", {productId: itemId, size}, {headers: {token}});
      }
      catch (error){
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (let item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (e) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      toast.success("Item Successfully Removed from Cart");
    }

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl + "/api/cart/update", {productId: itemId, size, quantity}, {headers: {token}});
      }
      catch(error){
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }

    }

  };

  const getCartItems = async (token) => {
    try{
      let response = await axios.post(backendUrl + "/api/cart/userCart", {}, {headers: {token}});
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  }

  const getCartAmount = () => {
    let cartData = structuredClone(cartItems);
    let cartAmount = 0;
    for (const items in cartData) {
      let productPrice = products.find(
        (itemData) => itemData._id === items
      ).price;
      for (const item in cartData[items]) {
        cartAmount += productPrice * cartData[items][item];
      }
    }
    return cartAmount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getCartItems(localStorage.getItem("token"));
    }
  }, [token]) 

  const value = {
    currency,
    delivery_fee,
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
