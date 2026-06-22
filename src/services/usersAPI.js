import axios from 'axios';
import { mockUsersAPI } from './mockUsersAPI';

// Gunakan environment variable untuk API key yang aman
const API_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`
  : "https://fwngivshgcslmzkmtnsf.supabase.co/rest/v1";

const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Cek apakah menggunakan mock atau real API
const USE_MOCK = !API_KEY || API_KEY === "GANTI_DENGAN_ANON_KEY_YANG_BENAR";

if (USE_MOCK) {
  console.log("🔧 Mode: DEVELOPMENT dengan Mock API (LocalStorage)");
  console.log("📝 Default admin: admin@jijahboutique.com / admin123");
  console.log("💡 Untuk menggunakan Supabase real, edit file .env dan isi VITE_SUPABASE_ANON_KEY");
} else {
  console.log("✅ Mode: PRODUCTION dengan Supabase API");
}

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

// Export API berdasarkan mode (mock atau real)
export const usersAPI = USE_MOCK ? mockUsersAPI : {
  async fetchUsers() {
    const response = await axios.get(`${API_URL}/users`, { headers });
    return response.data;
  },

  // POST - Create new user (Register)
  async createUser(data) {
    const response = await axios.post(`${API_URL}/users`, data, { headers });
    return response.data;
  },

  // PATCH - Update user
  async updateUser(id, data) {
    const response = await axios.patch(
      `${API_URL}/users?id=eq.${id}`,
      data,
      { headers }
    );
    return response.data;
  },

  // DELETE - Delete user
  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}/users?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  // GET - Login (cek email + password, return data user jika cocok)
  async login(email, password) {
    const response = await axios.get(`${API_URL}/users`, {
      headers,
      params: {
        email: `eq.${email}`,
        password: `eq.${password}`,
        select: "*",
      },
    });
    return response.data; // array, ambil index [0] di komponen
  },

  // GET - Check if email exists
  async checkEmail(email) {
    const response = await axios.get(`${API_URL}/users`, {
      headers,
      params: {
        email: `eq.${email}`,
        select: "email",
      },
    });
    return response.data; // array, jika length > 0 berarti email sudah ada
  },
};
