import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./guest/layouts/GuestLayout";
import { ToastProvider } from "./components/Toast";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy Load Admin Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Customers = lazy(() => import("./pages/Customers"));
const ComponentDemo = lazy(() => import("./pages/ComponentDemo"));
const ShadcnDemo = lazy(() => import("./pages/ShadcnDemo"));

// Lazy Load Member Pages
const MemberDashboard = lazy(() => import("./pages/member/MemberDashboard"));
const MemberProducts = lazy(() => import("./pages/member/MemberProducts"));
const MemberProductDetail = lazy(() => import("./pages/member/MemberProductDetail"));
const MemberCart = lazy(() => import("./pages/member/MemberCart"));
const MemberOrders = lazy(() => import("./pages/member/MemberOrders"));
const MemberProfile = lazy(() => import("./pages/member/MemberProfile"));

// Lazy Load Guest Pages (Public - Belum Login)
const GuestHome = lazy(() => import("./guest/pages/Home"));
const GuestProductDetail = lazy(() => import("./guest/pages/ProductDetail"));

const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center 
            min-h-screen text-pink-500 font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>

          {/* 🌐 GUEST LAYOUT - Public Website (Untuk Pengunjung Yang BELUM Login) */}
          <Route path="/guest" element={<GuestLayout />}>
            <Route index element={<GuestHome />} />
            <Route path="products/:id" element={<GuestProductDetail />} />
          </Route>

          {/* 🔐 ADMIN LAYOUT - Protected (admin role only) */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="customers" element={<Customers />} />
              <Route path="demo" element={<ComponentDemo />} />
              <Route path="shadcn" element={<ShadcnDemo />} />

              {/* 🔸 ERROR PAGES */}
              <Route
                path="400"
                element={
                  <ErrorPage
                    code="400"
                    description="Permintaan tidak valid pada sistem boutique"
                    image="https://cdn-icons-png.flaticon.com/512/4076/4076506.png"
                  />
                }
              />
              <Route
                path="401"
                element={
                  <ErrorPage
                    code="401"
                    description="Kamu belum login ke sistem boutique"
                    image="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  />
                }
              />
              <Route
                path="403"
                element={
                  <ErrorPage
                    code="403"
                    description="Akses ke halaman ini dibatasi"
                    image="https://cdn-icons-png.flaticon.com/512/4076/4076555.png"
                  />
                }
              />
            </Route>
          </Route>

          {/* 👤 MEMBER LAYOUT - Protected (member role only) */}
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route path="/member" element={<MainLayout />}>
              <Route index element={<MemberDashboard />} />
              <Route path="products" element={<MemberProducts />} />
              <Route path="products/:id" element={<MemberProductDetail />} />
              <Route path="cart" element={<MemberCart />} />
              <Route path="orders" element={<MemberOrders />} />
              <Route path="profile" element={<MemberProfile />} />
            </Route>
          </Route>

          {/* 🔹 ROOT PATH - Redirect to Guest */}
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<GuestHome />} />
          </Route>

          {/* 🔹 AUTH LAYOUT */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* 🔹 404 NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
