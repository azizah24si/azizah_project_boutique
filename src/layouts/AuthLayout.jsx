import { Outlet, NavLink } from "react-router-dom";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaThLarge,
} from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] relative overflow-hidden">

      {/* TOP BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[420px] bg-cyan-400 rounded-b-[40px] overflow-hidden">

        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,white_1px,transparent_1px)] bg-[size:25px_25px]"></div>
        </div>

      </div>

      

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16">

        {/* WELCOME */}
        <div className="text-center text-white mb-10">

          <h1 className="text-5xl font-bold">
            Welcome!
          </h1>

          <p className="mt-4 text-white/90 max-w-xl leading-relaxed">
            Use this awesome boutique dashboard to manage products,
            customers, and fashion sales with a modern interface.
          </p>

        </div>

        {/* FORM CARD */}
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <Outlet />

        </div>

      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center text-sm text-gray-400 pb-8">
        © 2025 Jijah Boutique Dashboard
      </div>

    </div>
  );
}