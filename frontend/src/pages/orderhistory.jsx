import { useEffect, useState } from "react";
import { CheckCircle, MapPin, Phone,ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const userId = localStorage.getItem("userId");

export default function History() {
  const [orders, setOrders] = useState([]);

   const navigate = useNavigate();


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API}/api/orders/history/all?userId=${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

 return (
  <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 py-6">

    {/* BACK BUTTON */}
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 
      bg-orange-500 px-3 py-2 rounded-lg shadow hover:bg-orange-600 z-50"
    >
      <ArrowLeft size={16} /> Back
    </button>

    {/* TITLE */}
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 mt-12">
      Order History
    </h1>

    {orders.length === 0 ? (
      <p className="text-gray-400">No past orders</p>
    ) : (
      <div className="space-y-5">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 p-4 sm:p-5 rounded-xl border border-gray-800 hover:bg-gray-800 transition"
          >

            {/* LEFT SECTION */}
            <div className="space-y-4">

              {/* TOP ROW */}
              <div className="flex justify-between items-center">
                <p className="text-orange-400 font-semibold text-lg sm:text-xl">
                  ₹{order.total}
                </p>
              </div>

              {/* ITEMS */}
              <p className="text-sm sm:text-base text-gray-300">
                <span className="font-medium text-yellow-400">
                  {order.items[0]?.name}
                </span>

                {order.items.length > 1 && (
                  <span className="text-gray-400">
                    {" "}+ {order.items.length - 1} more items
                  </span>
                )}
              </p>

              {/* INFO CARD */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800 p-4 rounded-lg">

                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-1">

                  <p className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                    <MapPin size={14} className="mt-[2px]" />
                    <span>{order.address}</span>
                  </p>

                  <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <Phone size={14} />
                    <span>{order.phone}</span>
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <p className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle size={16} />
                    Delivered
                  </p>

                </div>

                {/* VIDEO */}
                <div className="self-center sm:self-auto">
                  <video
                    src="/videos/delivered.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border border-green-700"
                  />
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>
    )}
  </div>
);
}