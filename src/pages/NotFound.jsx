import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#f8f9fb] p-6">

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg w-full text-center">

        <h1 className="text-9xl font-black text-gray-200">
          404
        </h1>

        <p className="text-2xl font-bold text-gray-700 mt-4">
          Waduh! Halaman Tidak Ditemukan.
        </p>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Maaf, halaman yang kamu cari tidak ada
          atau telah dipindahkan.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-cyan-400 text-white rounded-2xl font-semibold shadow hover:bg-cyan-500 transition"
        >
          Kembali ke Dashboard
        </Link>

      </div>

    </div>
  );
}