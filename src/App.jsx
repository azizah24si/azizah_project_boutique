import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { ToastProvider } from "./components/Toast";

// Lazy Load Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Customers = lazy(() => import("./pages/Customers"));
const Quest = lazy(() => import("./pages/Quest"));
const ComponentDemo = lazy(() => import("./pages/ComponentDemo"));
const ShadcnDemo = lazy(() => import("./pages/ShadcnDemo"));

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

          {/* 🔹 MAIN LAYOUT */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/demo" element={<ComponentDemo />} />
            <Route path="/shadcn" element={<ShadcnDemo />} />

            {/* 🔸 ERROR PAGES */}
            <Route
              path="/400"
              element={
                <ErrorPage
                  code="400"
                  description="Permintaan tidak valid pada sistem boutique"
                  image="https://cdn-icons-png.flaticon.com/512/4076/4076506.png"
                />
              }
            />

            <Route
              path="/401"
              element={
                <ErrorPage
                  code="401"
                  description="Kamu belum login ke sistem boutique"
                  image="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                />
              }
            />

            <Route
              path="/403"
              element={
                <ErrorPage
                  code="403"
                  description="Akses ke halaman ini dibatasi"
                  image="https://cdn-icons-png.flaticon.com/512/4076/4076555.png"
                />
              }
            />

            <Route path="*" element={<NotFound />} />
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