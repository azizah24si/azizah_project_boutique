import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";
import Tooltip from "../components/Tooltip";

const ALL_CUSTOMERS = [
  { id: "CUST-101", name: "Aisyah", email: "aisyah@gmail.com", phone: "08123456789", level: "Gold" },
  { id: "CUST-102", name: "Nadia", email: "nadia@gmail.com", phone: "08129876543", level: "Silver" },
  { id: "CUST-103", name: "Salsa", email: "salsa@gmail.com", phone: "08127778888", level: "Bronze" },
  { id: "CUST-104", name: "Rara", email: "rara@gmail.com", phone: "08126665555", level: "Gold" },
  { id: "CUST-105", name: "Dina", email: "dina@gmail.com", phone: "08125554444", level: "Silver" },
  { id: "CUST-106", name: "Putri", email: "putri@gmail.com", phone: "08124443333", level: "Bronze" },
];

const PAGE_SIZE = 5;

const levelVariant = {
  Gold: "orange",
  Silver: "gray",
  Bronze: "pink",
};

const levelColor = {
  Gold: "orange",
  Silver: "cyan",
  Bronze: "pink",
};

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ALL_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (val) => <span className="font-semibold text-gray-700">{val}</span>,
    },
    {
      key: "name",
      label: "Nama",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" color={levelColor[row.level]} />
          <span className="font-medium text-gray-700">{val}</span>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "No HP" },
    {
      key: "level",
      label: "Level",
      render: (val) => (
        <Tooltip content={`Member level ${val}`}>
          <Badge variant={levelVariant[val]} dot>
            {val}
          </Badge>
        </Tooltip>
      ),
    },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Data Pelanggan Boutique" breadcrumb={["Dashboard", "Pelanggan"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Tambah Pelanggan
        </Button>
      </PageHeader>

      {saved && (
        <Alert variant="success" title="Pelanggan berhasil disimpan!" dismissible onDismiss={() => setSaved(false)} className="mb-4">
          Data pelanggan baru telah ditambahkan.
        </Alert>
      )}

      {/* SEARCH */}
      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Cari nama, email, atau ID..."
          icon={<FaSearch />}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* TABLE */}
      <Table columns={columns} data={paginated} emptyText="Tidak ada pelanggan ditemukan" />

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Tambah Pelanggan Baru"
        description="Isi form di bawah untuk menambahkan pelanggan"
        footer={
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSave} loading={saving}>
              {saving ? "Menyimpan..." : "Simpan Pelanggan"}
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Batal
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="ID Pelanggan" placeholder="CUST-107" required />
          <Input label="Nama Lengkap" placeholder="Contoh: Aisyah" required />
          <Input label="Email" type="email" placeholder="aisyah@gmail.com" required />
          <Input label="No HP" placeholder="08123456789" required />
          <Select
            label="Level Member"
            options={["Gold", "Silver", "Bronze"]}
            className="col-span-2"
            required
          />
        </div>
      </Modal>
    </div>
  );
}
