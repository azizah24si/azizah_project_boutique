import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaTshirt,
  FaListUl,
  FaUserFriends,
  FaSignOutAlt,
  FaQuestionCircle,
  FaShoppingBag,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
    ${
      isActive
        ? "bg-cyan-400 text-white shadow-md"
        : "text-gray-500 hover:bg-gray-50"
    }`;

  // Role-based menu items
  const isAdmin = profile?.role === "admin";

  const adminMenu = [
    { to: "/admin", icon: <FaThLarge />, label: "Dashboard", end: true },
    { to: "/admin/product", icon: <FaTshirt />, label: "Produk" },
    { to: "/admin/orders", icon: <FaListUl />, label: "Penjualan" },
    { to: "/admin/customers", icon: <FaUserFriends />, label: "Pelanggan" },
  ];

  const memberMenu = [
    { to: "/member", icon: <FaThLarge />, label: "Dashboard", end: true },
    { to: "/member/orders", icon: <FaHistory />, label: "Riwayat Pembelian" },
    { to: "/member/profile", icon: <FaUserCircle />, label: "Profil Saya" },
  ];

  const menuItems = isAdmin ? adminMenu : memberMenu;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="w-72 min-h-screen bg-white flex flex-col px-8 py-8">
      
      {/* LOGO */}
      <div className="mb-10 flex flex-col items-center">
        <img
          src="/img/logojijah.png"
          alt="Jijah Boutique"
          className="w-24 h-24 object-contain"
        />

        <h1 className="text-xl font-bold text-gray-700 mt-3">
          Jijah<span className="text-cyan-400">Boutique</span>
        </h1>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-3"></div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={menuClass}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {/* Member checkout link */}
        {!isAdmin && (
          <NavLink to="/guest/products" className={menuClass}>
            <FaShoppingBag />
            Belanja Produk
          </NavLink>
        )}
      </nav>

      {/* HELP CARD */}
      <div className="mt-auto">
        <div className="bg-gradient-to-br from-cyan-400 to-teal-400 rounded-2xl p-6 text-white text-center relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaQuestionCircle className="text-2xl text-cyan-400" />
            </div>

            <h3 className="font-bold text-sm mb-2">Need help?</h3>

            <p className="text-xs opacity-90 mb-4">
              Please check our docs
            </p>

            <button className="bg-white text-cyan-400 w-full py-2 rounded-xl font-bold text-xs hover:bg-gray-50 transition">
              DOCUMENTATION
            </button>
          </div>

        </div>

        {/* LOGOUT */}
        <button 
          onClick={handleLogout}
          className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-red-500 hover:text-white transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}
