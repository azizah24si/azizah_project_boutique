import axios from 'axios';

const API_URL = "https://fwngivshgcslmzkmtnsf.supabase.co/rest/v1";
const API_KEY = "sb_publishable_j6nRRf7wTeRiQEDgNDL6QA_GHM48xxA";


const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// GET - Fetch all users
export const usersAPI = {
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
