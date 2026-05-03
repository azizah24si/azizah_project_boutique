import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-5">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <p className="text-2xl font-bold text-gray-800 mt-4">Waduh! Halaman Tidak Ditemukan.</p>
      <p className="text-gray-500 mt-2 mb-8">
        Maaf, halaman yang kamu cari tidak ada atau telah dipindahkan.
      </p>
      <Link 
        to="/pertemuan-6" 
        className="px-6 py-3 bg-hijau text-white rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-all"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}