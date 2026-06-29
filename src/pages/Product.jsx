import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaSearch, FaTrash, FaEdit } from "react-icons/fa";

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
import { productsAPI } from "../services/productsAPI";

const PAGE_SIZE = 10;

export default function Product() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });

  // Fetch products from database
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      addToast({
        title: "Gagal memuat produk",
        description: error.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = [
    {
      key: "name",
      label: "Nama Produk",
      render: (val) => <span className="font-semibold text-gray-800">{val}</span>,
    },
    {
      key: "price",
      label: "Harga",
      render: (val) => <span className="text-cyan-600 font-semibold">Rp {Number(val).toLocaleString("id-ID")}</span>,
    },
    {
      key: "stock",
      label: "Stok",
      render: (val) => (
        <Badge variant={val > 10 ? "green" : val > 0 ? "yellow" : "red"}>
          {val} item
        </Badge>
      ),
    },
    {
      key: "image_url",
      label: "Gambar",
      render: (val) => (
        val ? (
          <img src={val} alt="Product" className="w-12 h-12 object-cover rounded-lg" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )
      ),
    },
    {
      key: "id",
      label: "Aksi",
      render: (val, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            icon={<FaEdit />}
            onClick={() => handleEdit(row)}
          >
            Edit
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      // Validation
      if (!formData.name || !formData.price || !formData.stock) {
        addToast({
          title: "Form tidak lengkap",
          description: "Nama, harga, dan stok wajib diisi",
          variant: "error",
        });
        return;
      }

      setSaving(true);
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image_url: formData.image_url || null,
      };

      if (editingProduct) {
        // Update existing product
        await productsAPI.update(editingProduct.id, productData);
        addToast({
          title: "Produk berhasil diupdate!",
          description: `${formData.name} telah diperbarui.`,
          variant: "success",
        });
      } else {
        // Create new product
        await productsAPI.create(productData);
        addToast({
          title: "Produk berhasil ditambahkan!",
          description: `${formData.name} telah ditambahkan ke katalog.`,
          variant: "success",
        });
      }

      setShowForm(false);
      setEditingProduct(null);
      loadProducts(); // Reload products
    } catch (error) {
      console.error("Error saving product:", error);
      addToast({
        title: "Gagal menyimpan produk",
        description: error.message,
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await productsAPI.delete(deleteId);
      addToast({
        title: "Produk dihapus!",
        description: "Produk telah dihapus dari sistem.",
        variant: "success",
      });
      setDeleteId(null);
      loadProducts(); // Reload products
    } catch (error) {
      console.error("Error deleting product:", error);
      addToast({
        title: "Gagal menghapus produk",
        description: error.message,
        variant: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Data Produk Boutique" breadcrumb={["Dashboard", "Produk"]}>
        <Button icon={<FaPlus />} onClick={handleAdd}>
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
        <SkeletonTable rows={10} cols={5} />
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
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
        description={editingProduct ? "Ubah data produk" : "Isi form untuk menambahkan produk"}
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : editingProduct ? "Update Produk" : "Simpan Produk"}
            </Button>
            <Button variant="secondary" onClick={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nama Produk"
            placeholder="Contoh: Dress Floral Pink"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Harga (Rp)"
              type="number"
              placeholder="250000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Input
              label="Stok"
              type="number"
              placeholder="10"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
          </div>
          <Input
            label="URL Gambar"
            placeholder="https://images.unsplash.com/..."
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none resize-none"
            rows="3"
            placeholder="Deskripsi produk (opsional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </Dialog>

      {/* DIALOG CONFIRM DELETE */}
      <DialogConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Produk?"
        description="Apakah kamu yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
