import { Utensils, ShoppingCart, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Utensils />,
      title: "Choose Food",
      desc: "Browse and select from a variety of delicious meals.",
    },
    {
      icon: <ShoppingCart />,
      title: "Add to Cart",
      desc: "Customize your order and add items to your cart easily.",
    },
    {
      icon: <Truck />,
      title: "Fast Delivery",
      desc: "Get your food delivered hot and fresh to your doorstep.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-950 to-black py-24 px-6 md:px-20 text-center overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full"></div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight text-white">
        How It <span className="text-orange-500">Works</span>
      </h2>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-10 relative z-10">

        {steps.map((step, i) => (
          <div
            key={i}
            className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-orange-500/20 transition duration-300"
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-black w-8 h-8 flex items-center justify-center rounded-full font-bold shadow">
              {i + 1}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-orange-500/10 rounded-xl">
                {step.icon &&
                  (step.icon.type
                    ? (
                        <step.icon.type className="w-8 h-8 text-orange-500" />
                      )
                    : step.icon)}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HowItWorks;