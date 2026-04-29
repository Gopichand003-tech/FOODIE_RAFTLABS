import React from "react";
import { ShoppingCart , ArrowLeft } from "lucide-react";
import { menu } from "../data/menu";
import { useNavigate } from "react-router-dom";


const MenuPage = ({ cartItems, setCartItems, setCartOpen }) => {
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-16 py-10">
         <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 flex items-center gap-2 
        bg-orange-500 px-3 py-2 rounded-lg shadow hover:bg-orange-600"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold mb-10 text-white">
        Our <span className="text-orange-500">Menu</span>
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-orange-500/20 hover:scale-[1.03] transition duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={
                  item.image ||
                  `https://source.unsplash.com/300x200/?${item.name}`
                }
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl hover:scale-110 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>

              <p className="text-sm text-gray-400">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <p className="text-orange-500 font-bold text-lg">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => {
                    setCartItems((prev) => [
                      ...prev,
                      { ...item, qty: 1 },
                    ]);
                    setCartOpen(true);
                  }}
                  className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-sm font-semibold transition active:scale-95"
                >
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MenuPage;