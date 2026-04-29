import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  ArrowLeft,
  ForkKnifeCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusFlow = [
  "pending",
  "confirmed",
  "cooking",
  "out for delivery",
  "delivered",
];

const statusVideos = {
  pending: "/videos/pending.mp4",
  confirmed: "/videos/confirmed.mp4",
  cooking: "/videos/cooking.mp4",
  "out for delivery": "/videos/Delivery.mp4",
  delivered: "/videos/delivered.mp4",
};

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TrackOrder() {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();

  const statusIndex = statusFlow.indexOf(status);

  // LOAD ORDER
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentOrder"));
    if (stored) setOrder(stored);
  }, []);

  // BACKEND STATUS
  useEffect(() => {
  if (!order) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${API}/api/orders/${order._id}`);
      const data = await res.json();

      setStatus(data.status);

      //  ADD THIS BLOCK
      if (data.status === "delivered") {
        // remove current order
        localStorage.removeItem("currentOrder");

        // optional: redirect to history
        setTimeout(() => {
          navigate("/history");
        }, 2000);
      }

    } catch (err) {
      console.log(err);
    }
  }, 2000);

  return () => clearInterval(interval);
}, [order]);

  // NO ORDER
  if (!order || !order.items || order.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white p-6">

        <button
          onClick={() => navigate(-1)}
          className="fixed top-6 left-6 flex items-center gap-2 
          bg-orange-500 px-3 py-2 rounded-lg shadow hover:bg-orange-600"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-gray-900 p-8 rounded-2xl text-center border border-gray-800">
          <ForkKnifeCrossed size={40} className="mx-auto mb-3 text-white" />
          <h2 className="text-lg font-semibold text-white">No Orders Available</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-orange-500 px-5 py-2 rounded-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 flex items-center gap-2 
        bg-orange-500 px-3 py-2 rounded-lg shadow hover:bg-orange-600"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* CARD */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 shadow-lg">

        {/* HEADER */}
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            <ForkKnifeCrossed size={18} />
            Order #{order._id?.slice(-5)}
          </h2>

          <p className="text-xl text-orange-400 mt-1">
            ₹{order.total}
          </p>

          <p className="text-sm mt-1 flex items-center gap-1">
            <Clock size={14} />
            <span className="text-orange-500 capitalize">{status}</span>
          </p>
        </div>

        {/* CUSTOMER */}
        <div className="p-5 border-b border-gray-800 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <MapPin size={14} /> {order.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} /> {order.phone}
          </p>
        </div>

        {/* VIDEO */}
        <div className="flex flex-col items-center p-5">
          <video
            src={statusVideos[status]}
            autoPlay
            muted
            loop
            className="w-40 h-40 rounded-lg object-cover"
          />

          <p className="mt-3 text-orange-500 font-semibold capitalize">
            {status}
          </p>
        </div>

        {/* PROGRESS BAR (BACK TO YOUR ORIGINAL STYLE) */}
        <div className="flex justify-between px-6 pb-5">
          {statusFlow.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  i <= statusIndex
                    ? "bg-orange-500"
                    : "bg-gray-600"
                }`}
              />
              <p className="text-[10px] mt-1 text-gray-400 capitalize">
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* SUCCESS */}
        {status === "delivered" && (
          <div className="text-center pb-5 text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle size={16} />
            Delivered Successfully
          </div>
        )}
      </div>
    </div>
  );
}