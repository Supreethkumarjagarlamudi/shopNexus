import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";

const myOrders = () => {
  const [loading, setLoading] = useState(true);
  const { backendUrl, currency, token, navigate } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);

  const loadOrdersData = async () => {
    try {
      if (!token) {
        return null;
      }

      let response = await axios.post(
        backendUrl + "/api/order/getUserOrders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.map((order) => {
          order.orderItems.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrdersData(allOrderItems.reverse());
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, [token]);

  return (
    <div className="w-full flex flex-col my-10">
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-3 text-2xl">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            MY
            <span className="font-bold text-black">ORDERS</span>
          </div>
          <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
        </div>
        {ordersData.length == 0 ? (
          <div className="w-full max-md:h-screen flex items-center flex-col gap-3 my-50">
            <div className="text-xl">No Orders Yet!</div>
            <button className="p-2 border-1 border-gray-400 bg-gray-100 rounded-md cursor-pointer" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        ) : (
          <div className="flex flex-col my-5">
            { loading ? (<Spinner />) : (ordersData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-between items-center flex-col md:flex-row max-md:gap-1 border-y-1 border-gray-200"
                >
                  {/* left */}
                  <div className="flex p-3 gap-5 w-full sm:w-1/2 min-w-1/4">
                    <div className="flex justify-center items-center">
                      <img
                        src={item.image[0]}
                        alt="ProductImage"
                        className="w-16 sm:w-20"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-xl text-gray-700">
                        {item.productName}
                      </div>
                      <div className="flex items-center gap-5 text-gray-700">
                        <div className="text-l">
                          {currency} {item.price}
                        </div>
                        <div className="text-l">Quantity: {item.quantity}</div>
                        <div className="text-l">Size: {item.size}</div>
                      </div>
                      <div className="text-md text-gray-700">
                        Date:{" "}
                        <span className="text-md text-black">
                          {new Date(item.date).toDateString()}
                        </span>
                      </div>
                      <div className="text-md text-gray-700">
                        Payment Method :{" "}
                        <span className="text-l text-black">
                          {item.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* center */}
                  <div className="flex gap-3 justify-center items-center">
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full bg-green-400`}
                    ></p>
                    <p>{item.status}</p>
                  </div>
                  {/* Right */}
                  <div className="flex justify-center items-center">
                    <button className="p-2 bg-gray-100 rounded-md border-1 border-gray-300">
                      Track Order
                    </button>
                  </div>
                </div>
              );
            }))}
          </div>
        )}
      </div>
    </div>
  );
};

export default myOrders;
