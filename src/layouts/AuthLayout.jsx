import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  // For register page, use full-width layout
  if (isRegisterPage) {
    return <Outlet />;
  }

  // For login and other auth pages, use split layout
  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT SIDE - FORM */}
      <div className="w-1/2 flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* RIGHT SIDE - GRADIENT */}
      <div className="w-1/2 bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 relative overflow-hidden flex items-center justify-center">
        
        {/* PATTERN */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,white_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        </div>

        {/* LOGO */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <img
            src="/img/logojijah.png"
            alt="Jijah Boutique"
            className="w-32 h-32 object-contain bg-white/20 rounded-3xl p-4"
          />
          <h1 className="text-white text-5xl font-bold tracking-wide">
            Jijah Boutique
          </h1>
          <p className="text-white/90 text-center max-w-md">
            Dashboard boutique modern untuk mengelola produk, pelanggan, dan transaksi penjualan
          </p>
        </div>

      </div>

    </div>
  );
}