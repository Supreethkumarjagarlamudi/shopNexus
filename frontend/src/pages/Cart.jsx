import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotals from "../components/CartTotals";

const cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    getCartAmount,
    getCartCount,
    delivery_fee,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="w-full flex flex-col my-10">
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-3 text-2xl">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            YOUR
            <span className="font-bold text-black">CART</span>
          </div>
          <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
        </div>
        <div className="flex flex-col my-5">
          {cartData.map((item, index) => {
            const productData = products.find(
              (productItem) => productItem._id === item._id
            );
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center flex-row border-y-1 border-gray-200"
              >
                <div className="flex p-3 gap-5 w-full sm:w-1/2 min-w-1/4">
                  <div className="flex justify-center items-center">
                    <img
                      src={productData.image[0]}
                      alt="ProductImage"
                      className="w-16 sm:w-20"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <div className="text-xl text-gray-700">
                      {productData.name}
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-2xl">
                        {currency} {productData.price}
                      </div>
                      <div className="bg-slate-50 px-2 sm:px-3 sm:py-1 border">
                        {item.size}
                      </div>
                    </div>
                  </div>
                </div>
                {/* quantity */}
                <div className="flex justify-center items-center">
                  <input
                    onChange={(e) => {
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          );
                    }}
                    type="number"
                    defaultValue={item.quantity}
                    className="w-1/2 p-2 bg-gray-200"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-1/2 text-gray-600"
                    src={assets.bin_icon}
                    alt="deleteIcon"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-end">
          {getCartCount() === 0 ? "" : <CartTotals></CartTotals>}
        </div>
      </div>
    </div>
  );
};

export default cart;
