import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const ordersData = [
    {
      id: "ORD-101",
      customer: "Aisyah",
      product: "Dress Floral Pink",
      status: "Selesai",
      price: "Rp 150.000",
      date: "2026-05-01",
    },
    {
      id: "ORD-102",
      customer: "Nadia",
      product: "Blouse Korean",
      status: "Pending",
      price: "Rp 120.000",
      date: "2026-05-02",
    },
    {
      id: "ORD-103",
      customer: "Salsa",
      product: "Outer Vintage",
      status: "Batal",
      price: "Rp 175.000",
      date: "2026-05-03",
    },
  ];

  const statusColor = {
    Selesai: "bg-green-100 text-green-500",
    Pending: "bg-yellow-100 text-yellow-500",
    Batal: "bg-red-100 text-red-500",
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      <PageHeader
        title="Data Penjualan Boutique"
        breadcrumb={["Dashboard", "Penjualan"]}
      >

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-400 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:bg-cyan-500 transition"
        >
          {showForm ? "Tutup Form" : "+ Tambah Penjualan"}
        </button>

      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <h3 className="text-lg font-bold text-gray-700 mb-5">
            Tambah Penjualan
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="ID Order"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="Nama Pelanggan"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="Nama Produk"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="number"
              placeholder="Total Harga"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <select className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition">

              <option>Selesai</option>
              <option>Pending</option>
              <option>Batal</option>

            </select>

            <input
              type="date"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-2xl transition col-span-2">
              Simpan
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-50 text-gray-400 uppercase text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Produk</th>
              <th className="p-4">Status</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-cyan-50 transition"
              >

                <td className="p-4 font-semibold text-gray-700">
                  {item.id}
                </td>

                <td className="p-4 text-gray-600">
                  {item.customer}
                </td>

                <td className="p-4 text-gray-600">
                  {item.product}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-cyan-500 font-semibold">
                  {item.price}
                </td>

                <td className="p-4 text-gray-500">
                  {item.date}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => navigate(`/orders/${item.id}`)}
                    className="bg-cyan-400 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-cyan-500 transition"
                  >
                    Lihat Detail
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}