import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaSearch, FaBoxOpen } from "react-icons/fa";

import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Input from "../../components/Input";
import Tabs from "../../components/Tabs";
import EmptyState from "../../components/EmptyState";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { ordersAPI } from "../../services/ordersAPI";
import { formatCurrency, formatDate } from "../../utils/membership";

// Map DB status to display label
const statusLabel = {
  completed: "Selesai",
  pending: "Pending",
  cancelled: "Batal",
};

// Map DB status to badge variant
const statusVariant = {
  completed: "green",
  pending: "yellow",
  cancelled: "red",
};

export default function MemberOrders() {
  const { profile } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch member's orders by finding their customer record
  const fetchOrders = useCallback(async () => {
    if (!profile?.id) return;
    setLoading(true);
    try {
      // Find the member's customer record by user_id
      const { data: customer, error: custError } = await supabase
        .from("customers")
        .select("id")
        .eq("user_id", profile.id)
        .single();

      if (custError && custError.code !== "PGRST116") throw custError;

      if (customer) {
        const data = await ordersAPI.getByCustomerId(customer.id);
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      addToast({
        title: "Gagal memuat riwayat pesanan",
        description: err.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [profile, addToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter by tab (status)
  const tabFiltered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status === activeTab);

  // Filter by search term (product name or order id)
  const filtered = tabFiltered.filter(
    (o) =>
      (o.order_items?.[0]?.product_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (o.id || "").toLowerCase().includes(search.toLowerCase())
  );

  // Tabs with counts
  const tabs = [
    { key: "all", label: "Semua", badge: orders.length },
    {
      key: "pending",
      label: "Pending",
      badge: orders.filter((o) => o.status === "pending").length,
    },
    {
      key: "completed",
      label: "Selesai",
      badge: orders.filter((o) => o.status === "completed").length,
    },
    {
      key: "cancelled",
      label: "Batal",
      badge: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  // Get product display text from order items
  const getProductDisplay = (order) => {
    if (!order.order_items || order.order_items.length === 0) return "-";
    if (order.order_items.length === 1) return order.order_items[0].product_name;
    return `${order.order_items[0].product_name} +${order.order_items.length - 1} lainnya`;
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader
        title="Riwayat Pembelian"
        breadcrumb={["Member", "Riwayat"]}
      />

      {/* TABS FILTER */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(key) => setActiveTab(key)}
        variant="pill"
        className="mb-4"
      />

      {/* SEARCH */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Cari produk atau ID order..."
          icon={<FaSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ORDER LIST */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-0">
          <EmptyState
            icon={<FaBoxOpen />}
            title="Belum ada pesanan"
            description="Kamu belum memiliki riwayat pembelian. Mulai belanja untuk mengisi riwayat ini."
            action={
              <Link to="/member">
                <Button>Mulai Belanja</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <Card key={order.id} className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                {/* LEFT: Order info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center text-white shrink-0">
                    <FaShoppingBag />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-800 text-sm">
                        #{order.id.substring(0, 8)}
                      </p>
                      <Badge
                        variant={statusVariant[order.status] || "gray"}
                        dot
                        size="sm"
                      >
                        {statusLabel[order.status] || order.status}
                      </Badge>
                      {order.order_type === "reservation" && (
                        <Badge variant="purple" size="sm">
                          Reservasi
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {getProductDisplay(order)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                {/* RIGHT: Price breakdown */}
                <div className="text-right shrink-0">
                  {order.discount_applied > 0 && (
                    <p className="text-xs text-gray-400 line-through">
                      {formatCurrency(order.total_amount)}
                    </p>
                  )}
                  <p className="font-bold text-cyan-500">
                    {formatCurrency(order.net_amount)}
                  </p>
                  {order.discount_applied > 0 && (
                    <p className="text-xs text-green-500 font-semibold">
                      Hemat {formatCurrency(order.discount_applied)}
                    </p>
                  )}
                </div>
              </div>

              {/* Items detail (if more than 1 item) */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Detail Item
                  </p>
                  <div className="space-y-1.5">
                    {order.order_items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {item.product_name}{" "}
                          <span className="text-gray-400">
                            × {item.quantity}
                          </span>
                        </span>
                        <span className="font-medium">
                          {formatCurrency(item.price_per_unit * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
