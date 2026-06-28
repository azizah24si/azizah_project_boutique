import { supabase } from "../lib/supabase";

// Service layer for customers table
export const customersAPI = {
  // GET - Fetch all customers (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // GET - Fetch single customer by id
  async getById(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // GET - Find customer by email (used for guest checkout/reservation)
  async getByEmail(email) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();
    // PGRST116 = no rows found, which is expected when email doesn't exist yet
    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  },

  // POST - Create new customer
  async create(customerData) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customerData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // POST - Find or create customer by email (used in guest reservation flow)
  async findOrCreate({ full_name, email, phone, user_id }) {
    // Check if customer with this email already exists
    const existing = await this.getByEmail(email);
    if (existing) return existing;

    // Otherwise create a new customer record
    return await this.create({ full_name, email, phone, user_id });
  },

  // PATCH - Update customer (admin only)
  async update(id, customerData) {
    const { data, error } = await supabase
      .from("customers")
      .update(customerData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // DELETE - Delete customer (admin only)
  async delete(id) {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },
};
