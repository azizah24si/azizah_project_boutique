import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { supabase } from "../lib/supabase";
import { FaUser, FaEnvelope, FaLock, FaEdit, FaTrash } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });

  // Fetch users dari Supabase
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      alert("Gagal memuat data users");
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle create/update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Update user
      const { error } = await supabase
        .from("users")
        .update({
          name: formData.name,
          email: formData.email,
          ...(formData.password && { password: formData.password }), // Update password jika diisi
        })
        .eq("id", formData.id);

      if (error) {
        console.error("Error updating user:", error);
        alert("Gagal update user");
      } else {
        alert("User berhasil diupdate!");
        fetchUsers();
        handleCloseModal();
      }
    } else {
      // Create user
      const { error } = await supabase.from("users").insert([
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      ]);

      if (error) {
        console.error("Error creating user:", error);
        alert("Gagal menambah user");
      } else {
        alert("User berhasil ditambahkan!");
        fetchUsers();
        handleCloseModal();
      }
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user");
    } else {
      alert("User berhasil dihapus!");
      fetchUsers();
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setIsEditMode(true);
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "", // Kosongkan password saat edit
    });
    setIsModalOpen(true);
  };

  // Handle open modal for create
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      password: "",
    });
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      password: "",
    });
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nama" },
    { key: "email", label: "Email" },
    {
      key: "created_at",
      label: "Tanggal Daftar",
      render: (value) => new Date(value).toLocaleDateString("id-ID"),
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_, user) => (
        <div className="flex gap-2">
          <Button size="sm" variant="warning" onClick={() => handleEdit(user)}>
            <FaEdit />
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Users Management"
        description="Kelola data user sistem"
        action={
          <Button onClick={handleOpenCreateModal}>
            + Tambah User
          </Button>
        }
      />

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <Table columns={columns} data={users} />
        )}
      </div>

      {/* Modal Create/Edit User */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? "Edit User" : "Tambah User"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              name="name"
              placeholder="Masukkan nama lengkap"
              icon={<FaUser />}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              icon={<FaEnvelope />}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label={isEditMode ? "Password (kosongkan jika tidak diubah)" : "Password"}
              type="password"
              name="password"
              placeholder="Masukkan password"
              icon={<FaLock />}
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
