import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import MyOrders from "./pages/MyOrders"
import Navbar from './components/Navbars'
import Footer from './components/Footer'
import SearchBar from './components/searchBar'
import MyProfile from './pages/myProfile'
import Verify from './pages/verify'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/collections' element={<Collection></Collection>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path="/product/:productId" element={<Product></Product>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/placeOrder" element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/myOrders" element={<MyOrders></MyOrders>}></Route>
        <Route path='/myProfile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/verify' element={<Verify></Verify>}></Route>
      </Routes>

      <Footer></Footer>


      
    </div>
  )
}

export default App
