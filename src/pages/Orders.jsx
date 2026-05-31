import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaSearch } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Dialog from "../components/Dialog";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useToast } from "../components/Toast";
import Tabs from "../components/Tabs";
import { SkeletonTable } from "../components/Skeleton";

const ALL_ORDERS = [
  { id: "ORD-101", customer: "Aisyah", product: "Dress Floral Pink", status: "Selesai", price: "Rp 150.000", date: "2026-05-01" },
  { id: "ORD-102", customer: "Nadia", product: "Blouse Korean", status: "Pending", price: "Rp 120.000", date: "2026-05-02" },
  { id: "ORD-103", customer: "Salsa", product: "Outer Vintage", status: "Batal", price: "Rp 175.000", date: "2026-05-03" },
  { id: "ORD-104", customer: "Rara", product: "Dress Floral White", status: "Selesai", price: "Rp 160.000", date: "2026-05-04" },
  { id: "ORD-105", customer: "Dina", product: "Hijab Satin", status: "Pending", price: "Rp 85.000", date: "2026-05-05" },
  { id: "ORD-106", customer: "Putri", product: "Blouse Batik", status: "Selesai", price: "Rp 135.000", date: "2026-05-06" },
];

const PAGE_SIZE = 4;

const statusVariant = {
  Selesai: "green",
  Pending: "yellow",
  Batal: "red",
};

export default function Orders() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const tabFiltered =
    activeTab === "all"
      ? ALL_ORDERS
      : ALL_ORDERS.filter((o) => o.status.toLowerCase() === activeTab);

  const filtered = tabFiltered.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const tabs = [
    { key: "all", label: "Semua", badge: ALL_ORDERS.length },
    { key: "selesai", label: "Selesai", badge: ALL_ORDERS.filter((o) => o.status === "Selesai").length },
    { key: "pending", label: "Pending", badge: ALL_ORDERS.filter((o) => o.status === "Pending").length },
    { key: "batal", label: "Batal", badge: ALL_ORDERS.filter((o) => o.status === "Batal").length },
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
      key: "status",
      label: "Status",
      render: (val) => (
        <Badge variant={statusVariant[val]} dot>
          {val}
        </Badge>
      ),
    },
    {
      key: "price",
      label: "Harga",
      render: (val) => <span className="text-cyan-500 font-semibold">{val}</span>,
    },
    { key: "date", label: "Tanggal" },
    {
      key: "id",
      label: "Aksi",
      render: (val) => (
        <Button size="sm" icon={<FaEye />} onClick={() => navigate(`/orders/${val}`)}>
          Detail
        </Button>
      ),
    },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
      addToast({
        title: "Penjualan berhasil disimpan!",
        description: "Data transaksi baru telah ditambahkan.",
        variant: "success",
      });
    }, 1500);
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
        title="Tambah Penjualan Baru"
        description="Isi form di bawah untuk mencatat transaksi penjualan"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : "Simpan Penjualan"}
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="ID Order" placeholder="ORD-107" required />
          <Input label="Nama Pelanggan" placeholder="Contoh: Aisyah" required />
          <Input label="Nama Produk" placeholder="Contoh: Dress Floral Pink" required />
          <Input label="Total Harga" type="number" placeholder="150000" required />
          <Select
            label="Status"
            options={["Selesai", "Pending", "Batal"]}
            required
          />
          <Input label="Tanggal" type="date" required />
        </div>
      </Dialog>
    </div>
  );
}
