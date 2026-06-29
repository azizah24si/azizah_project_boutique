import { supabase } from "../lib/supabase";

// Create or get customer record
export const ensureCustomer = async (customerData, userId = null) => {
  const { full_name, email, phone } = customerData;

  // Check if customer exists (remove .single() to avoid error if no record)
  let { data: existingList, error: searchError } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email);

  if (searchError) throw searchError;

  const existing = existingList && existingList.length > 0 ? existingList[0] : null;

  if (existing) {
    // Update user_id if provided and not set
    if (userId && !existing.user_id) {
      const { data: updated } = await supabase
        .from("customers")
        .update({ user_id: userId })
        .eq("id", existing.id)
        .select()
        .single();
      return updated || existing;
    }
    return existing;
  }

  // Create new customer
  const { data: newCustomer, error } = await supabase
    .from("customers")
    .insert([{
      full_name,
      email,
      phone,
      user_id: userId,
    }])
    .select()
    .single();

  if (error) throw error;
  return newCustomer;
};

// Create a sales order
export const createSalesOrder = async (orderData) => {
  const {
    customerId,
    items,
    totalAmount,
    discountApplied = 0,
    netAmount,
    orderType = "sales", // 'sales' or 'reservation'
    reservationDate = null,
    notes = "",
  } = orderData;

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from("sales_orders")
    .insert([{
      customer_id: customerId,
      total_amount: totalAmount,
      discount_applied: discountApplied,
      net_amount: netAmount,
      status: "pending",
      order_type: orderType,
      reservation_date: reservationDate,
      notes,
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Create order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id || null,
    product_name: item.product_name || item.name,
    quantity: item.quantity,
    price_per_unit: item.price_per_unit || item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
};

// Get all orders (admin view)
export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("sales_orders")
    .select(`
      *,
      customer:customers(full_name, email, phone),
      items:order_items(*)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Get orders for a specific customer (member view)
export const getMyOrders = async (userId) => {
  // First get customer record
  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!customer) return [];

  const { data, error } = await supabase
    .from("sales_orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("customer_id", customer.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Get order by ID
export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from("sales_orders")
    .select(`
      *,
      customer:customers(*),
      items:order_items(*)
    `)
    .eq("id", orderId)
    .single();

  if (error) throw error;
  return data;
};

// Update order status (admin only)
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("sales_orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update order (admin only)
export const updateOrder = async (orderId, orderData) => {
  const {
    customerId,
    items,
    totalAmount,
    discountApplied = 0,
    netAmount,
    notes = "",
  } = orderData;

  // 1. Update the order
  const { data: order, error: orderError } = await supabase
    .from("sales_orders")
    .update({
      customer_id: customerId,
      total_amount: totalAmount,
      discount_applied: discountApplied,
      net_amount: netAmount,
      notes,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Delete existing items
  const { error: deleteError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);

  if (deleteError) throw deleteError;

  // 3. Insert new items
  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.product_id || null,
    product_name: item.product_name || item.name,
    quantity: item.quantity,
    price_per_unit: item.price_per_unit || item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
};

// Delete order (admin only)
export const deleteOrder = async (orderId) => {
  // Order items will be deleted automatically due to CASCADE
  const { error } = await supabase
    .from("sales_orders")
    .delete()
    .eq("id", orderId);

  if (error) throw error;
  return true;
};

// Create reservation
export const createReservation = async (reservationData) => {
  const { customerInfo, service, date, time, notes } = reservationData;

  // Ensure customer exists
  const customer = await ensureCustomer(customerInfo, customerInfo.user_id);

  // Create as a reservation order
  const order = await createSalesOrder({
    customerId: customer.id,
    items: [{
      product_name: service,
      quantity: 1,
      price_per_unit: 0, // Reservations are free
    }],
    totalAmount: 0,
    netAmount: 0,
    orderType: "reservation",
    reservationDate: new Date(`${date}T${time.split(" - ")[0]}:00`).toISOString(),
    notes,
  });

  return order;
};

// Update member level and loyalty points based on total spending
export const updateMembershipTier = async (customerId) => {
  try {
    // 1. Get customer data to find user_id
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("user_id")
      .eq("id", customerId)
      .single();

    if (customerError) throw customerError;
    
    if (!customer.user_id) {
      console.log("⚠️ Customer has no linked user_id, skipping tier update");
      return null;
    }

    // 2. Get total spending dari semua order yang completed untuk customer ini
    const { data: orders, error: ordersError } = await supabase
      .from("sales_orders")
      .select("net_amount")
      .eq("customer_id", customerId)
      .eq("status", "completed");

    if (ordersError) throw ordersError;

    // 3. Calculate total spending
    const totalSpending = orders.reduce((sum, order) => sum + (order.net_amount || 0), 0);

    // 4. Calculate loyalty points (Rp 10,000 = 1 point)
    const loyaltyPoints = Math.floor(totalSpending / 10000);

    // 5. Determine member level based on spending
    let memberLevel = "Bronze";
    if (totalSpending >= 15000000) {
      memberLevel = "Platinum";
    } else if (totalSpending >= 5000000) {
      memberLevel = "Gold";
    } else if (totalSpending >= 1000000) {
      memberLevel = "Silver";
    }

    // 6. Update PROFILES table (bukan customers!)
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        member_level: memberLevel,
        loyalty_points: loyaltyPoints,
      })
      .eq("id", customer.user_id)
      .select()
      .single();

    if (updateError) throw updateError;

    console.log("✅ Membership tier updated in profiles:", {
      userId: customer.user_id,
      customerId,
      totalSpending,
      memberLevel,
      loyaltyPoints,
    });

    return updatedProfile;
  } catch (error) {
    console.error("❌ Error updating membership tier:", error);
    throw error;
  }
};
