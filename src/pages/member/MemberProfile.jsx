import { FaUser, FaEnvelope, FaStar, FaGift } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

export default function MemberProfile() {
  const { profile, user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-plum-400 to-gold-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
            {(profile?.full_name || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profile?.full_name}</h2>
            <p className="text-gray-500 flex items-center gap-2 mt-2">
              <FaEnvelope className="text-sm" />
              {user?.email || "-"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaStar className="text-2xl text-yellow-600" />
              <span className="font-semibold text-gray-700">Member Level</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{profile?.member_level || "Bronze"}</p>
            <p className="text-sm text-gray-500 mt-2">Status membership Anda</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaGift className="text-2xl text-pink-600" />
              <span className="font-semibold text-gray-700">Loyalty Points</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{profile?.loyalty_points || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Poin yang terkumpul</p>
          </div>

          <div className="bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaUser className="text-2xl text-plum-600" />
              <span className="font-semibold text-gray-700">Status</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">Aktif</p>
            <p className="text-sm text-gray-500 mt-2">Member aktif</p>
          </div>
        </div>
      </div>

      {/* Membership Benefits */}
      <div className="bg-white rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Keuntungan Membership</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">Bronze</h4>
            <p className="text-sm text-gray-600 mb-3">Belanja Rp 0 - Rp 1.000.000</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">0% Diskon</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">Silver</h4>
            <p className="text-sm text-gray-600 mb-3">Belanja Rp 1.000.000 - Rp 5.000.000</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">5% Diskon</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">Gold</h4>
            <p className="text-sm text-gray-600 mb-3">Belanja Rp 5.000.000 - Rp 15.000.000</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">10% Diskon</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">Platinum</h4>
            <p className="text-sm text-gray-600 mb-3">Belanja > Rp 15.000.000</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-plum-100 text-plum-600 rounded-full text-sm font-semibold">15% Diskon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4">Tips Maksimalkan Membership</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-semibold">Belanja Lebih Banyak</p>
              <p className="text-sm text-purple-100">Tingkatkan level membership untuk diskon lebih besar</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold">Kumpulkan Poin</p>
              <p className="text-sm text-purple-100">Setiap Rp 10.000 belanja = 1 poin loyalty</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-semibold">Dapatkan Promo</p>
              <p className="text-sm text-purple-100">Member eksklusif mendapat akses promo spesial</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
