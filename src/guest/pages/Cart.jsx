import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { ensureCustomer, createSalesOrder } from "../../services/ordersAPI";

export default function Cart() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);

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

  const subtotal = getTotalPrice();
  const shipping = cartItems.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

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

      // Prepare order items
      const items = cartItems.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        price_per_unit: formatPrice(item.price),
      }));

      // Create order
      const order = await createSalesOrder({
        customerId: customer.id,
        items,
        totalAmount: total,
        discountApplied: 0,
        netAmount: total,
        orderType: "sales",
        notes: `Sizes: ${cartItems.map(i => i.size || "-").join(", ")}`,
      });

      // Clear cart
      clearCart();

      // Navigate to success page or orders
      alert(`Order berhasil dibuat! Order ID: ${order.id.substring(0, 8)}`);
      navigate("/guest/my-orders");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Gagal membuat order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-6xl text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-8">Belum ada produk di keranjang Anda</p>
          <Link
            to="/guest/products"
            className="inline-block px-8 py-3 bg-gradient-to-r from-plum-500 to-gold-500 text-white font-bold rounded-xl hover:shadow-xl transition"
          >
            Mulai Belanja
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
          to="/guest/products"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-plum-600 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Lanjut Belanja</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Keranjang Belanja</h1>
          <p className="text-gray-600">{cartItems.length} item di keranjang Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="flex justify-between text-gray-600">
                  <span>Ongkir</span>
                  <span>{formatRupiah(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span className="text-plum-600">{formatRupiah(total)}</span>
              </div>

              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Login dulu yuk!</strong> Login untuk mendapatkan poin loyalitas dan diskon member.
                  </p>
                </div>
              )}

              {user && profile && (
                <div className="bg-gradient-to-br from-plum-50 to-gold-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Member {profile.member_level}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    Poin Anda: <strong>{profile.loyalty_points}</strong>
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-plum-500 to-gold-500 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Checkout Sekarang"}
              </button>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <p>✓ Pembayaran aman dan terpercaya</p>
                <p>✓ Gratis ongkir untuk member Silver keatas</p>
                <p>✓ Garansi kualitas produk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
