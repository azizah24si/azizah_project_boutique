import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./guest/layouts/GuestLayout";
import { ToastProvider } from "./components/Toast";
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
const MemberOrders = lazy(() => import("./pages/member/MemberOrders"));
const MemberProfile = lazy(() => import("./pages/member/MemberProfile"));

// Lazy Load Guest Pages
const GuestHome = lazy(() => import("./guest/pages/Home"));
const GuestProducts = lazy(() => import("./guest/pages/Products"));
const GuestProductDetail = lazy(() => import("./guest/pages/ProductDetail"));
const GuestReservation = lazy(() => import("./guest/pages/Reservation"));
const GuestContact = lazy(() => import("./guest/pages/Contact"));
const GuestAbout = lazy(() => import("./guest/pages/About"));
const GuestGallery = lazy(() => import("./guest/pages/Gallery"));

const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <ToastProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center 
          min-h-screen text-pink-500 font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>

          {/* 🌐 GUEST LAYOUT - Public Website */}
          <Route path="/guest" element={<GuestLayout />}>
            <Route index element={<GuestHome />} />
            <Route path="products" element={<GuestProducts />} />
            <Route path="products/:id" element={<GuestProductDetail />} />
            <Route path="reservation" element={<GuestReservation />} />
            <Route path="contact" element={<GuestContact />} />
            <Route path="about" element={<GuestAbout />} />
            <Route path="gallery" element={<GuestGallery />} />
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

        </Routes>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
