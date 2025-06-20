import React, {useContext, useState, useEffect} from 'react'
import Title from './Title';
import { ShopContext } from '../context/shopContext';
import ProductTile from './ProductTile';
import Spinner from './Spinner.jsx';


const LatestCollection = () => {

  const [loading, setLoading] = useState(true);
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    setLoading(false);
  }, [products])

  return (
    <div>
        <Title title1="LATEST" title2="COLLECTIONS" subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."/>
        <div className={`w-full p-5 ${loading ? 'flex justify-center items-center' : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" }`}>
            {
              loading ? (<Spinner />) :(
                latestProducts.map((item, index) => {
                    return (
                        <ProductTile key={index} id={item._id} name={item.productName} image={item.image} price={item.price}/>
                    )
                }))
            }
        </div>
    </div>
  )
}

export default LatestCollection