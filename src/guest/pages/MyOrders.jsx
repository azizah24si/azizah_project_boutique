import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaCalendar, FaClock, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getMyOrders } from "../../services/ordersAPI";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    pending: "Pending",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  const typeIcons = {
    sales: <FaShoppingBag className="text-plum-500" />,
    reservation: <FaCalendar className="text-purple-500" />,
  };

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.order_type === activeTab);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-8">Silakan login untuk melihat pesanan Anda</p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white font-bold rounded-xl hover:shadow-xl transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/guest/home"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-plum-600 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Kembali</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pesanan Saya</h1>
          <p className="text-gray-600">Lihat status pesanan dan reservasi Anda</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "all"
                ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "sales"
                ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pembelian ({orders.filter(o => o.order_type === "sales").length})
          </button>
          <button
            onClick={() => setActiveTab("reservation")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "reservation"
                ? "bg-gradient-to-r from-plum-500 to-gold-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Reservasi ({orders.filter(o => o.order_type === "reservation").length})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-plum-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Memuat pesanan...</p>
          </div>
        )}

        {/* Orders List */}
        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-600 mb-8">Mulai belanja dan lihat pesanan Anda di sini</p>
            <Link
              to="/guest/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white font-bold rounded-xl hover:shadow-xl transition"
            >
              Belanja Sekarang
            </Link>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl flex items-center justify-center">
                      {typeIcons[order.order_type]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {order.order_type === "sales" ? "Pembelian" : "Reservasi"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order ID: {order.id.substring(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tanggal Order</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {new Date(order.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    {order.order_type === "reservation" && order.reservation_date && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Jadwal Reservasi</p>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <FaClock className="text-purple-500" />
                          {new Date(order.reservation_date).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-700">
                          • {item.product_name} <span className="text-gray-500">x{item.quantity}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-bold text-plum-600">
                        Rp {order.net_amount?.toLocaleString("id-ID")}
                      </p>
                    </div>
                    {order.notes && (
                      <button className="text-sm text-plum-600 hover:underline">
                        Lihat Detail
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
