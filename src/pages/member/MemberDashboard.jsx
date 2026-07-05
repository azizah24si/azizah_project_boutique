import { useState, useEffect } from "react";
import { FaShoppingBag, FaHistory, FaTag } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getMyOrders } from "../../services/ordersAPI";
import { getDiscountRate } from "../../utils/membership";
import MembershipCard from "../../components/MembershipCard";

export default function MemberDashboard() {
  const { profile, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders
    .filter(o => o.status === "completed")
    .reduce((sum, order) => sum + (order.net_amount || 0), 0);

  const discountPercent = (getDiscountRate(profile?.member_level) * 100).toFixed(0);

  return (
    <div className="p-6 space-y-6">
      {/* Membership Card — hero element of the member dashboard */}
      <MembershipCard
        name={profile?.full_name}
        tier={profile?.member_level || "Bronze"}
        points={profile?.loyalty_points || 0}
        totalSpending={totalSpent}
        memberSince={profile?.created_at}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-plum-100 rounded-xl flex items-center justify-center">
              <FaTag className="text-2xl text-plum-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Diskon Aktif</p>
              <p className="text-2xl font-bold text-gray-800">{discountPercent}%</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Otomatis diterapkan tiap checkout</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
              <FaShoppingBag className="text-2xl text-gold-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Pesanan</p>
              <p className="text-2xl font-bold text-gray-800">
                {loading ? "..." : orders.length}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Pesanan yang telah dibuat</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Belanja</p>
              <p className="text-xl font-bold text-gray-800">
                {loading ? "..." : `Rp ${(totalSpent / 1000).toFixed(0)}k`}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Total transaksi selesai</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/member/products" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-plum-400 to-gold-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <FaShoppingBag className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Belanja Sekarang</h3>
                <p className="text-sm text-gray-500">Lihat katalog produk kami</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/member/orders" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <FaHistory className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Riwayat Pesanan</h3>
                <p className="text-sm text-gray-500">Lihat pesanan Anda</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Keuntungan Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Diskon Eksklusif</p>
              <p className="text-sm text-gray-500">Dapatkan diskon sesuai level membership</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Loyalty Points</p>
              <p className="text-sm text-gray-500">Kumpulkan poin setiap transaksi</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Promo Spesial</p>
              <p className="text-sm text-gray-500">Akses promo khusus member</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Prioritas Layanan</p>
              <p className="text-sm text-gray-500">Dapatkan layanan prioritas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
