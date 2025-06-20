import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import DescriptionBox from "../components/DescriptionBox";

const product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProduct(item);
        setMainImage(item.image[0]);
        return null;
      }
    });
  };
  const productImages = product.image;
  const productSize = product.sizes;
  const noOfReviews = 102;
  let rating = 4;

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);
  return product ? (
    <div className="w-full flex flex-col items-center py-5 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col md:flex-row w-full gap-3">
        {/* left */}
        <div className="w-full md:w-1/2 h-full justify-center md:items-center flex flex-col-reverse md:flex-row gap-1">
          {/* images Container */}
          <div className="w-full md:w-[130px] p-2 flex flex-row md:flex-col gap-3 md:h-[450px] overflow-x-auto md:overflow-y-auto overscroll-contain scrollbar-none">
            {productImages.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`aspect-square w-[80px] md:w-full rounded-sm ${
                    image == mainImage
                      ? "border-2 border-black shadow-md shadow-gray-400"
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    onClick={() => {
                      setMainImage(image);
                    }}
                    className="w-full h-full max-md:object-cover rounded-sm"
                  />
                </div>
              );
            })}
          </div>
          {/* main Image */}
          <div className="flex justify-center items-center">
            <img
              src={mainImage}
              alt="Main image"
              className="object-contain max-h-[500px] w-auto"
            />
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* title */}
          <div className="flex py-3">
            <p className="text-2xl font-semibold">{product.productName}</p>
          </div>
          {/* Reviews */}
          <div className="flex flex-row items-center">
            {Array.from({ length: rating }).map((_, i) => (
              <div key={i} className="review-star text-gray-400 text-md">
                <i className="fa-solid fa-star"></i>
              </div>
            ))}
            {Array.from({ length: 5 - rating }).map((_, i) => (
              <div key={i} className="review-star text-md">
                <i className="fa-regular fa-star"></i>
              </div>
            ))}

            <div className="px-2 text-md">({noOfReviews})</div>
          </div>
          {/* price */}
          <div className="flex text-3xl font-semibold py-5">
            {currency} {product.price}
          </div>
          {/* product Description */}
          <div className="flex text-gray-400">
            <p>{product.productDesc}</p>
          </div>
          {/* size Selection */}
          <div className="flex flex-col justify-center">
            <div className="flex text-md font-normal">
              <p>Select Size</p>
            </div>
            <div className="flex gap-1 py-3">
              {productSize.map((size, index) => {
                return (
                  <button
                    onClick={() => {
                      console.log(selectedSize);
                      if (size === selectedSize) {
                        setSelectedSize("");
                      } else {
                        setSelectedSize(size);
                      }
                    }}
                    key={index}
                    className={`size-13 bg-gray-200 flex justify-center items-center transform transition-all ease-in-out duration-300 ${
                      size === selectedSize
                        ? "border-2 border-black shadow-md scale-110"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          {/* add to cart button */}
          <div>
            <button
              onClick={() => {
                addToCart(productId, selectedSize);
              }}
              type="submit"
              className="bg-black text-white p-2 my-3 hover:scale-105"
            >
              ADD TO CART
            </button>
          </div>
          <ProductFeatures></ProductFeatures>
        </div>
      </div>
      <DescriptionBox></DescriptionBox>
      <RelatedProducts itemId={productId}></RelatedProducts>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default product;
