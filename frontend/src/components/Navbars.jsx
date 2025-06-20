import {useState, useContext} from 'react'
import {assets} from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbars = () => {
  const {setShowSearch, getCartCount, navigate, setToken, setCartItems, token} = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setCartItems({});
    navigate('/login');
  }
  return (
    <div className='flex justify-between items-center py-4 font-medium border-b-1 border-gray-300'>
      <Link to="/"><img src={assets.logo} alt="logo" className='w-36'/></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className="flex flex-col items-center" to="/">
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/collections">
          <p>Collections</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/about">
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/contact">
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex gap-6 items-center'>
        <img onClick={() => {setShowSearch(true)}} src={assets.search_icon} alt="search-icon" className='w-5 cursor-pointer'/>
        <div className='group relative'>
          <Link to={"/login"}><img src={assets.profile_icon} alt="profile_icon" className='w-5 cursor-pointer' /></Link>
          {token &&   <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 bg-white shadow-lg rounded-lg'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 text-gray-500 bg-slate-100'>
              <p onClick={() => {navigate('/myProfile')}} className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => {navigate('/myOrders')}} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
        </div>
        <Link className='relative' to="/cart">
          <img src={assets.cart_icon} alt="cart-icon" className='w-5 min-w-5 cursor-pointer'/>
          <p className='absolute bottom-[-5px] right-[-5px] w-4 bg-gray-600 text-white rounded-full leading-4 flex items-center justify-center aspect-square text-xs'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="sm:hidden w-5 cursor-pointer" alt="menu-item" />
      </div>

      {/* sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)}className="py-4 pl-2 border-b-2 border" to={"/"}>Home</NavLink>
          <NavLink onClick={() => setVisible(false)}className="py-4 pl-2 border-b-2" to={"/collections"}>Collections</NavLink>
          <NavLink onClick={() => setVisible(false)}className="py-4 pl-2 border-b-2" to={"/about"}>About</NavLink>
          <NavLink onClick={() => setVisible(false)}className="py-4 pl-2 border-b-2" to={"/contact"}>Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbars