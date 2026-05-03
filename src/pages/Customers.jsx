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
    <div className="p-4">

      <PageHeader
        title="Data Pelanggan Boutique"
        breadcrumb={["Dashboard", "Pelanggan"]}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow hover:bg-pink-600"
        >
          {showForm ? "Tutup Form" : "+ Tambah Pelanggan"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6 border-l-4 border-pink-400">
          <h3 className="font-bold mb-4">Tambah Pelanggan</h3>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="ID Pelanggan" className="border p-2 rounded-lg" />
            <input type="text" placeholder="Nama" className="border p-2 rounded-lg" />
            <input type="email" placeholder="Email" className="border p-2 rounded-lg" />
            <input type="text" placeholder="No HP" className="border p-2 rounded-lg" />

            <select className="border p-2 rounded-lg col-span-2">
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>

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
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">No HP</th>
              <th className="p-4">Level</th>
            </tr>
          </thead>

          <tbody>
            {customersData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-pink-50">
                <td className="p-4 font-bold">{item.id}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}