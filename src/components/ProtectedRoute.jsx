import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// ProtectedRoute: guards routes based on user authentication and role
// Usage: <ProtectedRoute allowedRoles={['admin']} />
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, profile, loading } = useAuth();

  // 🔍 DEBUG: Log authentication state
  console.log("🔐 ProtectedRoute Debug:", {
    loading,
    user: user?.email,
    profile,
    allowedRoles,
    roleMatch: allowedRoles?.includes(profile?.role)
  });

  // Show loading state while session/profile is being fetched
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("❌ No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if role doesn't match allowed roles
  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    console.log("❌ Role mismatch! User role:", profile?.role, "Allowed:", allowedRoles);
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access granted!");
  return <Outlet />;
};

export default ProtectedRoute;
