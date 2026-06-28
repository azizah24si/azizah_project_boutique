import { useState, useEffect, useCallback } from "react";
import {
  FaUser,
  FaEnvelope,
  FaStar,
  FaGift,
  FaCrown,
  FaCheckCircle,
} from "react-icons/fa";

import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import {
  getDiscountRate,
  formatCurrency,
  formatDate,
} from "../../utils/membership";

// Tier color mapping for badges
const tierColors = {
  Bronze: "orange",
  Silver: "gray",
  Gold: "yellow",
  Platinum: "cyan",
};

// Tier spending thresholds
const tierThresholds = [
  { name: "Bronze", min: 0, max: 1000000, discount: "0%", color: "orange" },
  { name: "Silver", min: 1000000, max: 5000000, discount: "5%", color: "gray" },
  { name: "Gold", min: 5000000, max: 15000000, discount: "10%", color: "yellow" },
  { name: "Platinum", min: 15000000, max: null, discount: "15%", color: "cyan" },
];

export default function MemberProfile() {
  const { profile, user, refreshProfile } = useAuth();
  const { addToast } = useToast();
  const [totalSpending, setTotalSpending] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");

  // Fetch member's total spending from completed orders
  const fetchSpending = useCallback(async () => {
    if (!profile?.id) return;
    setLoading(true);
    try {
      const { data: customer, error: custError } = await supabase
        .from("customers")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (custError && custError.code !== "PGRST116") throw custError;

      if (customer) {
        const { data: orders } = await supabase
          .from("sales_orders")
          .select("net_amount, status")
          .eq("customer_id", customer.id);

        if (orders) {
          setOrdersCount(orders.length);
          const completed = orders.filter((o) => o.status === "completed");
          const spending = completed.reduce(
            (sum, o) => sum + Number(o.net_amount),
            0
          );
          setTotalSpending(spending);
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    fetchSpending();
  }, [fetchSpending]);

  useEffect(() => {
    setFullName(profile?.full_name || "");
  }, [profile]);

  // Save profile edits
  const handleSave = async () => {
    if (!fullName.trim()) {
      addToast({
        title: "Nama tidak boleh kosong",
        variant: "error",
      });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim() })
        .eq("id", profile.id);

      if (error) throw error;

      await refreshProfile();
      addToast({
        title: "Profil berhasil diperbarui!",
        variant: "success",
      });
      setEditing(false);
    } catch (err) {
      addToast({
        title: "Gagal memperbarui profil",
        description: err.message,
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const currentTier = profile?.member_level || "Bronze";
  const discountRate = getDiscountRate(currentTier);

  // Tier progress calculation
  const currentThreshold = tierThresholds.find((t) => t.name === currentTier);
  const tierProgress = currentThreshold?.max
    ? Math.min(
        100,
        ((totalSpending - currentThreshold.min) /
          (currentThreshold.max - currentThreshold.min)) *
          100
      )
    : 100;

  const nextTier =
    currentTier !== "Platinum"
      ? tierThresholds.find((t) => t.name !== currentTier && t.min > totalSpending)
      : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen space-y-6">
      <PageHeader title="Profil Membership" breadcrumb={["Member", "Profil"]} />

      {/* PROFILE INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {(profile?.full_name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-2">
                  <Input
                    label="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} loading={saving}>
                      Simpan
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditing(false);
                        setFullName(profile?.full_name || "");
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800">
                    {profile?.full_name}
                  </h2>
                  <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
                    <FaEnvelope className="text-xs" />
                    {user?.email || "-"}
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-xs text-cyan-500 font-semibold hover:underline mt-2"
                  >
                    Edit Nama
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Tier Badge Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <FaCrown className="text-2xl text-yellow-500" />
            <Badge variant={tierColors[currentTier]}>{currentTier}</Badge>
          </div>
          <p className="text-sm text-gray-500">Diskon Membership</p>
          <p className="text-2xl font-bold text-gray-800">
            {discountRate * 100}%
          </p>
        </Card>
      </div>

      {/* TIER PROGRESS */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-gray-800">Status Membership</h3>
            <p className="text-sm text-gray-500">
              Total belanja:{" "}
              <span className="font-semibold text-cyan-500">
                {formatCurrency(totalSpending)}
              </span>
            </p>
          </div>
          {nextTier && (
            <p className="text-sm text-gray-500 text-right">
              Belanja{" "}
              <span className="font-semibold">
                {formatCurrency(nextTier.min - totalSpending)}
              </span>{" "}
              lagi untuk naik ke <span className="font-semibold">{nextTier.name}</span>!
            </p>
          )}
          {currentTier === "Platinum" && (
            <p className="text-sm text-green-500 font-semibold">
              Tier tertinggi tercapai!
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-teal-500 h-4 rounded-full transition-all"
            style={{ width: `${Math.max(tierProgress, 5)}%` }}
          ></div>
        </div>

        {/* Tier markers */}
        <div className="flex justify-between mt-2 text-xs">
          {tierThresholds.map((tier) => (
            <div
              key={tier.name}
              className={`text-center ${
                tier.name === currentTier
                  ? "font-bold text-cyan-500"
                  : "text-gray-400"
              }`}
            >
              <span>{tier.name}</span>
              {tier.name === currentTier && (
                <FaCheckCircle className="inline ml-1 text-xs" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* TIER BREAKDOWN TABLE */}
      <Card className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">Detail Tingkatan Member</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-500">
                  Tier
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">
                  Minimum Belanja
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">
                  Maksimum Belanja
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">
                  Diskon
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tierThresholds.map((tier) => (
                <tr
                  key={tier.name}
                  className={`border-b border-gray-100 ${
                    tier.name === currentTier ? "bg-cyan-50" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FaCrown
                        className={
                          tier.name === currentTier
                            ? "text-cyan-500"
                            : "text-gray-300"
                        }
                      />
                      <span
                        className={`font-semibold ${
                          tier.name === currentTier
                            ? "text-cyan-600"
                            : "text-gray-600"
                        }`}
                      >
                        {tier.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatCurrency(tier.min)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {tier.max ? formatCurrency(tier.max) : "Tanpa Batas"}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={tier.color} size="sm">
                      {tier.discount}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {tier.name === currentTier ? (
                      <Badge variant="green" size="sm" dot>
                        Aktif
                      </Badge>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* LOYALTY POINTS & STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FaGift className="text-2xl text-cyan-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {profile?.loyalty_points || 0}
          </p>
          <p className="text-sm text-gray-500">Loyalty Points</p>
          <p className="text-xs text-gray-400 mt-2">
            Didapat dari setiap kelipatan Rp 10.000 belanja
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FaStar className="text-2xl text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{ordersCount}</p>
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <p className="text-xs text-gray-400 mt-2">
            Termasuk semua status pesanan
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FaUser className="text-2xl text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatDate(profile?.created_at)}
          </p>
          <p className="text-sm text-gray-500">Bergabung Sejak</p>
        </Card>
      </div>
    </div>
  );
}
