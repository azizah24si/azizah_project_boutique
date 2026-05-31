import { useState } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Dialog, { DialogConfirm } from "../components/Dialog";
import { useToast } from "../components/Toast";
import Skeleton, { SkeletonCard, SkeletonTable, SkeletonProduct } from "../components/Skeleton";

export default function ComponentDemo() {
  const { addToast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen space-y-8">
      <PageHeader
        title="Demo Komponen Baru"
        breadcrumb={["Dashboard", "Demo"]}
      />

      {/* TOAST DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🎉 Toast Notifications</h3>
        <p className="text-sm text-gray-600 mb-4">
          Toast adalah notifikasi non-intrusive yang muncul di pojok kanan bawah.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              addToast({
                title: "Berhasil!",
                description: "Data produk berhasil disimpan.",
                variant: "success",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              addToast({
                title: "Error!",
                description: "Gagal menghapus data.",
                variant: "error",
              })
            }
          >
            Error Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              addToast({
                title: "Peringatan",
                description: "Stok produk hampir habis.",
                variant: "warning",
              })
            }
          >
            Warning Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              addToast({
                title: "Info",
                description: "Ada 5 pesanan baru hari ini.",
                variant: "info",
              })
            }
          >
            Info Toast
          </Button>
        </div>
      </div>

      {/* DIALOG DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💬 Dialog Component</h3>
        <p className="text-sm text-gray-600 mb-4">
          Dialog adalah modal yang lebih accessible dengan animasi smooth.
        </p>
        <div className="flex gap-3">
          <Button icon={<FaPlus />} onClick={() => setShowDialog(true)}>
            Buka Dialog Form
          </Button>
          <Button
            variant="danger"
            icon={<FaTrash />}
            onClick={() => setShowConfirm(true)}
          >
            Buka Dialog Confirm
          </Button>
        </div>
      </div>

      {/* SKELETON DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">⏳ Skeleton Loading</h3>
        <p className="text-sm text-gray-600 mb-4">
          Skeleton memberikan feedback visual saat data sedang loading.
        </p>
        <Button onClick={handleLoadData} loading={loading}>
          {loading ? "Loading..." : "Simulasi Loading"}
        </Button>

        {loading && (
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">Skeleton Card</h4>
              <div className="grid grid-cols-3 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">Skeleton Table</h4>
              <SkeletonTable rows={3} cols={5} />
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">Skeleton Product</h4>
              <div className="grid grid-cols-4 gap-4">
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DIALOG INSTANCES */}
      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="Form Tambah Produk"
        description="Contoh penggunaan Dialog untuk form input"
        footer={
          <div className="flex gap-3">
            <Button
              className="flex-1"
              icon={<FaCheck />}
              onClick={() => {
                setShowDialog(false);
                addToast({
                  title: "Produk disimpan!",
                  description: "Data berhasil ditambahkan.",
                  variant: "success",
                });
              }}
            >
              Simpan
            </Button>
            <Button variant="secondary" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Produk"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Harga"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none"
          />
          <textarea
            placeholder="Deskripsi"
            rows={3}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </Dialog>

      <DialogConfirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          addToast({
            title: "Data dihapus!",
            description: "Produk berhasil dihapus dari sistem.",
            variant: "error",
          });
        }}
        title="Hapus Produk?"
        description="Apakah kamu yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
