import { useState, useEffect } from "react";
import { FaShoppingBag, FaCalendar, FaClock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getMyOrders } from "../../services/ordersAPI";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

export default function MemberOrders() {
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

  const statusVariants = {
    pending: "yellow",
    completed: "green",
    cancelled: "red",
  };

  const statusLabels = {
    pending: "Pending",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.order_type === activeTab);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Riwayat Pembelian</h1>
        <p className="text-gray-600 mt-1">Lihat semua pesanan dan reservasi Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-plum-50 to-plum-100 border-plum-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-plum-600 font-medium">Total Pesanan</p>
              <p className="text-3xl font-bold text-plum-900">{orders.length}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Selesai</p>
              <p className="text-3xl font-bold text-green-900">
                {orders.filter(o => o.status === "completed").length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-900">
                {orders.filter(o => o.status === "pending").length}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "all"
              ? "bg-plum-500 text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Semua ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "sales"
              ? "bg-plum-500 text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Pembelian ({orders.filter(o => o.order_type === "sales").length})
        </button>
        <button
          onClick={() => setActiveTab("reservation")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "reservation"
              ? "bg-plum-500 text-white shadow"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Reservasi ({orders.filter(o => o.order_type === "reservation").length})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <Card className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-plum-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Memuat pesanan...</p>
        </Card>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Pesanan</h3>
          <p className="text-gray-600 mb-8">Mulai belanja dan lihat pesanan Anda di sini</p>
          <a
            href="/guest/products"
            className="inline-block px-8 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white font-bold rounded-xl hover:shadow-xl transition"
          >
            Belanja Sekarang
          </a>
        </Card>
      )}

      {/* Orders List */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((order) => (
            <Card key={order.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl flex items-center justify-center">
                    {order.order_type === "sales" ? (
                      <FaShoppingBag className="text-plum-500 text-xl" />
                    ) : (
                      <FaCalendar className="text-purple-500 text-xl" />
                    )}
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
                <Badge variant={statusVariants[order.status]} dot>
                  {statusLabels[order.status]}
                </Badge>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tanggal Order</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
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
                  <p className="text-xs text-gray-500 mb-2 font-semibold">Items:</p>
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} x Rp {item.price_per_unit?.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-800">
                          Rp {(item.quantity * item.price_per_unit)?.toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Total Pembayaran</p>
                    <p className="text-2xl font-bold text-plum-600">
                      Rp {order.net_amount?.toLocaleString("id-ID")}
                    </p>
                  </div>
                  {order.notes && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Catatan:</p>
                      <p className="text-sm text-gray-600 italic">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
