import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaCog, FaUser, FaSignOutAlt, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import Tooltip from "./Tooltip";
import Badge from "./Badge";
import Input from "./Input";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../services/ordersAPI";
import { productsAPI } from "../services/productsAPI";
import { supabase } from "../lib/supabase";

export default function Header() {
  const { profile, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notifCount, setNotifCount] = useState(0);

  // Use profile data from auth context, fallback to defaults
  const displayName = profile?.full_name || "User";
  const displayRole = profile?.role || "member";
  const isMember = displayRole === "member";
  const isAdmin = displayRole === "admin";

  useEffect(() => {
    if (isAdmin) {
      loadNotifications();
    }
  }, [isAdmin]);

  const loadNotifications = async () => {
    try {
      const notifs = [];
      
      // 1. Check pending orders (new orders)
      const orders = await getAllOrders();
      const pendingOrders = orders.filter(o => o.status === "pending");
      pendingOrders.slice(0, 3).forEach(order => {
        notifs.push({
          label: `Pesanan baru #${order.id.substring(0, 8).toUpperCase()}`,
          onClick: () => navigate("/admin/orders"),
          type: "order"
        });
      });

      // 2. Check low stock products (stock <= 5)
      const products = await productsAPI.getAll();
      const lowStockProducts = products.filter(p => p.stock <= 5 && p.stock > 0);
      lowStockProducts.slice(0, 2).forEach(product => {
        notifs.push({
          label: `Stok ${product.name} hampir habis (${product.stock} pcs)`,
          onClick: () => navigate("/product"),
          type: "stock"
        });
      });

      // 3. Check new customers (registered today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data: newCustomers } = await supabase
        .from("customers")
        .select("full_name, created_at")
        .gte("created_at", today.toISOString())
        .order("created_at", { ascending: false })
        .limit(2);

      if (newCustomers) {
        newCustomers.forEach(customer => {
          notifs.push({
            label: `Pelanggan baru: ${customer.full_name}`,
            onClick: () => navigate("/customers"),
            type: "customer"
          });
        });
      }

      setNotifications(notifs);
      setNotifCount(notifs.length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const notifItems = [
    ...notifications.map(notif => ({
      label: notif.label,
      onClick: notif.onClick
    })),
    ...(notifications.length > 0 ? [{ divider: true }] : []),
    { label: notifications.length > 0 ? "Lihat semua notifikasi" : "Tidak ada notifikasi", onClick: () => navigate("/admin/orders") },
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

        {/* CART ICON - Only for Members */}
        {isMember && (
          <Tooltip content="Keranjang Belanja" position="bottom">
            <button 
              onClick={() => navigate("/member/cart")}
              className="relative cursor-pointer text-gray-400 hover:text-cyan-400 text-lg transition-colors"
            >
              <FaShoppingCart />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">{getTotalItems()}</span>
                </span>
              )}
            </button>
          </Tooltip>
        )}

        {/* NOTIFICATIONS */}
        {isAdmin && (
          <Dropdown
            align="right"
            trigger={
              <Tooltip content="Notifikasi" position="bottom">
                <div className="relative cursor-pointer text-gray-400 hover:text-cyan-400 text-lg transition-colors">
                  <FaBell />
                  {notifCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">{notifCount}</span>
                    </span>
                  )}
                </div>
              </Tooltip>
            }
            items={notifItems}
          />
        )}

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
