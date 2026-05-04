import React, { useState } from "react";
import { X, ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CartSidebar = ({ open, setOpen, cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  const [payment, setPayment] = useState("COD");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


   let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // qty +
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  // qty -
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: (item.qty || 1) - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // remove
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  //  MAIN FIX (BACKEND CALL)
  const handleOrder = async () => {
    if (!address || !phone) {
      alert("Enter address & phone");
      return;
    }

    try {
      setIsPaying(true);

      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total,
          address,
          phone,
          userId,
        }),
      });

      const data = await res.json();

      console.log("ORDER SAVED:", data);

      localStorage.setItem("currentOrder", JSON.stringify(data));

      setTimeout(() => {
        setCartItems([]);
        setOpen(false);
        navigate("/track");
      }, 200);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

 return (
  <>
    {open && (
      <>
        {/* OVERLAY */}
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setOpen(false)}
        />

        {/* SIDEBAR */}
        <div className="fixed top-0 right-0 h-full w-[415px] bg-gray-950 text-white shadow-2xl z-50">
          
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
            <h2 className="flex items-center gap-2 text-lg text-white ml-2">
              <ShoppingCart className="text-orange-500"/> Cart
            </h2>
            <X onClick={() => setOpen(false)} className="cursor-pointer" />
          </div>

          {/* ITEMS */}
          <div className="p-5 space-y-4 overflow-y-auto h-[45%]">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400">🍽️ Cart empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-900 p-3 rounded-xl">
                  <img src={item.image} className="w-14 h-14 rounded-lg" />

                  <div className="flex-1">
                    <h3>{item.name}</h3>
                    <p className="text-orange-500">₹{item.price}</p>

                    <div className="flex gap-2 mt-2 ml-36">
                      <button onClick={() => decreaseQty(item.id)}>
                        <Minus size={14} />
                      </button>
                      {item.qty || 1}
                      <button onClick={() => increaseQty(item.id)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <Trash
                    className="cursor-pointer text-red-500"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              ))
            )}
          </div>

          {/* STEP */}
          <div className="p-5 border-t border-gray-900 space-y-3 -translate-y-7 ml-1">
            {step === 1 && (
              <>
                <input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                />

                <input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                />

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-orange-500 p-2 rounded"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
  <>
    <h3 className="text-sm text-gray-400 ">Payment Method</h3>

  
<div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

  {/* COD */}
  <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800">
    <span>Cash on Delivery</span>
    <input
      type="radio"
      name="payment"
      checked={payment === "COD"}
      onChange={() => setPayment("COD")}
      className="accent-orange-500"
    />
  </label>

  {/* UPI */}
  <label className="flex items-center justify-between p-3 border-t border-gray-800 cursor-pointer hover:bg-gray-800">
    <span>UPI Payment</span>
    <input
      type="radio"
      name="payment"
      checked={payment === "UPI"}
      onChange={() => setPayment("UPI")}
      className="accent-orange-500"
    />
  </label>

  {/* CARD */}
  <label className="flex items-center justify-between p-3 border-t border-gray-800 cursor-pointer hover:bg-gray-800">
    <span>Card Payment</span>
    <input
      type="radio"
      name="payment"
      checked={payment === "CARD"}
      onChange={() => setPayment("CARD")}
      className="accent-orange-500"
    />
  </label>

</div>

    {/* VIDEO */}
    {isPaying && (
      <video
        src="/cashflow2.mp4"
        autoPlay
        muted
        className="w-24 h-24 mx-auto rounded-full"
      />
    )}

    {/* TOTAL */}
    <div className="flex justify-between mt-2">
      <span>Total</span>
      <span className="text-orange-500">₹{total}</span>
    </div>

    {/* BUTTON */}
    <button
      onClick={handleOrder}
      className="w-full bg-orange-500 p-2 rounded"
    >
      {isPaying ? "Processing..." : "Pay Now"}
    </button>
  </>
)}
          </div>
        </div>
      </>
    )}
  </>
);
};

export default CartSidebar;