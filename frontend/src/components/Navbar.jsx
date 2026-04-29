import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X , Flame } from "lucide-react";

const Navbar = ({ setCartOpen, cartItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden shadow-lg sticky top-0 z-50">
      
      <div className="flex justify-between items-center px-6 md:px-20 py-4">

        {/* logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
  <Flame className="w-7 h-7 text-orange-500 group-hover:scale-110 transition" />

  <h1 className="text-3xl font-extrabold tracking-tight">
    <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
      FOOD
    </span>
    <span className="text-white">IE</span>
  </h1>
</div>

{/* DESKTOP MENU */}
<div className="hidden md:flex items-center gap-10 text-gray-300 font-medium">

  <NavLink
    to="/"
    className={({ isActive }) =>
      `relative transition ${
        isActive ? "text-orange-500" : "hover:text-orange-500"}`}>
    Home
  </NavLink>

  <NavLink
    to="/history"
    className={({ isActive }) =>
      `relative transition ${
        isActive ? "text-orange-500" : "hover:text-orange-500"}`}>
    History
  </NavLink>

  <NavLink
    to="/track"
    className={({ isActive }) =>
      `relative transition ${
        isActive ? "text-orange-500" : "hover:text-orange-500"}`}>
    Track
  </NavLink>

  <NavLink
    to="/menu"
    className={({ isActive }) =>
      `relative transition ${
        isActive ? "text-orange-500" : "hover:text-orange-500"}`}>
    Menu
  </NavLink>
</div>
        
        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          
          {/* CART */}
           <div className="relative cursor-pointer -translate-x-8"
              onClick={() => setCartOpen(true)}>
             <ShoppingCart className="w-6 h-6 hover:text-orange-500" />
               {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded-full font-semibold shadow">
              {cartItems?.length || 0}
               </span>
               )}
               </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            {open ? (
              <X onClick={() => setOpen(false)} className="w-6 h-6 cursor-pointer" />
            ) : (
              <Menu onClick={() => setOpen(true)} className="w-6 h-6 cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 px-6 py-4 space-y-4 text-center">
          <p className="hover:text-orange-500 cursor-pointer">Home</p>
          <p className="hover:text-orange-500 cursor-pointer">History</p>
          <p className="hover:text-orange-500 cursor-pointer">Delivery Status</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;