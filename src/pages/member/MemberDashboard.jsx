import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaStar, FaGift, FaHistory, FaCheckCircle } from "react-icons/fa";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { productsAPI } from "../../services/productsAPI";
import { customersAPI } from "../../services/customersAPI";
import { ordersAPI } from "../../services/ordersAPI";
import {
  getDiscountRate,
  calculatePoints,
  getTierFromSpending,
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

// Tier spending thresholds for progress display
const tierThresholds = {
  Bronze: { min: 0, max: 1000000 },
  Silver: { min: 1000000, max: 5000000 },
  Gold: { min: 5000000, max: 15000000 },
  Platinum: { min: 15000000, max: null },
};

export default function MemberDashboard() {
  const { profile, refreshProfile } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [loading, setLoading] = useState(true);

  // Checkout modal state
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [placing, setPlacing] = useState(false);

  // Fetch products and member orders
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all products for the checkout dropdown
      const productsData = await productsAPI.getAll();
      setProducts(productsData);

      // Find the member's customer record by user_id
      const { data: customer } = await supabase
        .from("customers")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (customer) {
        // Fetch member's orders
        const orders = await ordersAPI.getByCustomerId(customer.id);
        setRecentOrders(orders.slice(0, 5));

        // Calculate total spending from completed orders
        const completed = orders.filter((o) => o.status === "completed");
        const spending = completed.reduce(
          (sum, o) => sum + Number(o.net_amount),
          0
        );
        setTotalSpending(spending);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get selected product for checkout preview
  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const discountRate = getDiscountRate(profile?.member_level || "Bronze");
  const discountAmount = totalPrice * discountRate;
  const netAmount = totalPrice - discountAmount;
  const pointsEarned = calculatePoints(netAmount);

  // Place order: creates customer if needed, then creates sales_order + updates profile
  const handlePlaceOrder = async () => {
    if (!selectedProduct) return;
    setPlacing(true);

    try {
      // 1. Find or create the member's customer record
      const customer = await customersAPI.findOrCreate({
        full_name: profile.full_name,
        email: profile.email || `${profile.id}@member.local`,
        phone: "",
        user_id: profile.id,
      });

      // 2. Create the sales order with order items
      await ordersAPI.create({
        customer_id: customer.id,
        total_amount: totalPrice,
        discount_applied: discountAmount,
        net_amount: netAmount,
        status: "pending",
        order_type: "sales",
        items: [
          {
            product_id: selectedProduct.id,
            product_name: selectedProduct.name,
            quantity: quantity,
            price_per_unit: selectedProduct.price,
          },
        ],
      });

      // 3. Update loyalty points on the profile
      const newPoints = (profile.loyalty_points || 0) + pointsEarned;

      // 4. Recalculate tier based on total completed spending + this order
      // (pending orders don't count toward tier, but we update points immediately)
      const newTier = getTierFromSpending(totalSpending + netAmount);

      await supabase
        .from("profiles")
        .update({
          loyalty_points: newPoints,
          member_level: newTier,
        })
        .eq("id", profile.id);

      // 5. Refresh the auth context profile
      await refreshProfile();

      addToast({
        title: "Pesanan berhasil dibuat!",
        description: `Kamu mendapatkan ${pointsEarned} loyalty points.`,
        variant: "success",
      });

      setShowCheckout(false);
      setSelectedProductId("");
      setQuantity(1);
      fetchData();
    } catch (err) {
      addToast({
        title: "Gagal membuat pesanan",
        description: err.message,
        variant: "error",
      });
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Tier progress calculation
  const currentTier = profile?.member_level || "Bronze";
  const tierRange = tierThresholds[currentTier];
  const tierProgress = tierRange.max
    ? Math.min(100, ((totalSpending - tierRange.min) / (tierRange.max - tierRange.min)) * 100)
    : 100;

  return (
    <div className="space-y-6">
      {/* MEMBER INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Welcome Card */}
        <Card className="p-6 bg-gradient-to-br from-cyan-400 to-teal-500 text-white col-span-1 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaStar className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Halo, {profile?.full_name}!</h2>
              <p className="text-sm opacity-90 mt-1">
                Selamat datang di Member Dashboard
              </p>
            </div>
          </div>
        </Card>

        {/* Points Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FaGift className="text-2xl text-cyan-500" />
            <Badge variant={tierColors[currentTier]}>{currentTier}</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {profile?.loyalty_points || 0}
          </p>
          <p className="text-sm text-gray-500">Loyalty Points</p>
        </Card>

        {/* Discount Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FaStar className="text-2xl text-yellow-500" />
            <Badge variant="green">{discountRate * 100}% Off</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(totalSpending)}
          </p>
          <p className="text-sm text-gray-500">Total Belanja</p>
        </Card>
      </div>

      {/* TIER PROGRESS */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-gray-800">Status Membership</h3>
            <p className="text-sm text-gray-500">
              Tier saat ini: <span className="font-semibold">{currentTier}</span>
            </p>
          </div>
          {tierRange.max && (
            <p className="text-sm text-gray-500">
              Belanja {formatCurrency(tierRange.max - totalSpending)} lagi untuk naik tier!
            </p>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-cyan-400 to-teal-500 h-3 rounded-full transition-all"
            style={{ width: `${Math.max(tierProgress, 5)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Bronze</span>
          <span>Silver</span>
          <span>Gold</span>
          <span>Platinum</span>
        </div>
      </Card>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Order */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaShoppingBag className="text-2xl text-cyan-500" />
            <h3 className="font-bold text-gray-800">Beli Produk</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Pilih produk dan checkout dengan diskon membership kamu.
          </p>
          <Button onClick={() => setShowCheckout(true)}>
            Mulai Belanja
          </Button>
        </Card>

        {/* View Orders */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaHistory className="text-2xl text-purple-500" />
            <h3 className="font-bold text-gray-800">Riwayat Pembelian</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Lihat semua transaksi yang pernah kamu lakukan.
          </p>
          <Link to="/member/orders">
            <Button variant="secondary">Lihat Riwayat</Button>
          </Link>
        </Card>
      </div>

      {/* RECENT ORDERS */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Pesanan Terbaru</h3>
          <Link to="/member/orders" className="text-sm text-cyan-500 font-semibold hover:underline">
            Lihat Semua
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center text-white">
                    <FaShoppingBag className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {order.order_items?.[0]?.product_name || "Order"}
                      {order.order_items?.length > 1 && ` +${order.order_items.length - 1}`}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(order.created_at)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cyan-500 text-sm">
                    {formatCurrency(order.net_amount)}
                  </p>
                  <Badge
                    variant={
                      order.status === "completed" ? "green" :
                      order.status === "pending" ? "yellow" : "red"
                    }
                    size="sm"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* CHECKOUT MODAL */}
      <Modal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        title="Checkout Produk"
        description="Pilih produk dan quantity untuk membuat pesanan baru"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handlePlaceOrder} loading={placing}>
              {placing ? "Memproses..." : `Buat Pesanan (${formatCurrency(netAmount)})`}
            </Button>
            <Button variant="secondary" onClick={() => setShowCheckout(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select
            label="Pilih Produk"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            placeholder="Pilih produk..."
            options={products.map((p) => ({
              value: p.id,
              label: `${p.name} - ${formatCurrency(p.price)}`,
            }))}
          />

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">
              Jumlah
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center border border-gray-200 rounded-lg font-bold focus:border-cyan-400 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Price breakdown */}
          {selectedProduct && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Diskon ({discountRate * 100}%)</span>
                <span className="text-red-500">- {formatCurrency(discountAmount)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-200 pt-2">
                <span>Total Bayar</span>
                <span className="text-cyan-500">{formatCurrency(netAmount)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span><FaGift className="inline mr-1" />Points yang didapat</span>
                <span className="font-semibold text-green-500">+{pointsEarned} points</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
