import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-5 bg-pink-50">

      <img 
        src={image} 
        alt="Error Illustration" 
        className="w-64 mb-6"
      />

      <h1 className="text-7xl font-black text-pink-500">
        {code}
      </h1>

      <p className="text-xl font-bold text-gray-800 mt-4">
        {description}
      </p>

      <p className="text-gray-500 mt-2">
        Terjadi kendala pada sistem boutique. Silakan coba lagi atau kembali ke dashboard.
      </p>

      <Link 
        to="/" 
        className="mt-8 px-6 py-2 bg-pink-500 text-white rounded-xl font-bold shadow hover:bg-pink-600 transition-all"
      >
        Kembali ke Dashboard
      </Link>

    </div>
  );
}