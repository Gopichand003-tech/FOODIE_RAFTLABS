import { Flame } from "lucide-react";

const Offers = () => {
  return (
    <section className="relative px-6 md:px-20 py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 blur-3xl rounded-full"></div>

      {/* OFFER CARD */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-orange-400/20">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full shadow">
            <Flame className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Limited Time Offer
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
          Enjoy <span className="font-bold">50% OFF</span> on your first order.
          Fresh, hot meals delivered instantly — don’t miss out!
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-900 transition shadow-lg active:scale-95">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offers;