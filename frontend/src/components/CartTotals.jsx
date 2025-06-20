import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotals = () => {
  const {getCartAmount, delivery_fee, currency, navigate} = useContext(ShopContext);
  return (
    <div className="w-full sm:w-1/2">
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
      <div className="flex justify-center items-center">
        <button onClick={() => navigate("/placeOrder")} className="bg-black p-2 text-white cursor-pointer">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
