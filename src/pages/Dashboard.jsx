import React from "react";
import { FaShoppingBag, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  const recentOrders = [
    { id: "#B001", product: "Dress Floral", customer: "Aisyah", status: "Selesai" },
    { id: "#B002", product: "Blouse Korean", customer: "Nadia", status: "Pending" },
    { id: "#B003", product: "Outer Vintage", customer: "Salsa", status: "Batal" },
  ];

  return (
    <div className="p-4">

      <PageHeader title="Dashboard Boutique" breadcrumb={["Dashboard"]} />

      <div className="grid grid-cols-3 gap-6 mt-4">

        <div className="bg-white p-6 rounded-2xl shadow">
          <FaShoppingBag className="text-pink-500 text-2xl" />
          <h2 className="text-xl font-bold mt-2">120</h2>
          <p>Total Produk</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <FaShoppingBag className="text-pink-500 text-2xl" />
          <h2 className="text-xl font-bold mt-2">80</h2>
          <p>Total Pelanggan</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <FaDollarSign className="text-pink-500 text-2xl" />
          <h2 className="text-xl font-bold mt-2">Rp 5.000.000</h2>
          <p>Total Penjualan</p>
        </div>
      </div>

      <div className="bg-white mt-6 p-6 rounded-2xl shadow">
        <h3 className="font-bold mb-4">Transaksi Terbaru</h3>

        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produk</th>
              <th>Pelanggan</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>{item.customer}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}