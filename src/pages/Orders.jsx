import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);

  const ordersData = Array.from({ length: 30 }, (_, i) => ({
    id: `ORD-2026-${100 + i}`,
    customer: `Customer Name ${i + 1}`,
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    price: `Rp ${(i + 1) * 15000}`,
    date: `2026-04-${(i % 28) + 1}`,
  }));

  return (
    <div className="p-4">
      <PageHeader 
        title="Orders Management" 
        breadcrumb={["Dashboard", "Orders List"]}
      >
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-hijau text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-all"
        >
          {showForm ? "Close Form" : "+ Add Orders"}
        </button>
      </PageHeader>

      {/* Form Add Order */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border-l-4 border-hijau animate-in fade-in zoom-in duration-300">
          <h3 className="font-bold text-gray-700 mb-4">Form Add New Order</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Order ID (e.g. ORD-001)" className="border p-2 rounded-lg focus:outline-hijau" />
            <input type="text" placeholder="Customer Name" className="border p-2 rounded-lg focus:outline-hijau" />
            <select className="border p-2 rounded-lg focus:outline-hijau">
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <input type="number" placeholder="Total Price" className="border p-2 rounded-lg focus:outline-hijau" />
            <input type="date" className="border p-2 rounded-lg focus:outline-hijau col-span-2" />
            <button className="bg-hijau text-white p-2 rounded-lg font-bold col-span-2">Submit Order</button>
          </div>
        </div>
      )}

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {ordersData.map((order) => (
              <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-800">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "Completed" ? "bg-green-100 text-green-600" : 
                    order.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 font-semibold">{order.price}</td>
                <td className="p-4 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}