import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  const customersData = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-${500 + i}`,
    name: `User Name ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `0812-3456-78${i}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3],
  }));

  return (
    <div className="p-4">
      <PageHeader 
        title="Customer Database" 
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-hijau text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-all"
        >
          {showForm ? "Close Form" : "+ Add Customer"}
        </button>
      </PageHeader>

      {/* Form Add Customer */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border-l-4 border-hijau animate-in fade-in zoom-in duration-300">
          <h3 className="font-bold text-gray-700 mb-4">Register New Customer</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Customer ID" className="border p-2 rounded-lg" />
            <input type="text" placeholder="Full Name" className="border p-2 rounded-lg" />
            <input type="email" placeholder="Email Address" className="border p-2 rounded-lg" />
            <input type="tel" placeholder="Phone Number" className="border p-2 rounded-lg" />
            <select className="border p-2 rounded-lg col-span-2">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>
            <button className="bg-hijau text-white p-2 rounded-lg font-bold col-span-2">Save Customer</button>
          </div>
        </div>
      )}

      {/* Tabel Data Customers */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Loyalty</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {customersData.map((cust) => (
              <tr key={cust.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-800">{cust.id}</td>
                <td className="p-4">{cust.name}</td>
                <td className="p-4">{cust.email}</td>
                <td className="p-4">{cust.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    cust.loyalty === "Gold" ? "bg-yellow-100 text-yellow-600" : 
                    cust.loyalty === "Silver" ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-600"
                  }`}>
                    {cust.loyalty}
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