import { useState, useContext } from "react";
import { backendUrl, ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

const placeOrder = () => {
  const { products, token, getCartAmount, delivery_fee, currency, navigate, setCartItems, cartItems } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try{ 
          const {data} = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, {headers: {token}})
          if(data.success){
            navigate('/myOrders');
            setCartItems({})
          }

        }catch(error) {
          console.log(error.message);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        orderItems: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      console.log(orderData);
      switch (method) {
        case "COD":
          console.log("COD triggered")
          let response = await axios.post(
            backendUrl + "/api/order/placeOrder",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/myOrders");
          } else {
            toast.error(response.data.message);
          }
          break;
        
        case "Stripe":
          let responseStripe = await axios.post(backendUrl + '/api/order/placeOrderStripe', orderData, {headers: {token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(responseStripe.data.message);
          }

          break;

        case "Razorpay":
          let responseRazorpay = await axios.post(backendUrl + "/api/order/placeOrderRazorpay", orderData, {headers: {token}});
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const [method, setMethod] = useState("COD");
  return (
    <form onSubmit={onSubmitHandler} method="post" className="w-full">
      <div className="w-full flex max-md:flex-col justify-between gap-10 px-4 md:px-10">
        {/* Left side Container */}
        <div className="w-full md:w-1/2 h-full flex">
          <div className="w-full h-full flex flex-col gap-4 my-30">
            <div className="w-full flex items-center justify-center  gap-3 text-2xl">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                DELIVERY
                <span className="font-bold text-black">INFORMATION</span>
              </div>
              <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
            </div>
            <div className="w-full h-full flex flex-col gap-6">
              <div className="w-full flex gap-2">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  type="text"
                  placeholder="FirstName"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  type="text"
                  placeholder="LastName"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
              <div className="w-full">
                <input
                  required
                  name="email"
                  onChange={onChangeHandler}
                  value={formData.email}
                  type="email"
                  placeholder="Email Address"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
              <div className="w-full">
                <input
                  required
                  name="street"
                  onChange={onChangeHandler}
                  value={formData.street}
                  type="text"
                  placeholder="Street"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  placeholder="City"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  placeholder="State"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  type="number"
                  placeholder="zipcode"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={formData.country}
                  type="text"
                  placeholder="Country"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
              <div className="w-full">
                <input
                  required
                  name="phone"
                  onChange={onChangeHandler}
                  value={formData.phone}
                  type="number"
                  placeholder="Phone"
                  className="w-full text-lg p-1 pl-2 border-1 border-gray-400 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right side Container */}
        <div className="w-full md:w-1/2 h-full flex">
          <div className="my-0 md:my-40 w-full h-full flex flex-col gap-4">
            <div className="w-full">
              <div className="w-full flex items-center gap-3 text-2xl">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  CART
                  <span className="font-bold text-black">TOTALS</span>
                </div>
                <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
              </div>
              <div className="w-full flex flex-col my-5 gap-3">
                <div className="w-full flex justify-between text-xl">
                  <p>Subtotals</p>
                  <p>
                    {currency} {getCartAmount()}
                  </p>
                </div>
                <div className="w-full flex justify-between text-xl">
                  <p>Shipping fee</p>
                  <p>
                    {currency} {delivery_fee}
                  </p>
                </div>
                <div className="w-full flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>
                    {currency} {getCartAmount() + delivery_fee}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center gap-3 text-2xl">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  PAYMENT
                  <span className="font-bold text-black">METHOD</span>
                </div>
                <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div
                  onClick={() => {
                    setMethod("Stripe");
                  }}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "Stripe" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    className="h-5 mx-4"
                    src={assets.stripe_logo}
                    alt="stripe"
                  />
                </div>
                <div
                  onClick={() => {
                    setMethod("Razorpay");
                  }}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "Razorpay" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    className="h-5 mx-4"
                    src={assets.razorpay_logo}
                    alt="razorpay"
                  />
                </div>
                <div
                  onClick={() => {
                    setMethod("COD");
                  }}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "COD" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <p>CASH ON DELIVERY</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center my-10">
              <button
                type="submit"
                className="w-1/2 bg-black text-white cursor-pointer text-lg p-2 rounded-md hover:bg-gray-800 transition-all duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default placeOrder;
