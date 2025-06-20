import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Add from "./pages/add"
import List from "./pages/List"
import Orders from "./pages/orders"
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])

  return (
    <>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} />: <>
      <Navbar setToken={setToken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[80%] mx-auto my-5 text-gray-600 text-base'>
        <Routes>
          <Route path='/add' element={<Add token={token}/>}></Route>
          <Route path='/list' element={<List token={token}/>}></Route>
          <Route path='/orders' element={<Orders token={token}/>}></Route>
        </Routes>
        </div>
      </div>
      </>}
    </>
  )
}

export default App