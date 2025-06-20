import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const add = ({ token }) => {
  const [sizes, setSizes] = useState([]);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setProductName("");
        setProductDesc("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full item-start gap-3"
    >
      <div>
        <p className="mb-3">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="image1"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="image2"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="image3"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="image4"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-3">Product Name</p>
        <input
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          value={productName}
          className="w-full max-w-[500px] px-3 py-2 border-1 border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Title Here"
          required
        />
      </div>
      <div>
        <p className="mb-3">Product Description</p>
        <textarea
          onChange={(e) => {
            setProductDesc(e.target.value);
          }}
          value={productDesc}
          className="w-full max-w-[500px] px-3 py-2 border-1 border-gray-400 rounded-md"
          type="text"
          placeholder="Enter Content Here"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3 max-w-[500px]">
        <div className="w-full md:w-1/3">
          <p className="mb-3">Product Category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            className="w-full border-1 border-gray-400 rounded-md px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="w-full md:w-1/3">
          <p className="mb-3">subCategory</p>
          <select
            onChange={(e) => {
              setSubCategory(e.target.value);
            }}
            value={subCategory}
            className="w-full border-1 border-gray-400 rounded-md px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="w-full md:w-1/3">
          <p className="mb-3">Product Price</p>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            type="Number"
            className="w-full border-1 border-gray-400 rounded-md px-3 py-2"
            placeholder="Enter Price"
          />
        </div>
      </div>
      <div>
        <p className="mb-3">Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
            className={`${
              sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>S</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
            className={`${
              sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>M</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
            className={`${
              sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>L</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
            className={`${
              sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>XL</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
            className={`${
              sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
            } px-3 py-1 cursor-pointer`}
          >
            <p>XXL</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[500px] flex gap-3 items-center px-1 py-2">
        <input
          onChange={() => {
            setBestSeller((prev) => !prev);
          }}
          checked={bestSeller}
          type="checkbox"
          id="checkBox"
        />
        <label htmlFor="checkBox">Add to BestSeller</label>
      </div>
      <div className="w-full max-w-[500px] bg-black text-white rounded-md flex justify-center items-center py-2 px-1 text-xl cursor-pointer">
        <button type="Submit">Add Product</button>
      </div>
    </form>
  );
};

export default add;
