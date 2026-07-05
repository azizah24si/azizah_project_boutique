-- ================================================
-- STOCK MANAGEMENT FUNCTIONS
-- Fungsi untuk mengelola stok produk secara aman
-- ================================================

-- Function untuk mengurangi stok produk (digunakan saat order dibuat)
CREATE OR REPLACE FUNCTION decrement_stock(
  product_id_param UUID,
  quantity_param INTEGER
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update stock dengan atomic operation
  UPDATE products
  SET stock = stock - quantity_param
  WHERE id = product_id_param
    AND stock >= quantity_param; -- Hanya update jika stok cukup
  
  -- Check jika update berhasil
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Stok tidak mencukupi atau produk tidak ditemukan';
  END IF;
END;
$$;

-- Function untuk mengembalikan stok produk (digunakan saat order dibatalkan)
CREATE OR REPLACE FUNCTION increment_stock(
  product_id_param UUID,
  quantity_param INTEGER
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update stock dengan atomic operation
  UPDATE products
  SET stock = stock + quantity_param
  WHERE id = product_id_param;
  
  -- Check jika update berhasil
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Produk tidak ditemukan';
  END IF;
END;
$$;

-- Grant execute permission untuk authenticated users
GRANT EXECUTE ON FUNCTION decrement_stock(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_stock(UUID, INTEGER) TO authenticated;

-- ================================================
-- NOTES:
-- 1. decrement_stock: Mengurangi stok saat order dibuat/dikonfirmasi
-- 2. increment_stock: Mengembalikan stok saat order dibatalkan
-- 3. Atomic operation memastikan tidak ada race condition
-- ================================================
