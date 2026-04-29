import { Flame } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-28 gap-16 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full"></div>

      {/* TEXT */}
      <div className="max-w-xl z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white">
          Food That <br />
          <span className="text-orange-500 inline-flex items-center gap-3">
            Hits Different <Flame className="w-8 h-8" />
          </span>
        </h1>

        <p className="text-gray-300 mb-10 text-lg md:text-xl leading-relaxed">
          Experience premium food delivery with unmatched speed and taste.
          Fresh meals crafted for your cravings — anytime, anywhere.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-xl font-semibold shadow-lg text-lg">
            Order Now
          </button>

          <button className="px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-xl text-lg">
            Explore Menu
          </button>
        </div>
      </div>

      {/* VIDEO */}
      <div className="relative z-10 flex justify-center">
        <video
          src="/puttyhome.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-[320px] sm:w-[420px] md:w-[520px] lg:w-[650px] rounded-3xl shadow-[0_0_60px_rgba(255,115,0,0.25)] border border-gray-800 object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;