import { FaSearch, FaBell, FaCog, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";
import Badge from "./Badge";
import Input from "./Input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  // Use profile data from auth context, fallback to defaults
  const displayName = profile?.full_name || "User";
  const displayRole = profile?.role || "member";

  const notifItems = [
    { label: "Pesanan baru #ORD-107", onClick: () => {} },
    { label: "Stok Dress Floral hampir habis", onClick: () => {} },
    { label: "Pelanggan baru: Rara", onClick: () => {} },
    { divider: true },
    { label: "Lihat semua notifikasi", onClick: () => {} },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const profileItems = [
    { label: "Profil Saya", icon: <FaUserCircle />, onClick: () => {} },
    { label: "Pengaturan", icon: <FaCog />, onClick: () => {} },
    { divider: true },
    { label: "Logout", icon: <FaSignOutAlt />, danger: true, onClick: handleLogout },
  ];

  return (
    <div className="flex justify-between items-center mb-8 bg-white rounded-2xl px-6 py-4 shadow-sm">

      {/* LEFT */}
      <div>
        <p className="text-xs text-gray-400 mb-1">Pages / Dashboard</p>
        <h1 className="text-lg font-bold text-gray-700">
          {displayRole === "admin" ? "Admin Dashboard" : "Member Dashboard"}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <Input
          placeholder="Type here..."
          icon={<FaSearch />}
          className="w-56"
        />

        {/* NOTIFICATIONS */}
        <Dropdown
          align="right"
          trigger={
            <Tooltip content="Notifikasi" position="bottom">
              <div className="relative cursor-pointer text-gray-400 hover:text-cyan-400 text-lg transition-colors">
                <FaBell />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">3</span>
                </span>
              </div>
            </Tooltip>
          }
          items={notifItems}
        />

        {/* SETTINGS */}
        <Tooltip content="Pengaturan" position="bottom">
          <button className="text-gray-400 hover:text-cyan-400 text-lg transition-colors">
            <FaCog />
          </button>
        </Tooltip>

        {/* PROFILE DROPDOWN */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar name={displayName} size="sm" color="cyan" status="online" />
              <span className="text-sm font-semibold text-gray-700">{displayName}</span>
            </div>
          }
          items={profileItems}
        />

      </div>
    </div>
  );
}
