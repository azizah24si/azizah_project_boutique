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

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const total = subtotal + order.ongkir - order.diskon;

  const statusColor = {
    Selesai: "bg-green-100 text-green-500",
    Pending: "bg-yellow-100 text-yellow-500",
    Batal: "bg-red-100 text-red-500",
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      <PageHeader
        title="Detail Penjualan"
        breadcrumb={["Dashboard", "Penjualan", order.id]}
      >

        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-gray-600 transition"
        >
          ← Kembali
        </button>

      </PageHeader>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">

          <div>
            <h2 className="text-3xl font-bold text-gray-700">
              Order {order.id}
            </h2>

            <p className="text-gray-400 mt-1">
              Tanggal: {order.date}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor[order.status]}`}
          >
            {order.status}
          </span>

        </div>

        {/* PRODUK */}
        <div className="border-t border-gray-100 pt-6 mb-6">

          <h3 className="font-bold text-gray-700 mb-4 text-lg">
            Produk
          </h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-2xl"
            >

              <div>
                <p className="font-semibold text-gray-700">
                  {item.name}
                </p>

                <p className="text-sm text-gray-400">
                  Qty: {item.qty}
                </p>
              </div>

              <p className="font-bold text-cyan-500">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </p>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div className="border-t border-gray-100 pt-6 mb-6 space-y-3">

          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-gray-500">
            <span>Ongkir</span>
            <span>Rp {order.ongkir.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-gray-500">
            <span>Diskon</span>

            <span className="text-red-400">
              - Rp {order.diskon.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex justify-between text-2xl font-bold border-t border-gray-100 pt-4">
            <span>Total</span>

            <span className="text-cyan-500">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

        </div>

        {/* CUSTOMER */}
        <div className="border-t border-gray-100 pt-6 mb-6">

          <h3 className="font-bold text-gray-700 mb-4 text-lg">
            Informasi Pelanggan
          </h3>

          <div className="space-y-3 text-gray-600">

            <p>
              Nama:
              <span className="font-semibold text-gray-700 ml-2">
                {order.customer}
              </span>
            </p>

            <p>
              Telepon:
              <span className="font-semibold text-gray-700 ml-2">
                {order.phone}
              </span>
            </p>

            <p>
              Alamat:
              <span className="font-semibold text-gray-700 ml-2">
                {order.address}
              </span>
            </p>

            <p>
              Pembayaran:
              <span className="font-semibold text-gray-700 ml-2">
                {order.payment}
              </span>
            </p>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex gap-4">

          <button className="flex-1 bg-cyan-400 text-white py-3 rounded-2xl font-semibold hover:bg-cyan-500 transition">
            Update Status
          </button>

          <button className="flex-1 bg-red-400 text-white py-3 rounded-2xl font-semibold hover:bg-red-500 transition">
            Batalkan Order
          </button>

        </div>

      </div>

    </div>
  );
}