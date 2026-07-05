import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaSearch, FaTrash } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Dialog from "../components/Dialog";
import Input from "../components/Input";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useToast } from "../components/Toast";
import Tabs from "../components/Tabs";
import { SkeletonTable } from "../components/Skeleton";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import { getAllOrders, createSalesOrder, ensureCustomer, deleteOrder, updateOrderStatus, updateMembershipTier } from "../services/ordersAPI";

const PAGE_SIZE = 10;

const statusVariant = {
  Selesai: "green",
  Pending: "yellow",
  Batal: "red",
  completed: "green",
  pending: "yellow",
  cancelled: "red",
};

const statusLabel = {
  completed: "Selesai",
  pending: "Pending",
  cancelled: "Batal",
};

export default function Orders() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form state untuk tambah penjualan manual
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productId: "",
    quantity: 1,
    pricePerUnit: "",
    status: "completed",
  });

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      productId: "",
      quantity: 1,
      pricePerUnit: "",
      status: "completed",
    });
    setSelectedProduct(null);
  };

  // Load orders from database
  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
      addToast({
        title: "Gagal memuat data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const { productsAPI } = await import("../services/productsAPI");
      const data = await productsAPI.getAll();
      console.log("✅ Loaded products:", data.length);
      setProducts(data);
    } catch (error) {
      console.error("❌ Error loading products:", error);
    }
  };

  const handleProductChange = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        ...formData,
        productId: product.id,
        pricePerUnit: product.price,
      });
    }
  };

  // Transform orders for display
  const transformedOrders = orders.map((order) => ({
    id: order.id.substring(0, 8).toUpperCase(),
    fullId: order.id,
    customer: order.customer?.full_name || "Guest",
    product: order.items?.map(i => i.product_name).join(", ") || "-",
    status: order.status,
    statusLabel: statusLabel[order.status] || order.status,
    price: `Rp ${order.net_amount?.toLocaleString("id-ID")}`,
    date: new Date(order.created_at).toLocaleDateString("id-ID"),
    orderType: order.order_type,
  }));

  const tabFiltered =
    activeTab === "all"
      ? transformedOrders
      : transformedOrders.filter((o) => o.status === activeTab);

  const filtered = tabFiltered.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const tabs = [
    { key: "all", label: "Semua", badge: transformedOrders.length },
    { key: "completed", label: "Selesai", badge: transformedOrders.filter((o) => o.status === "completed").length },
    { key: "pending", label: "Pending", badge: transformedOrders.filter((o) => o.status === "pending").length },
    { key: "cancelled", label: "Batal", badge: transformedOrders.filter((o) => o.status === "cancelled").length },
  ];

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (val) => <span className="font-semibold text-gray-700">{val}</span>,
    },
    { key: "customer", label: "Pelanggan" },
    { key: "product", label: "Produk" },
    {
      key: "orderType",
      label: "Tipe",
      render: (val) => (
        <Badge variant={val === "reservation" ? "purple" : "blue"}>
          {val === "reservation" ? "Reservasi" : "Penjualan"}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val, row) => (
        <select
          className={`border rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition cursor-pointer
            ${val === "completed" ? "bg-green-50 border-green-200 text-green-700" : ""}
            ${val === "pending" ? "bg-yellow-50 border-yellow-200 text-yellow-700" : ""}
            ${val === "cancelled" ? "bg-red-50 border-red-200 text-red-700" : ""}
            ${updatingStatus[row.fullId] ? "opacity-50 cursor-wait" : "hover:brightness-95"}
          `}
          value={val}
          onChange={(e) => handleStatusChange(row.fullId, e.target.value, row.id)}
          disabled={updatingStatus[row.fullId]}
        >
          <option value="pending">Pending</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Batal</option>
        </select>
      ),
    },
    {
      key: "price",
      label: "Harga",
      render: (val) => <span className="text-plum-500 font-semibold">{val}</span>,
    },
    { key: "date", label: "Tanggal" },
    {
      key: "fullId",
      label: "Aksi",
      render: (val, row) => (
        <div className="flex gap-2">
          <Button size="sm" icon={<FaEye />} onClick={() => navigate(`/admin/orders/${val}`)} title="Lihat Detail">
            Detail
          </Button>
          <Button 
            size="sm" 
            variant="danger" 
            icon={<FaTrash />} 
            onClick={() => setDeleteConfirm(row)}
            title="Hapus Order"
          />
        </div>
      ),
    },
  ];

  const handleSave = async () => {
    // Validasi
    if (!formData.customerName || !formData.customerEmail || !formData.productId || !formData.pricePerUnit) {
      addToast({
        title: "Data tidak lengkap",
        description: "Mohon isi semua field yang required",
        variant: "error",
      });
      return;
    }

    setSaving(true);
    try {
      // 1. Ensure customer exists
      const customer = await ensureCustomer({
        full_name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
      });

      // 2. Calculate amounts
      const totalAmount = formData.pricePerUnit * formData.quantity;

      // 3. Create order
      await createSalesOrder({
        customerId: customer.id,
        items: [{
          product_name: selectedProduct?.name || "Produk",
          quantity: formData.quantity,
          price_per_unit: formData.pricePerUnit,
        }],
        totalAmount,
        discountApplied: 0,
        netAmount: totalAmount,
        orderType: "sales",
        notes: "Transaksi manual oleh admin (offline/kasir)",
      });

      addToast({
        title: "Penjualan berhasil dicatat!",
        description: "Transaksi manual telah disimpan ke database.",
        variant: "success",
      });

      setShowForm(false);
      resetForm();
      loadOrders(); // Reload data
    } catch (error) {
      console.error("Error saving order:", error);
      addToast({
        title: "Gagal menyimpan penjualan",
        description: error.message,
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    setDeleting(true);
    try {
      await deleteOrder(deleteConfirm.fullId);
      addToast({
        title: "Order berhasil dihapus!",
        description: `Order ${deleteConfirm.id} telah dihapus dari database.`,
        variant: "success",
      });
      setDeleteConfirm(null);
      loadOrders(); // Reload data
    } catch (error) {
      console.error("Error deleting order:", error);
      addToast({
        title: "Gagal menghapus order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus, shortId) => {
    setUpdatingStatus({ ...updatingStatus, [orderId]: true });
    try {
      // Update order status
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      
      // If status changed to "completed", update membership tier
      if (newStatus === "completed") {
        try {
          await updateMembershipTier(updatedOrder.customer_id);
          console.log("✅ Membership tier updated for customer:", updatedOrder.customer_id);
        } catch (tierError) {
          console.error("⚠️ Failed to update tier:", tierError);
        }
      }
      
      addToast({
        title: "Status berhasil diperbarui!",
        description: `Order ${shortId} telah diubah menjadi ${statusLabel[newStatus]}`,
        variant: "success",
      });
      loadOrders(); // Reload data
    } catch (error) {
      console.error("Error updating status:", error);
      addToast({
        title: "Gagal mengubah status",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus({ ...updatingStatus, [orderId]: false });
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Data Penjualan Boutique" breadcrumb={["Dashboard", "Penjualan"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Penjualan
        </Button>
      </PageHeader>

      {/* TABS FILTER */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(key) => { setActiveTab(key); setCurrentPage(1); }}
        variant="pill"
        className="mb-4"
      />

      {/* SEARCH */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Cari order, pelanggan, produk..."
          icon={<FaSearch />}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLE WITH SKELETON */}
      {loading ? (
        <SkeletonTable rows={4} cols={7} />
      ) : (
        <Table columns={columns} data={paginated} emptyText="Tidak ada penjualan ditemukan" />
      )}

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* DIALOG FORM */}
      <Dialog
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Tambah Penjualan Manual"
        description="Catat transaksi penjualan offline/kasir"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Penjualan"}
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)} disabled={saving}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nama Pelanggan"
              placeholder="Contoh: Aisyah"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
            <Input
              label="Email Pelanggan"
              type="email"
              placeholder="pelanggan@example.com"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              required
            />
          </div>
          
          <Input
            label="Nomor HP Pelanggan (Opsional)"
            placeholder="08123456789"
            value={formData.customerPhone}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
          />

          <div className="border-t pt-4 mt-2">
            <h3 className="font-semibold text-gray-700 mb-3">Detail Produk</h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600">
                Pilih Produk<span className="text-red-400 ml-1">*</span>
              </label>
              <select
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition appearance-none bg-white border-gray-200 focus:border-plum-400 focus:ring-2 focus:ring-plum-100"
                value={formData.productId}
                onChange={(e) => handleProductChange(e.target.value)}
                required
              >
                <option value="">-- Pilih Produk --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - Rp {Number(product.price).toLocaleString("id-ID")} (Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="mt-3 p-3 bg-plum-50 border border-plum-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{selectedProduct.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Stock tersedia: {selectedProduct.stock} pcs</p>
                  </div>
                  <p className="text-lg font-bold text-plum-600">
                    Rp {Number(selectedProduct.price).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Jumlah"
              type="number"
              min="1"
              max={selectedProduct?.stock || 999}
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
              required
            />
            <Input
              label="Harga per Unit (Rp)"
              type="number"
              min="0"
              placeholder="Otomatis terisi"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
              required
            />
          </div>

          {formData.pricePerUnit && formData.quantity && (
            <div className="bg-plum-50 border border-plum-200 rounded-lg p-4">
              <p className="text-sm text-plum-600 font-medium mb-1">Total Transaksi</p>
              <p className="text-2xl font-bold text-plum-900">
                Rp {(formData.pricePerUnit * formData.quantity).toLocaleString("id-ID")}
              </p>
            </div>
          )}
        </div>
      </Dialog>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Hapus Order"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button 
              variant="danger" 
              className="flex-1" 
              onClick={handleDelete} 
              loading={deleting}
              disabled={deleting}
            >
              {deleting ? "Menghapus..." : "Ya, Hapus"}
            </Button>
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)} disabled={deleting}>
              Batal
            </Button>
          </div>
        }
      >
        <Alert variant="error" title="Yakin ingin menghapus order ini?">
          Order <strong>{deleteConfirm?.id}</strong> atas nama <strong>{deleteConfirm?.customer}</strong> akan dihapus secara permanen dan tidak dapat dikembalikan.
        </Alert>
      </Modal>
    </div>
  );
}
