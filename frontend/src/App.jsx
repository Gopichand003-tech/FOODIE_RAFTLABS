import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import TrackOrder from "./pages/trackorder";
import History from "./pages/orderhistory";
import MenuPage from "./pages/Menucard";
import CartSidebar from "./components/CartSidebar";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  let userId = localStorage.getItem("userId");

if (!userId) {
  userId = crypto.randomUUID(); // unique id
  localStorage.setItem("userId", userId);
}

  return (
    <BrowserRouter>

      {/* GLOBAL CART */}
      <CartSidebar
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              setCartItems={setCartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            />
          }
        />

        <Route
          path="/menu"
          element={
            <MenuPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              setCartOpen={setCartOpen}
            />
          }
        />

        <Route path="/track" element={<TrackOrder />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;