import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const product = {
    id: id || "PRD-1",
    name: "Dress Floral Pink",
    category: "Dress",
    price: "Rp 150.000",
    stock: 25,
    maxStock: 50,
    description:
      "Dress cantik dengan motif floral warna pink yang cocok untuk acara casual maupun semi-formal.",
    material: "Cotton Premium",
    size: ["S", "M", "L", "XL"],
    color: ["Pink", "White", "Lavender"],
  };

  const stockPercent = Math.round((product.stock / product.maxStock) * 100);
  const stockColor = stockPercent > 60 ? "green" : stockPercent > 30 ? "orange" : "pink";

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowEdit(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader
        title="Detail Produk"
        breadcrumb={["Dashboard", "Produk", product.name]}
      >
        <Button variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate("/product")}>
          Kembali
        </Button>
      </PageHeader>

      {saved && (
        <Alert variant="success" title="Produk berhasil diperbarui!" dismissible onDismiss={() => setSaved(false)} className="mb-4">
          Perubahan data produk telah disimpan.
        </Alert>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-700">{product.name}</h2>
            <p className="text-gray-400 mt-1">ID: {product.id}</p>
          </div>
          <Badge variant="cyan" size="md">{product.category}</Badge>
        </div>

        {/* PRICE */}
        <p className="text-3xl font-bold text-cyan-500 mb-4">{product.price}</p>

        {/* DESCRIPTION */}
        <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

        {/* STOCK PROGRESS */}
        <div className="mb-8">
          <ProgressBar
            label={`Stok: ${product.stock} / ${product.maxStock} Unit`}
            value={stockPercent}
            color={stockColor}
            size="lg"
          />
        </div>

        {/* DETAIL GRID */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {[
            { label: "Stok", value: `${product.stock} Unit` },
            { label: "Material", value: product.material },
            { label: "Ukuran", value: product.size.join(", ") },
            { label: "Warna", value: product.color.join(", ") },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-400 mb-1">{item.label}</p>
              <p className="font-semibold text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <Button className="flex-1" icon={<FaEdit />} onClick={() => setShowEdit(true)}>
            Edit Produk
          </Button>
          <Button className="flex-1" variant="danger" icon={<FaTrash />} onClick={() => setShowDelete(true)}>
            Hapus Produk
          </Button>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit Produk"
        description="Perbarui informasi produk"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="Nama Produk" defaultValue={product.name} required />
          <Select label="Kategori" options={["Dress", "Blouse", "Outer", "Hijab"]} required />
          <Input label="Harga" type="number" defaultValue="150000" required />
          <Input label="Stok" type="number" defaultValue={product.stock} required />
          <Input label="Material" defaultValue={product.material} className="col-span-2" />
        </div>
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <Modal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title="Hapus Produk"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button variant="danger" className="flex-1" onClick={() => { setShowDelete(false); navigate("/product"); }}>
              Ya, Hapus
            </Button>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <Alert variant="error" title="Tindakan ini tidak dapat dibatalkan">
          Produk <strong>{product.name}</strong> akan dihapus secara permanen dari sistem.
        </Alert>
      </Modal>
    </div>
  );
}
