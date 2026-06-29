import { useState, useEffect } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Tabs from '../components/Tabs';
import Card from '../components/Card';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';

export default function Customers() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch customers from profiles table
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'member')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      addToast({
        title: 'Gagal memuat data customer',
        description: error.message,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchSearch = customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       customer.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === 'All' || customer.member_level === filterLevel;
    
    return matchSearch && matchLevel;
  });

  // Statistik CRM
  const stats = {
    total: customers.length,
    active: customers.length, // All members are considered active
    platinum: customers.filter(customer => customer.member_level === 'Platinum').length,
    gold: customers.filter(customer => customer.member_level === 'Gold').length,
    silver: customers.filter(customer => customer.member_level === 'Silver').length,
    bronze: customers.filter(customer => customer.member_level === 'Bronze').length,
    totalPoints: customers.reduce((total, customer) => total + Number(customer.loyalty_points || 0), 0),
  };

  // Fungsi format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Fungsi format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fungsi get badge color berdasarkan level
  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Platinum': return 'cyan';
      case 'Gold': return 'yellow';
      case 'Silver': return 'gray';
      case 'Bronze': return 'orange';
      default: return 'blue';
    }
  };

  const tabs = [
    { id: 'all', label: 'Semua Member', count: stats.total },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Member</h1>
          <p className="text-gray-600 mt-1">Kelola data member boutique</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Member</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Member Gold</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.gold}</p>
            </div>
            <div className="text-4xl">🥇</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-600 font-medium">Member Platinum</p>
              <p className="text-2xl font-bold text-cyan-900">{stats.platinum}</p>
            </div>
            <div className="text-4xl">💎</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Loyalty Points</p>
              <p className="text-xl font-bold text-purple-900">{stats.totalPoints.toLocaleString()}</p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>
        </Card>
      </div>

      {/* Tabs untuk 4 Tipe CRM */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Cari member (nama, ID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="All">Semua Level</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </Select>
            </div>
          </div>

          {/* Customer Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loyalty Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bergabung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            {(customer.full_name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.full_name}</div>
                            <div className="text-sm text-gray-500">{customer.id.substring(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getLevelBadgeColor(customer.member_level)}>
                          {customer.member_level}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{customer.loyalty_points || 0} poin</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(customer.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-cyan-600 hover:text-cyan-900"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada member ditemukan</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Modal Detail Customer */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Card className="overflow-hidden shadow-2xl border border-slate-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {(selectedCustomer.full_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer.full_name}</h2>
                      <p className="text-gray-600">{selectedCustomer.id.substring(0, 8)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Member Level</p>
                    <Badge variant={getLevelBadgeColor(selectedCustomer.member_level)} size="md">
                      {selectedCustomer.member_level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Loyalty Points</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedCustomer.loyalty_points || 0} poin</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bergabung</p>
                    <p className="font-medium text-gray-900">{formatDate(selectedCustomer.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <Badge variant="blue">{selectedCustomer.role}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
