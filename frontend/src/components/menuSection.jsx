import { useRef } from "react";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { menu } from "../data/menu";

const MenuSection = ({ setCartItems, setCartOpen }) => {
  const scrollRef = useRef(null);

  //  Button scroll
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  //  Drag scroll (desktop)
  const isDown = useRef(false);
const startX = useRef(0);
const scrollLeft = useRef(0);

const handleMouseDown = (e) => {
  isDown.current = true;
  startX.current = e.pageX - scrollRef.current.offsetLeft;
  scrollLeft.current = scrollRef.current.scrollLeft;
};

const handleMouseLeave = () => (isDown.current = false);
const handleMouseUp = () => (isDown.current = false);

const handleMouseMove = (e) => {
  if (!isDown.current) return;
  e.preventDefault();
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = (x - startX.current) * 1.5;
  scrollRef.current.scrollLeft = scrollLeft.current - walk;
};

  return (
    <section className="relative px-6 md:px-20 py-20 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">

      {/*  Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full"></div>

     {/* TITLE */}
<div className="mb-12 text-center">
  <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
    Popular <span className="text-orange-500">Dishes</span>
  </h2>
</div>
     <div className="relative z-10 w-full">

  {/* LEFT BUTTON */}
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full border border-gray-800 backdrop-blur-md transition"
  >
    <ArrowLeft />
  </button>

  {/* RIGHT BUTTON */}
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full border border-gray-800 backdrop-blur-md transition"
  >
    <ArrowRight />
  </button>

  {/* SCROLL WRAPPER */}
  <div className="relative w-full">

    {/* LEFT FADE */}
    <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

    {/* RIGHT FADE */}
    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

    {/* SCROLL AREA */}
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-2 items-center"
    >
            {menu.map((item) => (
              <div
                key={item.id}
               className="group snap-center min-w-[260px] bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-4 rounded-3xl
                shadow-lg transition duration-300 hover:scale-[1.08] hover:z-20 hover:shadow-orange-500/30">
                {/* IMAGE */}
                <div className="overflow-hidden rounded-2xl">
                  <img
                  src={item.image}
                    alt={item.name}
                      className="h-44 w-full object-cover rounded-2xl bg-gray-800"/>
                        </div>

                {/* CONTENT */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold text-lg text-white">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {item.description || "Delicious and freshly prepared meal"}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-orange-500 font-bold text-lg">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => {
                        setCartItems((prev) => [...prev, item]);
                        setCartOpen(true);
                      }}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md transition active:scale-95"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>

                <button className="hidden md:block text-sm text-orange-400 hover:text-orange-300 transition">
          View All →
        </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE HINT */}
      <p className="text-gray-500 text-sm mt-6 text-center md:hidden">
        Swipe to explore →
      </p>
    </section>
  );
};

export default MenuSection;