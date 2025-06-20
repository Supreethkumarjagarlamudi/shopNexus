import React, {useContext, useState, useEffect} from 'react'
import Title from './Title';
import { ShopContext } from '../context/shopContext';
import ProductTile from './ProductTile';
const RelatedProducts = ({itemId}) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const currentProduct = products.find(item => item._id === itemId);

  const applyFilter = () => {
    let relatedProductsCopy = products.slice();
    relatedProductsCopy = relatedProductsCopy.filter(item => item.category === currentProduct.category);

    relatedProductsCopy = relatedProductsCopy.filter(item => item.subCategory === currentProduct.subCategory);

    relatedProductsCopy = relatedProductsCopy.filter(item => item._id !== currentProduct._id)

    setRelatedProducts(relatedProductsCopy.slice(0,5))
  }
  useEffect(() => {
    applyFilter();
  }, [products])  
  return (
    <div>
        <Title title1="Related" title2="Products" subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."/>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full p-5'>
            {
                relatedProducts.map((item, index) => {
                    return (
                        <ProductTile key={index} id={item._id} name={item.productName} image={item.image} price={item.price}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default RelatedProducts