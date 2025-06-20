import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const orders = ({ token }) => {
  const [orderData, setOrderData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getAllOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/getAllOrders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrderData(response.data.Orders.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const updateStatus = async (orderId, orderStatus) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/updateStatus",
        { orderId, orderStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: orderStatus } : order
          )
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [token]);
  return (
    <>
      <div className="w-full flex justify-between px-10">
        <div className="font-bold text-gray-400 text-xl">Orders</div>
        <input
          className="text-l w-1/3 border-1 border-gray-400 p-1 rounded-md"
          type="text"
          placeholder="Enter Order No:(Ex: 684674349deda42b46e299db)"
        />
      </div>

      {orderData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 p-3 my-5 border-1 border-gray-400 rounded-md"
          >
            <div className="flex justify-center items-center">
              <img src={assets.parcel_icon} alt="Order Icon" />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex gap-1 text-xl text-black items-center">
                <i className="fa-solid fa-user"></i> {item.address.firstName}{" "}
                {item.address.lastName}
              </div>
              <div className="flex gap-1 text-gray-400 items-center">
                <i className="fa-solid fa-location"></i>
                {item.address.street}, {item.address.city}, {item.address.state}
                , {item.address.country}, {item.address.zipcode}
              </div>
              <div className="flex gap-1">
                <div>
                  <i className="fa-solid fa-list-ul"></i>
                </div>
                <div>
                  {item.orderItems.map((orderItem, index) => {
                    return (
                      <div key={index}>
                        {orderItem.productName} x {orderItem.quantity}{" "}
                        {orderItem.size}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <div>
                Items:{" "}
                <span className="font-bold">{item.orderItems.length}</span>
              </div>
              <div>
                <div>
                  Payment:{" "}
                  <span className="font-bold">
                    {item.payment ? "Completed" : "Pending"}
                  </span>
                </div>
                <div>
                  Payment Method:{" "}
                  <span className="font-bold">{item.paymentMethod}</span>
                </div>
                <div>
                  Date:{" "}
                  <span className="font-bold">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center font-bold text-xl">
              {currency} {item.amount}
            </div>
            <div className="flex justify-center items-center">
              <select
                className="w-full border-1 border-gray-400 bg-gray-100 p-2 rounded-md"
                onChange={(event) => {
                  updateStatus(item._id, event.target.value);
                }}
                value={item.status}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default orders;
