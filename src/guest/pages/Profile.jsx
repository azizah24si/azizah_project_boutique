import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaStar, FaGift, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getMyOrders } from "../../services/ordersAPI";

export default function Profile() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-8">Silakan login untuk melihat profil Anda</p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transition"
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
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-cyan-600 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Kembali</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Profil Saya</h1>
          <p className="text-gray-600">Kelola informasi dan status membership Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shrink-0">
              {(profile?.full_name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{profile?.full_name}</h2>
              <p className="text-gray-500 flex items-center gap-2 mt-2 justify-center md:justify-start">
                <FaEnvelope className="text-sm" />
                {user?.email || "-"}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaStar className="text-2xl text-yellow-600" />
                <span className="font-semibold text-gray-700">Member Level</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{profile?.member_level || "Bronze"}</p>
              <p className="text-sm text-gray-500 mt-2">Status membership</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaGift className="text-2xl text-pink-600" />
                <span className="font-semibold text-gray-700">Loyalty Points</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{profile?.loyalty_points || 0}</p>
              <p className="text-sm text-gray-500 mt-2">Poin terkumpul</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaShoppingBag className="text-2xl text-cyan-600" />
                <span className="font-semibold text-gray-700">Total Pesanan</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {loading ? "..." : orders.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Pesanan dibuat</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💰</span>
                <span className="font-semibold text-gray-700">Total Belanja</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {loading ? "..." : `Rp ${(totalSpent / 1000).toFixed(0)}k`}
              </p>
              <p className="text-sm text-gray-500 mt-2">Transaksi selesai</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link to="/guest/products" className="block">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <FaShoppingBag className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Belanja Sekarang</h3>
                  <p className="text-sm text-gray-500">Lihat katalog produk kami</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/guest/my-orders" className="block">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <FaStar className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Riwayat Pesanan</h3>
                  <p className="text-sm text-gray-500">Lihat pesanan Anda</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Membership Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Tingkatan Membership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-800">Bronze</h4>
                <span className="text-3xl">🥉</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Belanja Rp 0 - Rp 1.000.000</p>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold">0% Diskon</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-800">Silver</h4>
                <span className="text-3xl">🥈</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Belanja Rp 1.000.000 - Rp 5.000.000</p>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold">5% Diskon</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-800">Gold</h4>
                <span className="text-3xl">🥇</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Belanja Rp 5.000.000 - Rp 15.000.000</p>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-yellow-200 text-yellow-700 rounded-lg text-sm font-bold">10% Diskon</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border-2 border-cyan-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-800">Platinum</h4>
                <span className="text-3xl">💎</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Belanja &gt; Rp 15.000.000</p>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-cyan-200 text-cyan-700 rounded-lg text-sm font-bold">15% Diskon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-6">💡 Tips Maksimalkan Membership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">💰</span>
              <div>
                <p className="font-bold text-lg mb-1">Belanja Lebih Banyak</p>
                <p className="text-sm text-purple-100">Tingkatkan level membership untuk diskon lebih besar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">🎁</span>
              <div>
                <p className="font-bold text-lg mb-1">Kumpulkan Poin</p>
                <p className="text-sm text-purple-100">Setiap Rp 10.000 belanja = 1 poin loyalty</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">⭐</span>
              <div>
                <p className="font-bold text-lg mb-1">Dapatkan Promo</p>
                <p className="text-sm text-purple-100">Member eksklusif mendapat akses promo spesial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
