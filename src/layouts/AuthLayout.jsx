import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Boutique
        </h1>

        <Outlet />

        <p className="text-center text-sm mt-6">
          © 2025 Boutique System
        </p>
      </div>
    </div>
  );
}