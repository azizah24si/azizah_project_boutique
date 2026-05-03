import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Product() {
  const [showForm, setShowForm] = useState(false);

  const productsData = Array.from({ length: 12 }, (_, i) => ({
    id: `PRD-${1 + i}`,
    name: `Outfit ${i + 1}`,
    category: ["Dress", "Blouse", "Outer"][i % 3],
    price: `Rp ${(i + 1) * 75000}`,
    stock: 10 + i,
  }));

  return (
    <div className="p-4">

      <PageHeader
        title="Data Produk Boutique"
        breadcrumb={["Dashboard", "Produk"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow hover:bg-pink-600 transition"
        >
          {showForm ? "Tutup Form" : "+ Tambah Produk"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6 border-l-4 border-pink-400">
          <h3 className="font-bold mb-4">Tambah Produk</h3>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nama Produk" className="border p-2 rounded-lg" />
            <input type="text" placeholder="Kategori" className="border p-2 rounded-lg" />
            <input type="number" placeholder="Harga" className="border p-2 rounded-lg" />
            <input type="number" placeholder="Stok" className="border p-2 rounded-lg" />

            <button className="bg-pink-500 text-white p-2 rounded-lg col-span-2 font-bold">
              Simpan Produk
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
              <th className="p-4">Nama</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Stok</th>
            </tr>
          </thead>

          <tbody>
            {productsData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-pink-50">
                <td className="p-4 font-bold">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}