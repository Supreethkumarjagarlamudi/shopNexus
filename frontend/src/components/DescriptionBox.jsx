import React, { useState } from "react";
import Descriptor from "./Descriptor";
import ReviewBox from "./ReviewBox";

const DescriptionBox = () => {
  const [descriptionStatus, setDescriptionStatus] = useState(true);
  const reviewCount = 122;
  return (
    <div className="w-full flex flex-col my-5 p-10">
      <div className="w-full flex text-md">
        <button
          onClick={() => setDescriptionStatus(true)}
          className="border-2 border-gray-400 flex justify-center items-center p-3 cursor-pointer"
        >
          Description
        </button>
        <button
          onClick={() => setDescriptionStatus(false)}
          className="border-2 border-gray-400 flex justify-center items-center p-3 cursor-pointer"
        >
          Reviews ({reviewCount})
        </button>
      </div>
      <div className="border-1 border-gray-400 p-5 transition-h ease-in-out duration-300">
        <div className={`${!descriptionStatus ? "hidden" : ""}`}>
          <Descriptor></Descriptor>
        </div>
        <div className={`${descriptionStatus ? "hidden" : ""}`}>
          <ReviewBox></ReviewBox>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;
