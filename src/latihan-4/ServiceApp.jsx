import data from "./serviceData.json";
import { useState } from "react";

export default function ServiceApp() {
  const [view, setView] = useState("guest");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  // ambil kategori unik
  const categories = [...new Set(data.map((item) => item.category))];

  // filter data
  const filtered = data.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? item.category === category : true;
    const matchRating = rating ? item.rating >= parseFloat(rating) : true;

    return matchSearch && matchCategory && matchRating;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* SWITCH VIEW */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("guest")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Guest
        </button>
        <button
          onClick={() => setView("admin")}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Admin
        </button>
      </div>

      {/* FILTER */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Category</option>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">All Rating</option>
          <option value="4">4+ ⭐</option>
          <option value="3">3+ ⭐</option>
        </select>
      </div>

      {/* GUEST VIEW */}
      {view === "guest" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-4 hover:scale-105 transition"
            >
              <img
                src={item.image}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p>Rp {item.price}</p>
              <p>⭐ {item.rating}</p>
            </div>
          ))}
        </div>
      )}

      {/* ADMIN VIEW */}
      {view === "admin" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Harga</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Provider</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">Rp {item.price}</td>
                  <td className="border p-2">{item.rating}</td>
                  <td className="border p-2">
                    {item.details.provider}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}