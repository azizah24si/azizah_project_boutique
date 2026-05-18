import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaSearch } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

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
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
        <Button
          size="sm"
          icon={<FaEye />}
          onClick={() => navigate(`/product/${val}`)}
        >
          Lihat Detail
        </Button>
      ),
    },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Data Produk Boutique" breadcrumb={["Dashboard", "Produk"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Produk
        </Button>
      </PageHeader>

      {saved && (
        <Alert variant="success" title="Produk berhasil disimpan!" 
        dismissible onDismiss={() => setSaved(false)} className="mb-4">
          Produk baru telah ditambahkan ke daftar.
        </Alert>
      )}

      {/* SEARCH */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Cari produk atau kategori..."
          icon={<FaSearch />}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLE */}
      <Table columns={columns} data={paginated} emptyText="Tidak ada produk ditemukan" />

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODAL */}
      <Modal
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
      </Modal>
    </div>
  );
}
