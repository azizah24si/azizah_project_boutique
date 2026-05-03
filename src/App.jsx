import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />

        <Route
          path="/400"
          element={
            <ErrorPage
              code="400"
              description="Permintaan Gagal (Bad Request)"
              image="https://cdn-icons-png.flaticon.com/512/5804/5804978.png"
            />
          }
        />

        <Route
          path="/401"
          element={
            <ErrorPage
              code="401"
              description="Akses Tidak Diizinkan (Unauthorized)"
              image="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            />
          }
        />

        <Route
          path="/403"
          element={
            <ErrorPage
              code="403"
              description="Akses Dilarang (Forbidden)"
              image="https://cdn-icons-png.flaticon.com/512/2599/2599810.png"
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
  );
}

export default App;
