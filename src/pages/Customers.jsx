import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  const customersData = [
    {
      id: "CUST-101",
      name: "Aisyah",
      email: "aisyah@gmail.com",
      phone: "08123456789",
      level: "Gold",
    },
    {
      id: "CUST-102",
      name: "Nadia",
      email: "nadia@gmail.com",
      phone: "08129876543",
      level: "Silver",
    },
    {
      id: "CUST-103",
      name: "Salsa",
      email: "salsa@gmail.com",
      phone: "08127778888",
      level: "Bronze",
    },
  ];

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">

      <PageHeader
        title="Data Pelanggan Boutique"
        breadcrumb={["Dashboard", "Pelanggan"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-400 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:bg-cyan-500 transition"
        >
          {showForm ? "Tutup Form" : "+ Tambah Pelanggan"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">

          <h3 className="text-lg font-bold text-gray-700 mb-5">
            Tambah Pelanggan
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="ID Pelanggan"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="Nama"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              placeholder="No HP"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition"
            />

            <select className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400 transition col-span-2">
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>

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
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">No HP</th>
              <th className="p-4">Level</th>
            </tr>
          </thead>

          <tbody>
            {customersData.map((item) => (
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

                <td className="p-4 text-gray-600">
                  {item.email}
                </td>

                <td className="p-4 text-gray-600">
                  {item.phone}
                </td>

                <td className="p-4">
                  <span className="bg-cyan-100 text-cyan-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}