import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({token}) => {

  const [list, setList] = useState([]);
  const [extractedList, setExtractedList] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showResults, setShowResults] = useState(10);

  const getList = async () => {
    try{
      let response = await axios.get(backendUrl + "/api/product/listProducts");
      if(response.data.success){
        setNoOfProducts(response.data.products.length);
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    try{
      const response = await axios.post(backendUrl + '/api/product/remove', {productId: id}, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        await getList();
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getList();
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(noOfProducts / showResults))
    setExtractedList(list.slice(((currPage-1) * showResults), (((currPage-1) * 10) + {showResults}) >= noOfProducts ? noOfProducts : (currPage * showResults)))
  }, [noOfProducts, showResults, currPage])


  return (
    <>
      <div className='flex flex-col w-full'>
        <div className='flex justify-center items-center text-2xl font-semibold mb-2'>
          Products
        </div>
        <div className='flex justify-between px-3 bg-slate-200 items-center p-3 rounded-md mb-3'>
          <div className='flex justify-center items-center'>
            <p>Showing {((currPage - 1) * showResults + 1)}-{((currPage * showResults) > noOfProducts ? noOfProducts : (currPage * showResults))} of {noOfProducts}</p>
          </div>
          <div className='flex gap-3'>
            <div onClick={() => setCurrPage(currPage - 1)} className={`text-xl ${currPage != 1 ? "" : "hidden"}`}><i className='fas fa-arrow-left'></i></div>
            <div className='text-xl flex'>{currPage}</div>
            <div onClick={() => setCurrPage(currPage + 1)} className={`text-xl ${currPage != totalPages ? "" : "hidden"}`}><i className={`fas fa-arrow-right`}></i></div>
          </div>
          <div className='hidden md:flex gap-2'>
            <select onChange={(e) => setShowResults(e.target.value)} className='border-1 border-black rounded-md p-1' value={showResults}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <p className='flex justify-center items-center'>Per Page</p>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-md rounded-md'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Actions</b>
          </div>
          {
            extractedList.map((item, index) => {
              return (
                <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border border-gray-200 p-1'>
                  <div className='flex justify-start items-center'><img src={item.image[0] ? item.image[0] : assets.parcel_icon} className='w-10'/></div>
                  <p className='flex items-center'>{item.productName}</p>
                  <p className='flex items-center'>{item.category}</p>
                  <p className='flex items-center'>{currency} {item.price}</p>
                  <div onClick={() => {
                    removeProduct(item._id);
                  }} className='flex justify-center items-center cursor-pointer'><p className='p-2 border bg-red-100 rounded-sm'>X</p></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default List