import { supabase } from "../lib/supabase";

// Create or get customer record
export const ensureCustomer = async (customerData, userId = null) => {
  const { full_name, email, phone } = customerData;

  try {
    console.log("🔍 ensureCustomer called with:", { full_name, email, phone, userId });

    // First, check if customer exists by user_id (if provided)
    if (userId) {
      console.log("Checking by user_id:", userId);
      const { data: byUserId, error: userIdError } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", userId);

      if (userIdError) {
        console.error("Error checking by user_id:", userIdError);
        throw userIdError;
      }

      if (byUserId && byUserId.length > 0) {
        console.log("✅ Found customer by user_id:", byUserId[0].id);
        // Update customer info if needed
        const { data: updated, error: updateError } = await supabase
          .from("customers")
          .update({ full_name, phone })
          .eq("id", byUserId[0].id)
          .select();

        if (updateError) {
          console.error("Error updating customer:", updateError);
          throw updateError;
        }
        
        console.log("✅ Updated customer:", updated);
        return updated && updated.length > 0 ? updated[0] : byUserId[0];
      }
    }

    // Check if customer exists by email
    console.log("Checking by email:", email);
    const { data: byEmail, error: emailError } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email);

    if (emailError) {
      console.error("Error checking by email:", emailError);
      throw emailError;
    }

    if (byEmail && byEmail.length > 0) {
      console.log("✅ Found customer by email:", byEmail[0].id);
      const customer = byEmail[0];
      
      // Update customer info
      const updateData = { full_name, phone };
      if (userId && !customer.user_id) {
        updateData.user_id = userId;
      }

      const { data: updated, error: updateError } = await supabase
        .from("customers")
        .update(updateData)
        .eq("id", customer.id)
        .select();

      if (updateError) {
        console.error("Error updating customer:", updateError);
        throw updateError;
      }

      console.log("✅ Updated customer:", updated);
      return updated && updated.length > 0 ? updated[0] : customer;
    }

    // Create new customer only if no existing record found
    console.log("Creating new customer...");
    const { data: newCustomer, error: insertError } = await supabase
      .from("customers")
      .insert([{
        full_name,
        email,
        phone,
        user_id: userId,
      }])
      .select();

    if (insertError) {
      console.error("Error creating customer:", insertError);
      throw insertError;
    }

    console.log("✅ Created new customer:", newCustomer);
    return newCustomer && newCustomer.length > 0 ? newCustomer[0] : newCustomer;
  } catch (error) {
    console.error("❌ Error in ensureCustomer:", error);
    throw error;
  }
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
