import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const statusColor = {
    Selesai: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Batal: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4">
      <PageHeader title="Detail Penjualan" breadcrumb={["Dashboard", "Penjualan", order.id]}>
        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-gray-600"
        >
          ← Kembali
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">Order {order.id}</h2>
            <p className="text-gray-500 text-sm">Tanggal: {order.date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColor[order.status]}`}>
            {order.status}
          </span>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-bold mb-3">Produk</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="font-bold text-pink-600">Rp {(item.price * item.qty).toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Ongkir</span>
            <span>Rp {order.ongkir.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Diskon</span>
            <span className="text-red-500">- Rp {order.diskon.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-pink-600">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-bold mb-3">Informasi Pelanggan</h3>
          <p className="text-gray-600">Nama: <span className="font-bold">{order.customer}</span></p>
          <p className="text-gray-600">Telepon: <span className="font-bold">{order.phone}</span></p>
          <p className="text-gray-600">Alamat: <span className="font-bold">{order.address}</span></p>
          <p className="text-gray-600">Pembayaran: <span className="font-bold">{order.payment}</span></p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600">
            Update Status
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600">
            Batalkan Order
          </button>
        </div>
      </div>
    </div>
  );
}
