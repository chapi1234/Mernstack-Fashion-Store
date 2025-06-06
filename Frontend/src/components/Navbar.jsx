import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {

  const [visible, setVisisble] = useState(false);

  const { setShowSearch, getCartCount } = useContext(ShopContext)

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'><img src={assets.logo} className="w-36" alt="logo" /></Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
        <NavLink to='/' className="flex flex-col items-center gap-1"> 
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1"> 
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1"> 
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1"> 
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} className="w-5 cursor-pointer" src={assets.search_icon} alt="search icon" />

        <div className="group relative">
          <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="profile icon" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="cart icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisisble(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden " alt="menu icon" />
      </div>

      <div className={`fixed top-0 bottom-0 scroll-m-0 overflow-hidden bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisisble(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="drop down" />
            <p>Back</p>
          </div>

          <NavLink onClick={()=> setVisisble(false)} className="py-2 pl-4 border mb-2" to="/">HOME</NavLink>
          <NavLink onClick={()=> setVisisble(false)} className="py-2 pl-4 border mb-2" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={()=> setVisisble(false)} className="py-2 pl-4 border mb-2" to="/about">ABOUT</NavLink>
          <NavLink onClick={()=> setVisisble(false)} className="py-2 pl-4 border mb-2" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
    
  );
};

export default Navbar;