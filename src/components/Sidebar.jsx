import { NavLink } from "react-router-dom";
import { FaThLarge, FaListUl, FaUserFriends, FaTshirt, FaSignOutAlt } 
from "react-icons/fa";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all 
  text-sm ${
      isActive
        ? "bg-pink-500 text-white shadow-md"
        : "text-gray-500 hover:bg-pink-100 hover:text-pink-500"
    }`;

  return (
    <div className="flex flex-col min-h-screen w-72 bg-white px-6 py-8 shadow-lg">

      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold font-poppins text-gray-800">
          Azizah<span className="text-pink-500">Boutique</span>
        </h1>
        <p className="text-xs text-gray-400">
          Fashion Admin Dashboard
        </p>
      </div>

      {/* MAIN MENU */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 uppercase mb-2">
          Main Menu
        </p>

        <NavLink to="/" className={menuClass}>
          <FaThLarge /> Dashboard
        </NavLink>

        <NavLink to="/product" className={menuClass}>
          <FaTshirt /> Produk
        </NavLink>

        <NavLink to="/orders" className={menuClass}>
          <FaListUl /> Penjualan
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          <FaUserFriends /> Pelanggan
        </NavLink>
      </div>

      {/* SYSTEM MENU */}
      <div className="flex flex-col gap-2 mt-8">
        <p className="text-xs text-gray-400 uppercase mb-2">
          System
        </p>

        <NavLink to="/400" className={menuClass}>
          <span className="font-bold">400</span> Bad Request
        </NavLink>

        <NavLink to="/401" className={menuClass}>
          <span className="font-bold">401</span> Unauthorized
        </NavLink>

        <NavLink to="/403" className={menuClass}>
          <span className="font-bold">403</span> Forbidden
        </NavLink>
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-10">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-pink-100 text-pink-500 hover:bg-pink-500 hover:text-white transition-all font-semibold">
          <FaSignOutAlt />
          Logout
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          © 2025 Boutique System
        </p>
      </div>

    </div>
  );
}