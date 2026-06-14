import { useState } from 'react';
import customersData, { 
  getCustomersByCity,
  getCustomersBySource 
} from '../data/customersData';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Tabs from '../components/Tabs';
import Card from '../components/Card';
import Modal from '../components/Modal';

const initialFormValues = {
  namaLengkap: '',
  email: '',
  nomorHP: '',
  kota: '',
  username: '',
  levelMember: 'Gold',
  statusMember: 'Aktif',
  produkFavorit: '',
  kategoriFavorit: '',
  totalTransaksi: 0,
  metodePembayaran: 'E-Wallet',
  tanggalDaftar: new Date().toISOString().slice(0, 10),
  tanggalPembelianTerakhir: new Date().toISOString().slice(0, 10),
  sumberCustomer: 'Instagram',
  statusPromo: 'Tidak Aktif',
};

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);

  const resetForm = () => setFormValues(initialFormValues);

  const handleFormChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormValues({
      namaLengkap: customer.namaLengkap,
      email: customer.email,
      nomorHP: customer.nomorHP,
      kota: customer.kota,
      username: customer.username,
      levelMember: customer.levelMember,
      statusMember: customer.statusMember,
      produkFavorit: customer.produkFavorit,
      kategoriFavorit: customer.kategoriFavorit,
      totalTransaksi: customer.totalTransaksi,
      metodePembayaran: customer.metodePembayaran,
      tanggalDaftar: customer.tanggalDaftar,
      tanggalPembelianTerakhir: customer.tanggalPembelianTerakhir,
      sumberCustomer: customer.sumberCustomer,
      statusPromo: customer.statusPromo,
    });
  };

  const handleSaveEdit = () => {
    if (!editingCustomer) return;

    const updatedCustomers = customers.map((customer) =>
      customer.id === editingCustomer.id ? { ...customer, ...formValues } : customer
    );

    setCustomers(updatedCustomers);
    setEditingCustomer(null);
    if (selectedCustomer?.id === editingCustomer.id) {
      setSelectedCustomer({ ...selectedCustomer, ...formValues });
    }
  };

  const handleAddCustomer = () => {
    const newId = `BTK${String(customers.length + 1).padStart(4, '0')}`;
    const newCustomer = {
      id: newId,
      ...formValues,
      totalTransaksi: Number(formValues.totalTransaksi),
    };

    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleStartEdit = (customer) => {
    handleOpenEditModal(customer);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchSearch = customer.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === 'All' || customer.levelMember === filterLevel;
    const matchStatus = filterStatus === 'All' || customer.statusMember === filterStatus;
    
    return matchSearch && matchLevel && matchStatus;
  });

  // Statistik CRM
  const stats = {
    total: customers.length,
    active: customers.filter(customer => customer.statusMember === 'Aktif').length,
    platinum: customers.filter(customer => customer.levelMember === 'Platinum').length,
    gold: customers.filter(customer => customer.levelMember === 'Gold').length,
    silver: customers.filter(customer => customer.levelMember === 'Silver').length,
    totalRevenue: customers.reduce((total, customer) => total + Number(customer.totalTransaksi), 0),
    activePromo: customers.filter(customer => customer.statusPromo === 'Aktif').length,
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fungsi get badge color berdasarkan level
  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Platinum': return 'purple';
      case 'Gold': return 'yellow';
      case 'Silver': return 'gray';
      default: return 'blue';
    }
  };

  const tabs = [
    { id: 'all', label: 'Semua Customer', count: stats.total },
    { id: 'operational', label: 'CRM Operasional', icon: '📊' },
    { id: 'analytical', label: 'CRM Analitis', icon: '📈' },
    { id: 'sales', label: 'CRM Penjualan', icon: '💰' },
    { id: 'collaborative', label: 'CRM Kolaboratif', icon: '🤝' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customer Relationship Management</h1>
          <p className="text-gray-600 mt-1">Kelola data dan hubungan dengan customer butik</p>
        </div>
        <Button variant="primary" onClick={handleOpenAddModal}>
          + Tambah Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Customer</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Customer Aktif</p>
              <p className="text-2xl font-bold text-green-900">{stats.active}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
              <p className="text-xl font-bold text-purple-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="text-4xl">💎</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Promo Aktif</p>
              <p className="text-2xl font-bold text-orange-900">{stats.activePromo}</p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>
        </Card>
      </div>

      {/* Tabs untuk 4 Tipe CRM */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content berdasarkan Tab */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Cari customer (nama, email, ID)..."
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
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
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
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Transaksi
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
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {customer.namaLengkap.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.namaLengkap}</div>
                            <div className="text-sm text-gray-500">{customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.nomorHP}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color={getLevelBadgeColor(customer.levelMember)}>
                          {customer.levelMember}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color={customer.statusMember === 'Aktif' ? 'green' : 'red'}>
                          {customer.statusMember}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(customer.totalTransaksi)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(customer)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* CRM Operasional */}
      {activeTab === 'operational' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 CRM Operasional</h2>
            <p className="text-gray-600 mb-6">
              Mengelola interaksi harian dengan customer, melacak komunikasi, dan menangani layanan customer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Customer Service</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                <p className="text-sm text-blue-700">Customer memerlukan respons</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Follow Up</h3>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-700">Customer perlu di-follow up</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">Komplain</h3>
                <p className="text-2xl font-bold text-orange-600">2</p>
                <p className="text-sm text-orange-700">Komplain perlu ditangani</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Aktivitas Terbaru</h3>
              {customers.slice(0, 5).map(customer => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.namaLengkap.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.namaLengkap}</p>
                      <p className="text-sm text-gray-500">Pembelian terakhir: {formatDate(customer.tanggalPembelianTerakhir)}</p>
                    </div>
                  </div>
                  <Badge color="blue">Perlu Follow Up</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* CRM Analitis */}
      {activeTab === 'analytical' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📈 CRM Analitis</h2>
            <p className="text-gray-600 mb-6">
              Analisis data customer untuk mendapatkan insight dan membuat keputusan bisnis yang lebih baik.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">Member Platinum</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.platinum}</p>
                <p className="text-sm text-purple-700">{((stats.platinum/stats.total)*100).toFixed(1)}% dari total</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Member Gold</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.gold}</p>
                <p className="text-sm text-yellow-700">{((stats.gold/stats.total)*100).toFixed(1)}% dari total</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Member Silver</h3>
                <p className="text-2xl font-bold text-gray-600">{stats.silver}</p>
                <p className="text-sm text-gray-700">{((stats.silver/stats.total)*100).toFixed(1)}% dari total</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-900 mb-2">Avg. Transaction</h3>
                <p className="text-xl font-bold text-indigo-600">
                  {formatCurrency(stats.totalRevenue / stats.total)}
                </p>
                <p className="text-sm text-indigo-700">Per customer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Distribusi Customer per Kota</h3>
                {['Dumai', 'Medan', 'Bandung', 'Jakarta', 'Padang'].map(city => {
                  const count = getCustomersByCity(city).length;
                  return (
                    <div key={city} className="flex items-center justify-between mb-3">
                      <span className="text-gray-700">{city}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(count/stats.total)*100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Sumber Akuisisi Customer</h3>
                {['Instagram', 'Facebook', 'TikTok', 'Website', 'Referral'].map(source => {
                  const count = getCustomersBySource(source).length;
                  return (
                    <div key={source} className="flex items-center justify-between mb-3">
                      <span className="text-gray-700">{source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{width: `${(count/stats.total)*100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* CRM Penjualan */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💰 CRM Penjualan</h2>
            <p className="text-gray-600 mb-6">
              Mengelola proses penjualan, tracking leads, dan optimasi konversi customer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Hot Leads</h3>
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-sm text-green-700">Customer siap closing</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Warm Leads</h3>
                <p className="text-2xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-yellow-700">Perlu nurturing</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Cold Leads</h3>
                <p className="text-2xl font-bold text-blue-600">7</p>
                <p className="text-sm text-blue-700">Perlu follow up</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Top Spending Customers</h3>
              {[...customers]
                .sort((a, b) => b.totalTransaksi - a.totalTransaksi)
                .slice(0, 5)
                .map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.namaLengkap.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.namaLengkap}</p>
                      <p className="text-sm text-gray-500">{customer.levelMember} • {customer.produkFavorit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{formatCurrency(customer.totalTransaksi)}</p>
                    <p className="text-sm text-gray-500">{customer.metodePembayaran}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* CRM Kolaboratif */}
      {activeTab === 'collaborative' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🤝 CRM Kolaboratif</h2>
            <p className="text-gray-600 mb-6">
              Koordinasi tim untuk memberikan pengalaman customer yang seamless di semua touchpoint.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Tim Customer Service</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Siti - Online</span>
                    <Badge color="green">5 Active Chats</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Rina - Online</span>
                    <Badge color="green">3 Active Chats</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Dewi - Offline</span>
                    <Badge color="gray">Offline</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-3">Tim Sales</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Maya - Online</span>
                    <Badge color="purple">4 Leads</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Fitri - Online</span>
                    <Badge color="purple">6 Leads</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Aulia - Online</span>
                    <Badge color="purple">3 Leads</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Riwayat Kolaborasi Tim</h3>
              {customers.slice(0, 6).map(customer => (
                <div key={customer.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.namaLengkap.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.namaLengkap}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <Badge color={customer.statusMember === 'Aktif' ? 'green' : 'gray'}>
                      {customer.statusMember}
                    </Badge>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>🔔 CS: Siti</span>
                    <span>•</span>
                    <span>💼 Sales: Maya</span>
                    <span>•</span>
                    <span>📦 Terakhir dihandle: {formatDate(customer.tanggalPembelianTerakhir)}</span>
                  </div>
                </div>
              ))}
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
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Card className="overflow-hidden shadow-2xl border border-slate-200">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedCustomer.namaLengkap.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer.namaLengkap}</h2>
                      <p className="text-gray-600">{selectedCustomer.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nomor HP</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.nomorHP}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Kota</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.kota}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Username</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.username}</p>
                  </div>
                </div>

                <div className="border-t pt-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Informasi Membership</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Level Member</p>
                      <Badge color={getLevelBadgeColor(selectedCustomer.levelMember)} className="inline-block">
                        {selectedCustomer.levelMember}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <Badge color={selectedCustomer.statusMember === 'Aktif' ? 'green' : 'red'} className="inline-block">
                        {selectedCustomer.statusMember}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tanggal Daftar</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedCustomer.tanggalDaftar)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Sumber</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.sumberCustomer}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Preferensi & Transaksi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Produk Favorit</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.produkFavorit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Kategori Favorit</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.kategoriFavorit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Transaksi</p>
                      <p className="font-medium text-green-600 text-lg">{formatCurrency(selectedCustomer.totalTransaksi)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Metode Pembayaran</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.metodePembayaran}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pembelian Terakhir</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedCustomer.tanggalPembelianTerakhir)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status Promo</p>
                      <Badge color={selectedCustomer.statusPromo === 'Aktif' ? 'orange' : 'gray'} className="inline-block">
                        {selectedCustomer.statusPromo}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 flex-col md:flex-row">
                  <Button variant="primary" className="flex-1" onClick={() => handleStartEdit(selectedCustomer)}>
                    Edit Data Customer
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Kirim Promo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Customer Baru"
        description="Isi informasi dasar untuk menambahkan customer baru ke daftar CRM."
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleAddCustomer}>
              Simpan Customer
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Nama Lengkap"
            value={formValues.namaLengkap}
            onChange={(e) => handleFormChange('namaLengkap', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={formValues.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
          />
          <Input
            label="Nomor HP"
            value={formValues.nomorHP}
            onChange={(e) => handleFormChange('nomorHP', e.target.value)}
          />
          <Input
            label="Kota"
            value={formValues.kota}
            onChange={(e) => handleFormChange('kota', e.target.value)}
          />
          <Input
            label="Username"
            value={formValues.username}
            onChange={(e) => handleFormChange('username', e.target.value)}
          />
          <Select
            label="Level Member"
            value={formValues.levelMember}
            onChange={(e) => handleFormChange('levelMember', e.target.value)}
            options={["Platinum", "Gold", "Silver"]}
          />
          <Select
            label="Status Member"
            value={formValues.statusMember}
            onChange={(e) => handleFormChange('statusMember', e.target.value)}
            options={["Aktif", "Tidak Aktif"]}
          />
          <Input
            label="Total Transaksi"
            type="number"
            value={formValues.totalTransaksi}
            onChange={(e) => handleFormChange('totalTransaksi', e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(editingCustomer)}
        onClose={() => setEditingCustomer(null)}
        title="Edit Customer"
        description="Perbarui data customer dan simpan perubahan."
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setEditingCustomer(null)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Simpan Perubahan
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Nama Lengkap"
            value={formValues.namaLengkap}
            onChange={(e) => handleFormChange('namaLengkap', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={formValues.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
          />
          <Input
            label="Nomor HP"
            value={formValues.nomorHP}
            onChange={(e) => handleFormChange('nomorHP', e.target.value)}
          />
          <Input
            label="Kota"
            value={formValues.kota}
            onChange={(e) => handleFormChange('kota', e.target.value)}
          />
          <Input
            label="Username"
            value={formValues.username}
            onChange={(e) => handleFormChange('username', e.target.value)}
          />
          <Select
            label="Level Member"
            value={formValues.levelMember}
            onChange={(e) => handleFormChange('levelMember', e.target.value)}
            options={["Platinum", "Gold", "Silver"]}
          />
          <Select
            label="Status Member"
            value={formValues.statusMember}
            onChange={(e) => handleFormChange('statusMember', e.target.value)}
            options={["Aktif", "Tidak Aktif"]}
          />
          <Input
            label="Total Transaksi"
            type="number"
            value={formValues.totalTransaksi}
            onChange={(e) => handleFormChange('totalTransaksi', e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
