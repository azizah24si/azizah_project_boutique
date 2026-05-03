import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
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

  return (
    <div className="p-4">

      <PageHeader
        title="Data Penjualan Boutique"
        breadcrumb={["Dashboard", "Penjualan"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow hover:bg-pink-600"
        >
          {showForm ? "Tutup Form" : "+ Tambah Penjualan"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6 border-l-4 border-pink-400">
          <h3 className="font-bold mb-4">Tambah Penjualan</h3>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="ID Order" className="border p-2 rounded-lg" />
            <input type="text" placeholder="Nama Pelanggan" className="border p-2 rounded-lg" />
            <input type="text" placeholder="Nama Produk" className="border p-2 rounded-lg" />
            <input type="number" placeholder="Total Harga" className="border p-2 rounded-lg" />

            <select className="border p-2 rounded-lg">
              <option>Selesai</option>
              <option>Pending</option>
              <option>Batal</option>
            </select>

            <input type="date" className="border p-2 rounded-lg" />

            <button className="bg-pink-500 text-white p-2 rounded-lg col-span-2 font-bold">
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-pink-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Produk</th>
              <th className="p-4">Status</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-pink-50">
                <td className="p-4 font-bold">{item.id}</td>
                <td className="p-4">{item.customer}</td>
                <td className="p-4">{item.product}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}