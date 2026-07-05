import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaTag } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { ensureCustomer, createSalesOrder, updateMembershipTier } from "../../services/ordersAPI";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

export default function MemberCart() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  // Member discount berdasarkan level
  const memberDiscounts = {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  };

  const memberDiscount = memberDiscounts[profile?.member_level] || 0;

  const formatPrice = (price) => {
    if (typeof price === "number") return price;
    return parseFloat(price.replace(/[^0-9]/g, ""));
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Ongkir gratis untuk member Silver ke atas (sesuai janji di ringkasan pesanan)
  const isFreeShipping = ["Silver", "Gold", "Platinum"].includes(profile?.member_level);
  const shippingFee = 15000;

  const subtotal = getTotalPrice();
  const discountAmount = subtotal * memberDiscount;
  const afterDiscount = subtotal - discountAmount;
  const shipping = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : shippingFee;
  const total = afterDiscount + shipping;

  const handleCheckout = async () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk checkout");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Keranjang Anda kosong");
      return;
    }

    setLoading(true);
    try {
      // Get customer info from profile
      const customerInfo = {
        full_name: profile.full_name,
        email: user.email,
        phone: profile.phone || "",
      };

      // Ensure customer record exists
      const customer = await ensureCustomer(customerInfo, user.id);

      // Prepare order items with original prices
      const items = cartItems.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        price_per_unit: formatPrice(item.price),
      }));

      // Create order with member discount applied
      const order = await createSalesOrder({
        customerId: customer.id,
        items,
        totalAmount: subtotal,
        discountApplied: discountAmount,
        netAmount: total,
        orderType: "sales",
        notes: `Member ${profile.member_level} - Diskon ${(memberDiscount * 100).toFixed(0)}% | Sizes: ${cartItems.map(i => i.size || "-").join(", ")}`,
      });

      // Update membership tier after successful order
      try {
        await updateMembershipTier(customer.id);
        console.log("✅ Membership tier updated after order");
      } catch (tierError) {
        console.error("⚠️ Failed to update tier, but order successful:", tierError);
      }

      // Clear cart
      clearCart();

      // Navigate to orders page
      alert(`Order berhasil dibuat! Order ID: ${order.id.substring(0, 8)}\nTotal: ${formatRupiah(total)}\nHemat: ${formatRupiah(discountAmount)}\n\n💡 Membership tier Anda akan diupdate setelah order selesai!`);
      navigate("/member/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Gagal membuat order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-6xl text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-8">Belum ada produk di keranjang Anda</p>
          <Button
            variant="gradient"
            onClick={() => navigate("/member/products")}
          >
            Mulai Belanja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-plum-500 to-gold-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Keranjang Belanja</h1>
            <p className="text-plum-100">{cartItems.length} item di keranjang Anda</p>
          </div>
          <Badge variant="white" className="text-plum-600 font-bold text-lg">
            <FaTag className="inline mr-2" />
            Member {profile?.member_level}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="flex gap-4 text-sm text-gray-600 mb-3">
                    {item.size && <span>Ukuran: <strong>{item.size}</strong></span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg font-bold hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-plum-600">
                        {formatRupiah(formatPrice(item.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              
              {memberDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-2">
                    <FaTag />
                    Diskon Member ({(memberDiscount * 100).toFixed(0)}%)
                  </span>
                  <span className="font-semibold">-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Ongkir</span>
                {isFreeShipping ? (
                  <span className="flex items-center gap-2">
                    <span className="line-through text-gray-400 text-sm">{formatRupiah(shippingFee)}</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </span>
                ) : (
                  <span>{formatRupiah(shipping)}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span className="text-plum-600">{formatRupiah(total)}</span>
            </div>

            {memberDiscount > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-gold-50 rounded-xl p-4 mb-4 border border-green-200">
                <p className="text-sm font-bold text-green-700 mb-1">
                  🎉 Anda Hemat {formatRupiah(discountAmount)}!
                </p>
                <p className="text-xs text-gray-600">
                  Berkat status Member {profile.member_level} Anda
                </p>
              </div>
            )}

            <div className="bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Member {profile.member_level}</strong>
              </p>
              <p className="text-xs text-gray-600">
                Poin Anda: <strong>{profile.loyalty_points}</strong>
              </p>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              variant="gradient"
              className="w-full"
            >
              {loading ? "Memproses..." : "Checkout Sekarang"}
            </Button>

            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <p>✓ Pembayaran aman dan terpercaya</p>
              <p>✓ Gratis ongkir untuk member Silver keatas</p>
              <p>✓ Garansi kualitas produk</p>
              <p>✓ Diskon otomatis sesuai member level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
