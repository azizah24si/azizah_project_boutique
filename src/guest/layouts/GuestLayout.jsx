import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GuestLayout() {
  const { user, profile } = useAuth();

  // Jika user sudah login sebagai member, redirect ke member dashboard
  if (user && profile?.role === "member") {
    return <Navigate to="/member" replace />;
  }

  // Jika user sudah login sebagai admin, redirect ke admin dashboard
  if (user && profile?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
