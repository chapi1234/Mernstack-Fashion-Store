import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setToken('');
      setLoading(false);
    }, 3000);
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button
        onClick={handleLogout}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer'
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  )
}

export default Navbar