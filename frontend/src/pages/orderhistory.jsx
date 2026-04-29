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
    <div className="min-h-screen bg-gray-950 text-white p-6">

       <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 flex items-center gap-2 
          bg-orange-500 px-3 py-2 rounded-lg shadow hover:bg-orange-600"
        >
          <ArrowLeft size={16} /> Back
        </button>

      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No past orders</p>
      ) : (
        <div className="space-y-5">
 {orders.map((order) => (
  <div
    key={order._id}
    className="flex items-center justify-between bg-gray-900 p-5 rounded-xl border border-gray-800"
  >

    {/* LEFT SECTION */}
    <div className="flex-1">

      {/* TOP ROW */}
      <div className="flex justify-between items-center">
        <p className="text-orange-400 font-semibold text-xl ml-7">
          ₹{order.total}
        </p>

      </div>

    <p className="text-m text-gray-300 mt-1">
  <span className="font-medium text-yellow-400">
    {order.items[0]?.name}
  </span>

  {order.items.length > 1 && (
    <span className="text-gray-400">
      {" "}+ {order.items.length - 1} more items
    </span>
  )}
</p>
                {/* ADDRESS */}
                <p className="flex gap-6 text-xs text-gray-400 mt-2 -translate-y-6">
                  <MapPin size={14} />
                  {order.address}
                </p>

                {/* PHONE */}
                <p className="flex gap-6 text-xs text-gray-400 mt-2 -translate-y-5">
                  <Phone size={14} />
                  {order.phone}
                </p>

                {/* DATE */}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                {/* STATUS */}
                <p className="flex items-center gap-2 text-green-400 text-sm -translate-y-6">
                  <CheckCircle size={16} />
                  Delivered
                </p>
              </div>

              {/* RIGHT SIDE VIDEO */}
              <div>
                <video
                  src="/videos/delivered.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-21 h-21 rounded-full object-cover border border-green-700"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}