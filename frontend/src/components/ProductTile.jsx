import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductTile = (props) => {

    const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${props.id}`}>
        <div className='cursor-pointer'>
            {/* top Section */}
            <div className='overflow-hidden'>
                <img className="hover:scale-110 transition ease-in-out" src={props.image[0]} alt={props.productName} />
            </div>
            {/* bottom section */}
            <div>
                <p className='pt-3 pb-1 text-sm'>{props.name}</p>
                <p className='text-sm font-medium'>{currency}{props.price}</p>
            </div>
        </div>
    </Link>
  )
}

export default ProductTile