import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Alert from "../components/Alert";
import { useToast } from "../components/Toast";
import { SkeletonTable } from "../components/Skeleton";
import { getOrderById } from "../services/ordersAPI";

const statusVariant = {
  completed: "green",
  pending: "yellow",
  cancelled: "red",
};

const statusLabel = {
  completed: "Selesai",
  pending: "Pending",
  cancelled: "Batal",
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  // Load order data
  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error("Error loading order:", error);
      addToast({
        title: "Gagal memuat data order",
        description: error.message,
        variant: "destructive",
      });
      navigate("/admin/orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#f8f9fb] min-h-screen">
        <PageHeader title="Detail Penjualan" breadcrumb={["Dashboard", "Penjualan", "Loading..."]}>
          <Button variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate("/admin/orders")}>
            Kembali
          </Button>
        </PageHeader>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <SkeletonTable rows={5} cols={2} />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 bg-[#f8f9fb] min-h-screen">
        <PageHeader title="Detail Penjualan" breadcrumb={["Dashboard", "Penjualan", "Not Found"]}>
          <Button variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate("/admin/orders")}>
            Kembali
          </Button>
        </PageHeader>
        <Alert variant="error" title="Order tidak ditemukan">
          Order dengan ID {id} tidak ditemukan dalam database.
        </Alert>
      </div>
    );
  }

  const subtotal = order.total_amount || 0;
  const diskon = order.discount_applied || 0;
  const total = order.net_amount || 0;

  const shortId = order.id.substring(0, 8).toUpperCase();
  const orderDate = new Date(order.created_at).toLocaleDateString("id-ID");

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader
        title="Detail Penjualan"
        breadcrumb={["Dashboard", "Penjualan", shortId]}
      >
        <Button variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate("/admin/orders")}>
          Kembali
        </Button>
      </PageHeader>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-700">Order {shortId}</h2>
            <p className="text-gray-400 mt-1">Tanggal: {orderDate}</p>
            <Badge variant={order.order_type === "reservation" ? "purple" : "blue"} className="mt-2">
              {order.order_type === "reservation" ? "Reservasi" : "Penjualan"}
            </Badge>
          </div>
          <Badge variant={statusVariant[order.status]} dot size="md">
            {statusLabel[order.status]}
          </Badge>
        </div>

        {/* CUSTOMER INFO */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Informasi Pelanggan</h3>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
            <Avatar name={order.customer?.full_name || "Guest"} size="lg" color="cyan" />
            <div className="space-y-1">
              <p className="font-bold text-gray-700">{order.customer?.full_name || "Guest"}</p>
              {order.customer?.phone && (
                <p className="text-sm text-gray-500">{order.customer.phone}</p>
              )}
              {order.customer?.email && (
                <p className="text-sm text-gray-500">{order.customer.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* PRODUK */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Produk</h3>
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-2xl">
                <div>
                  <p className="font-semibold text-gray-700">{item.product_name}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">@Rp {item.price_per_unit?.toLocaleString("id-ID")}</p>
                </div>
                <p className="font-bold text-cyan-500">
                  Rp {(item.price_per_unit * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">Tidak ada item</p>
          )}
        </div>

        {/* NOTES */}
        {order.notes && (
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-2 text-lg">Catatan</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl">{order.notes}</p>
          </div>
        )}

        {/* RESERVATION DATE */}
        {order.order_type === "reservation" && order.reservation_date && (
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-2 text-lg">Waktu Reservasi</h3>
            <p className="text-cyan-600 font-semibold bg-cyan-50 p-4 rounded-2xl">
              {new Date(order.reservation_date).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>
        )}

        {/* TOTAL */}
        <div className="border-t border-gray-100 pt-6 mb-6 space-y-3">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          {diskon > 0 && (
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Diskon</span>
              <span className="text-red-400">- Rp {diskon.toLocaleString("id-ID")}</span>
            </div>
          )}
          <div className="flex justify-between text-2xl font-bold border-t border-gray-100 pt-4">
            <span>Total</span>
            <span className="text-cyan-500">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
