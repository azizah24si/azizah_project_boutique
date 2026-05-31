import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaSearch, FaTrash } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Dialog, { DialogConfirm } from "../components/Dialog";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { SkeletonTable } from "../components/Skeleton";
import { useToast } from "../components/Toast";

const ALL_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: `PRD-${i + 1}`,
  name: `Outfit ${i + 1}`,
  category: ["Dress", "Blouse", "Outer"][i % 3],
  price: `Rp ${((i + 1) * 75000).toLocaleString("id-ID")}`,
  stock: 10 + i,
}));

const PAGE_SIZE = 5;

export default function Product() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const categoryBadge = {
    Dress: <Badge variant="cyan">Dress</Badge>,
    Blouse: <Badge variant="pink">Blouse</Badge>,
    Outer: <Badge variant="orange">Outer</Badge>,
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (val) => <span className="font-semibold text-gray-700">{val}</span>,
    },
    { key: "name", label: "Nama" },
    {
      key: "category",
      label: "Kategori",
      render: (val) => categoryBadge[val] ?? <Badge>{val}</Badge>,
    },
    {
      key: "price",
      label: "Harga",
      render: (val) => <span className="text-cyan-500 font-semibold">{val}</span>,
    },
    { key: "stock", label: "Stok" },
    {
      key: "id",
      label: "Aksi",
      render: (val) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            icon={<FaEye />}
            onClick={() => navigate(`/product/${val}`)}
          >
            Detail
          </Button>
          <Button
            size="sm"
            variant="danger"
            icon={<FaTrash />}
            onClick={() => setDeleteId(val)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
      addToast({
        title: "Produk berhasil disimpan!",
        description: "Produk baru telah ditambahkan ke daftar.",
        variant: "success",
      });
    }, 1500);
  };

  const handleDelete = () => {
    addToast({
      title: "Produk dihapus!",
      description: `Produk ${deleteId} telah dihapus dari sistem.`,
      variant: "error",
    });
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Data Produk Boutique" breadcrumb={["Dashboard", "Produk"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Produk
        </Button>
      </PageHeader>

      {/* SEARCH */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Cari produk atau kategori..."
          icon={<FaSearch />}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLE WITH SKELETON */}
      {loading ? (
        <SkeletonTable rows={5} cols={6} />
      ) : (
        <Table columns={columns} data={paginated} emptyText="Tidak ada produk ditemukan" />
      )}

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* DIALOG FORM */}
      <Dialog
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Tambah Produk Baru"
        description="Isi form di bawah untuk menambahkan produk"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : "Simpan Produk"}
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="Nama Produk" placeholder="Contoh: Dress Floral Pink" required />
          <Select
            label="Kategori"
            options={["Dress", "Blouse", "Outer", "Hijab"]}
            required
          />
          <Input label="Harga" type="number" placeholder="150000" required />
          <Input label="Stok" type="number" placeholder="10" required />
        </div>
      </Dialog>

      {/* DIALOG CONFIRM DELETE */}
      <DialogConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Produk?"
        description={`Apakah kamu yakin ingin menghapus produk ${deleteId}? Aksi ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
