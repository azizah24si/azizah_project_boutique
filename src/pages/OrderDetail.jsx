import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import Select from "../components/Select";

const statusVariant = {
  Selesai: "green",
  Pending: "yellow",
  Batal: "red",
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const order = {
    id: id || "ORD-101",
    customer: "Aisyah Putri",
    phone: "0812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta Selatan",
    items: [
      { id: 1, name: "Dress Floral Pink", qty: 2, price: 150000 },
      { id: 2, name: "Blouse Korean Style", qty: 1, price: 120000 },
    ],
    status: "Selesai",
    date: "2026-05-01",
    payment: "Transfer Bank",
    ongkir: 15000,
    diskon: 20000,
  };

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + order.ongkir - order.diskon;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowUpdate(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader
        title="Detail Penjualan"
        breadcrumb={["Dashboard", "Penjualan", order.id]}
      >
        <Button variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate("/orders")}>
          Kembali
        </Button>
      </PageHeader>

      {saved && (
        <Alert variant="success" title="Status order berhasil diperbarui!" dismissible onDismiss={() => setSaved(false)} className="mb-4">
          Perubahan status telah disimpan.
        </Alert>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-700">Order {order.id}</h2>
            <p className="text-gray-400 mt-1">Tanggal: {order.date}</p>
          </div>
          <Badge variant={statusVariant[order.status]} dot size="md">
            {order.status}
          </Badge>
        </div>

        {/* CUSTOMER INFO */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Informasi Pelanggan</h3>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
            <Avatar name={order.customer} size="lg" color="cyan" status="online" />
            <div className="space-y-1">
              <p className="font-bold text-gray-700">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.phone}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
              <p className="text-sm text-gray-500">Pembayaran: <span className="font-semibold text-gray-700">{order.payment}</span></p>
            </div>
          </div>
        </div>

        {/* PRODUK */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4 text-lg">Produk</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-2xl">
              <div>
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-400">Qty: {item.qty}</p>
              </div>
              <p className="font-bold text-cyan-500">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border-t border-gray-100 pt-6 mb-6 space-y-3">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Ongkir</span>
            <span>Rp {order.ongkir.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Diskon</span>
            <span className="text-red-400">- Rp {order.diskon.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold border-t border-gray-100 pt-4">
            <span>Total</span>
            <span className="text-cyan-500">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <Button className="flex-1" icon={<FaEdit />} onClick={() => setShowUpdate(true)}>
            Update Status
          </Button>
          <Button className="flex-1" variant="danger" icon={<FaTimes />} onClick={() => setShowCancel(true)}>
            Batalkan Order
          </Button>
        </div>
      </div>

      {/* UPDATE STATUS MODAL */}
      <Modal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        title="Update Status Order"
        description={`Ubah status untuk order ${order.id}`}
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : "Simpan Status"}
            </Button>
            <Button variant="secondary" onClick={() => setShowUpdate(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <Select
          label="Status Order"
          options={["Selesai", "Pending", "Batal"]}
          defaultValue={order.status}
          required
        />
      </Modal>

      {/* CANCEL CONFIRM MODAL */}
      <Modal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        title="Batalkan Order"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button variant="danger" className="flex-1" onClick={() => { setShowCancel(false); navigate("/orders"); }}>
              Ya, Batalkan
            </Button>
            <Button variant="secondary" onClick={() => setShowCancel(false)}>
              Tidak
            </Button>
          </div>
        }
      >
        <Alert variant="warning" title="Yakin ingin membatalkan order ini?">
          Order <strong>{order.id}</strong> atas nama <strong>{order.customer}</strong> akan dibatalkan.
        </Alert>
      </Modal>
    </div>
  );
}
