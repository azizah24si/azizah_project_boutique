import { supabase } from "../lib/supabase";

// Service layer for products table - follows the pattern of existing usersAPI.js
// All methods throw errors to the caller for handling
export const productsAPI = {
  // GET - Fetch all products (publicly accessible)
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // GET - Fetch single product by id
  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // POST - Create new product (admin only)
  async create(productData) {
    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // PATCH - Update existing product (admin only)
  async update(id, productData) {
    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // DELETE - Remove product (admin only)
  async delete(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },

  // STORAGE - Upload product image to 'product-images' bucket
  async uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded file
    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};
