import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-[#f8f9fb]">

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-lg w-full">

        <img
          src={image}
          alt="Error Illustration"
          className="w-64 mx-auto mb-6"
        />

        <h1 className="text-7xl font-black text-cyan-400">
          {code}
        </h1>

        <p className="text-2xl font-bold text-gray-700 mt-4">
          {description}
        </p>

        <p className="text-gray-400 mt-3 leading-relaxed">
          Terjadi kendala pada sistem boutique.
          Silakan coba lagi atau kembali ke dashboard.
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