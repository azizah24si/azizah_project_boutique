/**
 * Mock Users API untuk development tanpa Supabase
 * Menggunakan localStorage untuk menyimpan data sementara
 */

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Get users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem('mock_users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('mock_users', JSON.stringify(users));
};

// Initialize with default admin if empty
const initializeDefaultUser = () => {
  const users = getStoredUsers();
  if (users.length === 0) {
    const defaultAdmin = {
      id: 1,
      name: "Admin Jijah",
      email: "admin@jijahboutique.com",
      password: "admin123",
      role: "admin",
      created_at: new Date().toISOString()
    };
    saveUsers([defaultAdmin]);
    console.log("✅ Default admin created: admin@jijahboutique.com / admin123");
  }
};

// Initialize on load
initializeDefaultUser();

export const mockUsersAPI = {
  // GET - Fetch all users
  async fetchUsers() {
    await delay();
    return getStoredUsers();
  },

  // POST - Create new user (Register)
  async createUser(data) {
    await delay();
    const users = getStoredUsers();
    
    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "admin",
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return [newUser];
  },

  // PATCH - Update user
  async updateUser(id, data) {
    await delay();
    const users = getStoredUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      saveUsers(users);
      return [users[index]];
    }
    
    return [];
  },

  // DELETE - Delete user
  async deleteUser(id) {
    await delay();
    const users = getStoredUsers();
    const filtered = users.filter(u => u.id !== id);
    saveUsers(filtered);
    return [];
  },

  // GET - Login (cek email + password)
  async login(email, password) {
    await delay();
    const users = getStoredUsers();
    return users.filter(u => u.email === email && u.password === password);
  },

  // GET - Check if email exists
  async checkEmail(email) {
    await delay();
    const users = getStoredUsers();
    return users.filter(u => u.email === email);
  },
};
