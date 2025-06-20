import {useState, useContext, useEffect} from 'react'
import Title from './Title';
import { ShopContext } from '../context/shopContext';
import ProductTile from './ProductTile';
import Spinner from './Spinner';

const BestSeller = () => {

    const [loading, setLoading] = useState(true);
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);
    
    useEffect(() => {
      setBestSellers((products.filter((product) => product.bestSeller === true)).slice(0, 5));
      setLoading(false)
    }, [products])

  return (
    <div>
        <Title title1="BEST" title2="SELLERS" subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."/>
        <div className={`w-full p-5 ${loading? "flex justify-center items-center" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"}`}> 
            {
                loading ? (<Spinner />) : (
                bestSellers.map((item, index) => {
                    return (
                        <ProductTile key={index} id={item._id} name={item.productName} image={item.image} price={item.price}/>
                    )
                }))
            }
        </div>
    </div>
  )
}

export default BestSeller