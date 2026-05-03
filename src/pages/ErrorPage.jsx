import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-5">
      <img src={image} alt="Error Illustration" className="w-64 mb-6" />
      <h1 className="text-7xl font-black text-hijau">{code}</h1>
      <p className="text-xl font-bold text-gray-800 mt-4">{description}</p>
      <Link to="/" className="mt-8 px-6 py-2 bg-hijau text-white rounded-xl font-bold shadow-lg">
        Back to Dashboard
      </Link>
    </div>
  );
}