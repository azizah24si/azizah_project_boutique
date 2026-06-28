import { supabase } from "../lib/supabase";

// Service layer for sales_orders + order_items tables
export const ordersAPI = {
  // GET - Fetch all orders with customer info (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from("sales_orders")
      .select(`
        *,
        customer:customers(id, full_name, email, phone)
      `)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // GET - Fetch single order by id with items and customer
  async getById(id) {
    const { data, error } = await supabase
      .from("sales_orders")
      .select(`
        *,
        customer:customers(id, full_name, email, phone),
        order_items(id, product_id, product_name, quantity, price_per_unit)
      `)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // GET - Fetch orders for a specific customer (member area)
  async getByCustomerId(customerId) {
    const { data, error } = await supabase
      .from("sales_orders")
      .select(`
        *,
        order_items(id, product_id, product_name, quantity, price_per_unit)
      `)
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // GET - Fetch orders filtered by type ('sales' or 'reservation')
  async getByType(orderType) {
    const { data, error } = await supabase
      .from("sales_orders")
      .select(`
        *,
        customer:customers(id, full_name, email, phone)
      `)
      .eq("order_type", orderType)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  // POST - Create a new sales order with items (transactional)
  async create({ customer_id, total_amount, discount_applied, net_amount, status, order_type, reservation_date, notes, items }) {
    // 1. Insert the sales_order
    const { data: order, error: orderError } = await supabase
      .from("sales_orders")
      .insert([{
        customer_id,
        total_amount,
        discount_applied,
        net_amount,
        status: status || "pending",
        order_type: order_type || "sales",
        reservation_date: reservation_date || null,
        notes: notes || null,
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order_items if provided
    if (items && items.length > 0) {
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id || null,
        product_name: item.product_name,
        quantity: item.quantity,
        price_per_unit: item.price_per_unit,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    return order;
  },

  // PATCH - Update order status (admin only)
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("sales_orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // PATCH - Update order (admin only)
  async update(id, orderData) {
    const { data, error } = await supabase
      .from("sales_orders")
      .update(orderData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // DELETE - Delete order (admin only)
  async delete(id) {
    const { error } = await supabase
      .from("sales_orders")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },
};
