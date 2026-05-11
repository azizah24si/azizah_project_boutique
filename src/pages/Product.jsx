import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Product() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const productsData = Array.from({ length: 12 }, (_, i) => ({
    id: `PRD-${1 + i}`,
    name: `Outfit ${i + 1}`,
    category: ["Dress", "Blouse", "Outer"][i % 3],
    price: `Rp ${((i + 1) * 75000).toLocaleString("id-ID")}`,
    stock: 10 + i,
  }));

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      <PageHeader
        title="Data Produk Boutique"
        breadcrumb={["Dashboard", "Produk"]}
      >

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-400 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:bg-cyan-500 transition"
        >
          {showForm ? "Tutup Form" : "+ Tambah Produk"}
        </button>

      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <h3 className="text-lg font-bold text-gray-700 mb-5">
            Tambah Produk
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nama Produk"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="Kategori"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="number"
              placeholder="Harga"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="number"
              placeholder="Stok"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-2xl transition col-span-2">
              Simpan Produk
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
              <th className="p-4">Nama</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {productsData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-cyan-50 transition"
              >

                <td className="p-4 font-semibold text-gray-700">
                  {item.id}
                </td>

                <td className="p-4 text-gray-600">
                  {item.name}
                </td>

                <td className="p-4">
                  <span className="bg-cyan-100 text-cyan-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </td>

                <td className="p-4 text-cyan-500 font-semibold">
                  {item.price}
                </td>

                <td className="p-4 text-gray-600">
                  {item.stock}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
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