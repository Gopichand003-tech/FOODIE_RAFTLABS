import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import Hero from "../components/Hero";
import MenuSection from "../components/menuSection";
import HowItWorks from "../components/HowItWorks";
import Offers from "../components/Offers";

export default function Home({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
}) {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">

      {/* NAVBAR */}
      <Navbar setCartOpen={setCartOpen} cartItems={cartItems} />

      <Hero />

      <MenuSection
        setCartItems={setCartItems}
        setCartOpen={setCartOpen}
      />

      <HowItWorks />
      <Offers />

      {/* CART SIDEBAR */}
      <CartSidebar
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <Footer />
    </div>
  );
}