import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const sidebar = () => {
  return (
    <>
      <div className="min-h-screen w-[18%] border-r-2 border-black">
        <div className="w-full flex flex-col gap-4 pt-6 pl-[5%] pr-[5%] text-[15px]">
          <NavLink to={"/add"} className="flex items-center gap-3 text-gray-600 text-md border-1 border-black p-2">
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Items</p>
          </NavLink>
          <NavLink to={"/list"} className="flex items-center gap-3 text-gray-600 text-md border-1 border-black p-2">
            <img src={assets.order_icon} alt="" />
            <p className="hidden md:block">List Items</p>
          </NavLink>
          <NavLink to={"/orders"} className="flex items-center gap-3 text-gray-600 text-md border-1 border-black p-2">
            <img src={assets.order_icon} alt="" />
            <p className="hidden md:block">Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default sidebar;
