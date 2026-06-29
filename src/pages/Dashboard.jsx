import { useState, useEffect } from "react";
import {
  FaShoppingBag,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import ProgressBar from "../components/ProgressBar";
import Tabs from "../components/Tabs";
import Tooltip from "../components/Tooltip";
import Alert from "../components/Alert";
import { productsAPI } from "../services/productsAPI";
import { getAllOrders } from "../services/ordersAPI";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Real data from database
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    newOrders: 0,
    totalSales: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Fetch total products
      const products = await productsAPI.getAll();
      
      // 2. Fetch total customers
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("id", { count: "exact" });
      if (customersError) throw customersError;

      // 3. Fetch all orders
      const orders = await getAllOrders();
      
      // 4. Calculate stats
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      const completedOrders = orders.filter(o => o.status === "completed");
      const totalSalesAmount = completedOrders.reduce((sum, order) => sum + (order.net_amount || 0), 0);

      // 5. Get recent orders (last 6)
      const recent = orders
        .slice(0, 6)
        .map(order => ({
          item: `${order.customer?.full_name || "Guest"} - ${order.items?.[0]?.product_name || "Order"}`,
          amount: order.net_amount,
          date: new Date(order.created_at).toLocaleDateString("id-ID", { 
            day: "2-digit", 
            month: "short", 
            hour: "2-digit", 
            minute: "2-digit" 
          }).toUpperCase(),
          avatar: order.customer?.full_name || "Guest",
          status: order.status,
        }));

      setStats({
        totalProducts: products.length,
        totalCustomers: customers?.length || 0,
        newOrders: pendingOrders,
        totalSales: totalSalesAmount,
      });
      setRecentOrders(recent);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Produk",
      value: loading ? "..." : stats.totalProducts.toString(),
      trend: "+0%",
      icon: <FaShoppingBag />,
      iconColor: "cyan",
    },
    {
      title: "Total Pelanggan",
      value: loading ? "..." : stats.totalCustomers.toString(),
      trend: "+0%",
      icon: <FaUsers />,
      iconColor: "pink",
    },
    {
      title: "Pesanan Baru",
      value: loading ? "..." : `${stats.newOrders}`,
      trend: "+0%",
      icon: <FaChartLine />,
      iconColor: "green",
    },
  ];

  const projects = [
    { name: "Dress Floral Collection", budget: "Rp 14JT", status: "Working", completion: 60 },
    { name: "Korean Style Blouse", budget: "Rp 3JT", status: "Canceled", completion: 10 },
    { name: "Vintage Outer Series", budget: "Not set", status: "Done", completion: 100 },
    { name: "Summer Collection 2025", budget: "Rp 32JT", status: "Done", completion: 100 },
    { name: "New Hijab Collection", budget: "Rp 4JT", status: "Working", completion: 25 },
    { name: "Redesign Online Shop", budget: "Rp 7.6JT", status: "Canceled", completion: 40 },
  ];

  const orders = recentOrders.length > 0 ? recentOrders : [
    { item: "Belum ada order", date: "-", avatar: "System", status: "pending" },
  ];

  const statusBadge = {
    Working: <Badge variant="cyan" dot>Working</Badge>,
    Done: <Badge variant="green" dot>Done</Badge>,
    Canceled: <Badge variant="red" dot>Canceled</Badge>,
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects", badge: projects.length },
    { key: "orders", label: "Orders", badge: orders.length },
  ];

  return (
    <div className="space-y-6">

      {/* ALERT */}
      {showAlert && (
        <Alert
          variant="info"
          title="Dashboard Boutique aktif"
          dismissible
          onDismiss={() => setShowAlert(false)}
        >
          Selamat datang kembali! Ada {stats.newOrders} pesanan baru yang perlu diproses hari ini.
        </Alert>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-6">
        {cards.map((item, index) => (
          <Tooltip key={index} content={`Lihat detail ${item.title}`} position="top">
            <Card
              title={item.title}
              value={item.value}
              trend={item.trend}
              icon={item.icon}
              iconColor={item.iconColor}
            />
          </Tooltip>
        ))}
      </div>

      {/* BANNER */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 rounded-2xl p-8 text-white col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:25px_25px]"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm opacity-90 mb-2">Built by developers</p>
              <h2 className="text-3xl font-bold mb-3">Jijah Boutique Dashboard</h2>
              <p className="text-sm opacity-90 max-w-md leading-relaxed">
                Dashboard boutique modern untuk mengelola produk, pelanggan, dan transaksi penjualan dengan tampilan elegan.
              </p>
              <button className="mt-6 text-white font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Read more →
              </button>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-5xl text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800')] bg-cover bg-center rounded-2xl relative overflow-hidden">
          <div className="bg-gradient-to-t from-black/70 to-transparent w-full h-full p-6 text-white flex flex-col justify-end">
            <h2 className="text-2xl font-bold mb-2">Boutique Fashion</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Kelola penjualan fashion boutique lebih mudah dan modern.
            </p>
            <button className="mt-4 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Read more →
            </button>
          </div>
        </div>
      </div>

      {/* CHART & ACTIVE USERS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#1a1f37] rounded-2xl p-6 text-white">
          <h3 className="font-bold text-sm mb-1">Active Users</h3>
          <p className="text-xs text-gray-400 mb-6">(+23) than last week</p>
          <div className="flex items-end gap-3 h-40 mb-6">
            <div className="w-2 bg-white rounded-full h-20"></div>
            <div className="w-2 bg-white rounded-full h-32"></div>
            <div className="w-2 bg-white rounded-full h-16"></div>
            <div className="w-2 bg-white rounded-full h-36"></div>
            <div className="w-2 bg-white rounded-full h-24"></div>
            <div className="w-2 bg-white rounded-full h-32"></div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { icon: <FaUsers className="text-cyan-400 text-xs" />, label: "Customers", val: stats.totalCustomers },
              { icon: <FaChartLine className="text-green-400 text-xs" />, label: "Orders", val: recentOrders.length },
              { icon: <FaShoppingBag className="text-orange-400 text-xs" />, label: "Products", val: stats.totalProducts },
              { icon: <FaChartLine className="text-pink-400 text-xs" />, label: "Pending", val: stats.newOrders },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-center mb-1">{s.icon}</div>
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className="font-bold text-sm">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 col-span-2 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700">Pelanggan Overview</h3>
          <p className="text-cyan-500 text-sm font-bold mt-1">Total {stats.totalCustomers} pelanggan terdaftar</p>
          <div className="mt-8 h-56 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full" fill="none">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 150 C100 50, 200 180, 300 80 C350 30, 420 160, 500 70 L500 200 L0 200 Z" fill="url(#gradient1)" />
              <path d="M0 150 C100 50, 200 180, 300 80 C350 30, 420 160, 500 70" stroke="#2dd4bf" strokeWidth="3" />
              <path d="M0 120 C100 200, 220 100, 320 170 C400 220, 450 80, 500 140" stroke="#1f2937" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" className="mb-6" />

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="pb-4 font-bold">COMPANIES</th>
                <th className="pb-4 font-bold">BUDGET</th>
                <th className="pb-4 font-bold">STATUS</th>
                <th className="pb-4 font-bold">COMPLETION</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-4 text-sm font-semibold text-gray-700">{item.name}</td>
                  <td className="py-4 text-sm text-gray-600">{item.budget}</td>
                  <td className="py-4">{statusBadge[item.status]}</td>
                  <td className="py-4 w-48">
                    <ProgressBar value={item.completion} size="md" color={item.status === "Canceled" ? "pink" : item.completion === 100 ? "green" : "cyan"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Avatar name={item.avatar} size="sm" color={["cyan", "pink", 
                    "green", "orange", "purple"][index % 5]} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">{item.item}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                  <Badge 
                    variant={item.status === "completed" ? "green" : item.status === "pending" ? "yellow" : "red"} 
                    size="sm"
                  >
                    {item.status === "completed" ? "Selesai" : item.status === "pending" ? "Pending" : "Batal"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Belum ada order</p>
              </div>
            )}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Projects Overview</h3>
              <div className="space-y-4">
                {projects.slice(0, 4).map((item, i) => (
                  <ProgressBar
                    key={i}
                    label={item.name}
                    value={item.completion}
                    color={item.status === "Canceled" ? "pink" : item.completion === 100 ? "green" : "cyan"}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.length > 0 ? (
                  recentOrders.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                        item.status === "completed" ? "bg-green-400" : 
                        item.status === "pending" ? "bg-yellow-400" : "bg-red-400"
                      }`}></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{item.item}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    Belum ada order
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
